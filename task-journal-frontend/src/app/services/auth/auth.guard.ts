import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return new Observable<boolean>((observer) => {
      let authRequired = route.data['authRequired'];
      this.authService.authenticate().subscribe((data: any) => {
        if(data !== null && Object.keys(data).length !== 0) {
          this.authService.user.set(data);
          if(!authRequired) {
            this.router.navigateByUrl('/');
            observer.next(false);
          } else {
            observer.next(true);
          }
        } else{
          this.authService.user.set(null);
          if(authRequired) {
            this.router.navigateByUrl('/login');
            observer.next(false);
          } else {
            observer.next(true);
          }
        }
      });
    })
  }
  
}
