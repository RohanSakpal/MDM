import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (localStorage.getItem('__USER') === null) {
      this.router.navigateByUrl('/login');
      return of(false);
    } else {
      return of(true);
    }
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
