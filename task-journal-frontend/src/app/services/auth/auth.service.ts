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
    const currentUser = this.user();
    return (currentUser !== null && Object.keys(currentUser).length !== 0);
  })

  constructor(private baseService: BaseService) { }

  authenticate(): Observable<any> {
    return this.baseService.get('auth');
  }

  logout(): Observable<any> {
    return this.baseService.post('logout', {});
  }
}
