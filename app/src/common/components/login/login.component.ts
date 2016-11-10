import {Component} from '@angular/core';
import {AuthService} from 'app/src/common/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  template: `
        <div class="container center">
            <div class="row">
                <div class="offset-xs-1 col-xs-10 m-t-lg">
                    <div class="login-form">
                        <h2 class="form-signin-heading">Please sign in</h2>
                        <label for="inputEmail" class="sr-only">Email address</label>
                        <input type="email" id="inputEmail" class="form-control m-t-lg" 
                            placeholder="Email address" required="" autofocus="">
                        <label for="inputPassword" class="sr-only">Password</label>
                        <input type="password" id="inputPassword" class="form-control m-t-lg" 
                            placeholder="Password" required="">
                        <label class="form-label m-t-lg">
                            <span class="co-checkbox">
                                <input type="checkbox">
                                <span class="checkbox"><i class="fa fa-check"></i></span>
                            </span>
                            <p class="content">Remember me</p>
                        </label>
                        <div class="m-t-lg m-b-xxl">
                            <button class="col-xs-12 btn btn-primary" (click)="login()" >Sign in</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
`,
  styles: [`
        .btn.btn-primary{
            float: none;
        }
    `]
})
export class LoginComponent {
  
  constructor(private authService: AuthService, private router: Router) {
  }
  
  public login() {
    let mockToken: string = '=dj71jdsk';
    this.authService.setToken(mockToken);
    console.log(this.authService.isLoggedIn());
    this.router.navigate(['/gcui/home']);
  }
  
}
