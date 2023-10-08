import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean |UrlTree > {
      
      const expectedRole = route.data['expectedRole'];
      console.log('Expected Role:', expectedRole);
    
      if (this.authService.isLoggedIn()) {
        const userRole = this.authService.getUserRole();
        console.log('User Role:', userRole);
    
        if (userRole === expectedRole) {
          return true;
        }
      }
    
      console.log('Redirecting to /login');
      return this.router.parseUrl('/login');
    }
}
