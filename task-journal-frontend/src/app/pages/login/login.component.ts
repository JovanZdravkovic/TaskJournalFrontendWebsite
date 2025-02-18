import { Component } from '@angular/core';
import { BaseService } from '../../services/base/base.service';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });
  showPassword: boolean = false;
  errorMap: Map<string, boolean> = new Map<string, boolean>();
  requestError: boolean = false;

  constructor(
    private baseService: BaseService,
    private router: Router
  ) {}

  createPayload(): any {
    let credentialsPayload: any = {};
    Object.keys(this.loginForm.controls).forEach((controlName) => {
      credentialsPayload[controlName] = this.loginForm.get(controlName)?.value;
    });
    return credentialsPayload;
  }

  checkErrors(): boolean {
    let errorExist = false;
    Object.keys(this.loginForm.controls).forEach((controlName) => {
      if(this.loginForm.get(controlName)?.hasError('required')) {
        this.errorMap.set(controlName, true);
        errorExist = true;
      } else {
        this.errorMap.set(controlName, false);
      }
    });
    return errorExist;
  }

  login() {
    let errors: boolean = this.checkErrors();
    if(!errors) {
      this.baseService.post('auth/login/', this.createPayload())
      .pipe(
        catchError((error) => {
          this.requestError = true;
          return of('error');
        })
      )
      .subscribe((data) => {
        if(data === null) {
          this.router.navigateByUrl('/tasks');
        }
      });
    }
  }
}
