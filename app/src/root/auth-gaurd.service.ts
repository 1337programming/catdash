import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';

import {AuthService} from 'app/src/common/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }
  
  public canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      console.log('Logged In');
      return true;
    } else {
      console.log('Not Logged In');
      this.router.navigate(['/login']);
      return false;
    }
  }
}

