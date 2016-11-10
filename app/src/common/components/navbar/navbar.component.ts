import {Component} from '@angular/core';
import {CommonService} from 'app/src/common/services/common.service';


@Component({
  selector: 'navbar',
  template: `
    <nav class="navbar navbar-dark navbar-fixed-top bg-inverse">
        <button type="button" class="navbar-toggler hidden-sm-up" data-toggle="collapse" 
            data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        
        <div id="navbar">
            <nav class="nav navbar-nav pull-xs-left">
                <a class="nav-item nav-link"><hamburger-menu (click)="toggleDrawer()"></hamburger-menu></a>
                <a class="nav-item nav-link" [routerLink]="['/dashboard']" [routerLinkActive]="['active']">Dashboard</a>
                <a class="nav-item nav-link" [routerLink]="['/settings']" [routerLinkActive]="['active']">Settings</a>
                <a class="nav-item nav-link" [routerLink]="['/account']" [routerLinkActive]="['active']">Account</a>
                <a class="nav-item nav-link" [routerLink]="['/help']" [routerLinkActive]="['active']">Help</a>
            </nav>
            <form class="pull-xs-right">
                <input type="text" class="form-control" placeholder="Search...">
            </form>
        </div>
      </nav>
`
  ,
  styles: [`
    .closed {
        color: red !important;
    }
  `]
})
export class NavbarComponent {
  
  constructor(private commonService: CommonService) {
  }
  
  public toggleDrawer(): void {
    this.commonService.toggleDrawer();
  }
  
  public isOpen(): boolean {
    return this.commonService.isOpen();
  }
  
}
