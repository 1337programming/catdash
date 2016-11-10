import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  
  private token: string;
  
  constructor(private router: Router) {
  }
  
  public getToken(): string {
    if (this.isLoggedIn()) {
      return this.token;
    }
  }
  
  public setToken(token: string): void {
    this.token = token;
  }
  
  public deleteToken(): void {
    this.token = null;
  }
  
  public isLoggedIn(): boolean {
    return this.token ? true : false;
  }
  
  public logout() {
    this.deleteToken();
    this.router.navigate(['/gcui']);
  }
  
  public login() {
    this.router.navigate(['/login']);
  }
  
}
