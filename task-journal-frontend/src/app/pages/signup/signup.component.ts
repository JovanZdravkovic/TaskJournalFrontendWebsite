import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService } from '../../services/base/base.service';
import { catchError, of } from 'rxjs';
import { OsCheckService } from '../../services/oscheck/os-check.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    confirmPassword: new FormControl(null, Validators.required),
  });
  showPassword: boolean = false;
  errorMap: Map<string, string> = new Map<string, string>();
  requestError: boolean = false;

  constructor(
    private baseService: BaseService,
    private router: Router,
    private osCheck: OsCheckService
  ) {}

  ngOnInit(): void {
    this.osCheck.mobileCheck();
  }

  createPayload(): any {
    let formPayload: any = {};
    Object.keys(this.signupForm.controls).forEach((controlName) => {
      formPayload[controlName] = this.signupForm.get(controlName)?.value;
    });
    return formPayload;
  }

  checkErrors(): boolean {
    this.requestError = false;
    let errorExist = false;
    if(this.signupForm.hasError('passwordDisparity')) {
      this.errorMap.set('signupForm', 'passwordDisparity');
      errorExist = true;
    } else {
      this.errorMap.set('signupForm', '');
    }
    Object.keys(this.signupForm.controls).forEach((controlName) => {
      if(this.signupForm.get(controlName)?.hasError('required')) {
        this.errorMap.set(controlName, 'required');
        errorExist = true;
      } else if(this.signupForm.get(controlName)?.hasError('email')) {
        this.errorMap.set(controlName, 'email');
        errorExist = true;
      } else {
        this.errorMap.set(controlName, '');
      }
    });
    return errorExist;
  }

  signup() {
    let errors: boolean = this.checkErrors();
    if(!errors) {
      this.baseService.post('signup', this.createPayload())
      .pipe(
        catchError((error) => {
          this.requestError = true;
          return of(null);
        })
      )
      .subscribe((data) => {
        if(data !== null) {
          this.router.navigateByUrl('/login');
          this.requestError = false;
        }
      });
    }
  }
}
