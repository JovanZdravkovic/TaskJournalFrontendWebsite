import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { BaseService } from '../../services/base/base.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  profile: any = {};
  editMode: boolean = false;
  editForm: FormGroup | null = null;
  selectedProfileIconName: string = '';
  profileIconUrl: string = 'http://localhost:8080/user/icon'
  iconForm: FormData = new FormData();

  constructor(
    private http: HttpClient,
    private baseService: BaseService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUser();
  }

  initEditForm(): void {
    this.editForm = new FormGroup({
      username: new FormControl(this.profile.username, Validators.required),
      email: new FormControl(this.profile.email, [Validators.required, Validators.email]),
    });
  }

  loadUser(): void {
    this.baseService.get('user')
    .pipe(
      catchError((error) => {
        return of(null);
      })
    )
    .subscribe((data) => {
      if(data) {
        this.profile = data;
        this.initEditForm();
      } else {
        this.router.navigateByUrl('/tasks');
      }
    });
  }

  editProfile(): void {
    this.editMode = !this.editMode;
    this.initEditForm();
  }

  selectedProfileIcon($event: any): void {
    const file:File = $event.target.files[0];

    if (file) {
      this.selectedProfileIconName = file.name;
      this.iconForm = new FormData();
      this.iconForm.append('icon', file);
    }
  }

  uploadSelectedProfileIcon(): void {
    this.http.post('http://localhost:8080/user/icon', this.iconForm, { withCredentials: true })
    .pipe(
      catchError((error) => {
        this.toastr.error('Error while uploading icon', 'Error');
        return of(null);
      })
    )
    .subscribe((data) => {
      if(data !== null) {
        this.toastr.success('Successfully uploaded icon', 'Success');
        this.editProfile();
        this.loadUser();
      }
    });
  }

  createCredentialsPayload(): void {
    let formPayload: any = {};
    Object.keys(this.editForm!.controls).forEach((controlName) => {
      formPayload[controlName] = this.editForm!.get(controlName)?.value;
    });
    return formPayload;
  }

  checkEditFormErrors(): boolean {
    // TODO: implement error checking logic
    return false;
  }

  uploadCredentials(): void {
    let errors: boolean = this.checkEditFormErrors();
    if(!errors) {
      this.baseService.put('user', this.createCredentialsPayload())
      .pipe(
        catchError((error) => {
          this.toastr.error('Error while updating username and email', 'Error');
          return of(null);
        })
      )
      .subscribe((data) => {
        if(data.success) {
          this.toastr.success('Successfully updated username and email', 'Success');
          this.editProfile();
          this.loadUser();
        }
      });
    }
  }

  logout(): void {
    if(confirm('Are you sure you want to log out?')) {
      this.baseService.post('logout', {})
      .pipe(
        catchError((error) => {
          this.toastr.error('Error while logging out', 'Error');
          return of(null);
        })
      )
      .subscribe((data) => {
        this.toastr.success('Successfully logged out', 'Success');
        this.router.navigateByUrl('/login');
      });
    }
  }
}
