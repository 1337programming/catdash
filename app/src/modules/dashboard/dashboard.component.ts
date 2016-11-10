import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'dashboard',
  template: `
            <div class="row">
                <drawer></drawer>
                <router-outlet></router-outlet>
            </div>
            `
})
export class DashboardComponent {
  
  constructor(private router: Router) {
  }
  
}
