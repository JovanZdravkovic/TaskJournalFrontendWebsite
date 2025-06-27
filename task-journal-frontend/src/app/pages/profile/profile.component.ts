import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { BaseService } from '../../services/base/base.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OsCheckService } from '../../services/oscheck/os-check.service';

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
  errorMap: Map<string, string> = new Map<string, string>();

  constructor(
    private http: HttpClient,
    private baseService: BaseService,
    private toastr: ToastrService,
    private router: Router,
    private osCheck: OsCheckService
  ) { }

  ngOnInit(): void {
    this.osCheck.mobileCheck();
    this.loadUser();
  }

  initEditForm(): void {
    this.errorMap = new Map<string, string>();
    this.editForm = new FormGroup({
      username: new FormControl(this.profile.username, [Validators.required, Validators.maxLength(50)]),
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
        this.profileIconUrl = 'http://localhost:8080/user/icon?t=' + new Date().getTime();
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
        this.toastr.error(error['error'], 'Error');
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
    let errorExist = false;
    Object.keys(this.editForm!.controls).forEach((controlName) => {
      if(this.editForm!.get(controlName)?.hasError('required')) {
        this.errorMap.set(controlName, 'required');
        errorExist = true;
      } else if(this.editForm!.get(controlName)?.hasError('email')) {
        this.errorMap.set(controlName, 'email');
        errorExist = true;
      } else if(this.editForm!.get(controlName)?.hasError('maxlength')) {
        this.errorMap.set(controlName, 'maxlength');
        errorExist = true;
      } else {
        this.errorMap.set(controlName, '');
      }
    });
    return errorExist;
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
