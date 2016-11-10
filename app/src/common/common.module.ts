import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';

// Components
import {NavbarComponent} from 'app/src/common/components/navbar/navbar.component';
import {LoginComponent} from 'app/src/common/components/login/login.component';
import {HamburgerMenuComponent} from 'app/src/common/components/hamburger-menu/hamburger-menu.component';

// Services
import {AuthService} from 'app/src/common/services/auth.service';
import {CommonService} from 'app/src/common/services/common.service';

// Routing (for login and navbar component)
import {routing} from 'app/src/root/app.router';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, HttpModule, routing
  ],
  providers: [AuthService, CommonService],
  declarations: [NavbarComponent, LoginComponent, HamburgerMenuComponent],
  exports: [NavbarComponent]
})
export class CustomCommonModule {
}
