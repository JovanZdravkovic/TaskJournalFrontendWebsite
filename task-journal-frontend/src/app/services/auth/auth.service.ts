import { computed, Injectable, signal } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = signal<any>(null);
  loggedIn = computed(() => {
    return (this.user !== null && Object.keys(this.user).length !== 0);
  })

  constructor(private baseService: BaseService) { }

  authenticate(): Observable<any> {
    return this.baseService.get('auth/authenticate');
  }

  login(username: string, password: string): Observable<any> {
    return this.baseService.post(
      'auth/login',
      {
        username: username,
        password: password
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }), 
      }
    );
  }

  logout(): Observable<any> {
    return this.baseService.post('auth/logout', {});
  }
}
