import { Component } from '@angular/core';
import { BaseService } from '../../services/base/base.service';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';

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

  constructor(private baseService: BaseService) {}

  login() {
    let credentialsPayload: any = {};
    Object.keys(this.loginForm.controls).forEach((controlName) => {
      credentialsPayload[controlName] = this.loginForm.get(controlName)?.value;
    });
    this.baseService.post('auth/login/', credentialsPayload).subscribe((data) => {
    });
  }
}
