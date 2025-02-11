import { Component } from '@angular/core';
import { BaseService } from '../../services/base/base.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private baseService: BaseService) {}

  login() {
    this.baseService.post('auth/login/', { username: "testuser", password: "testpassword" }).subscribe((data) => {
      console.log(data);
    });
  }
}
