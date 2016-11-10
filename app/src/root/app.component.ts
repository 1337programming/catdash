import {Component, OnInit, HostListener, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'app/src/common/services/auth.service';

@Component({
  selector: 'app',
  template: `
        <navbar></navbar>
        <div (window:resize)="onWindowResize()" class="container-fluid">
            <router-outlet></router-outlet>
        </div>
            `
})
export class AppComponent implements OnInit {
  
  public bufferLoaded = false;
  public size: any;
  
  constructor(private authService: AuthService, private router: Router) {
    this.size = {};
  }
  
  public ngOnInit() {
    this.onWindowResize();
    setTimeout(() => this.bufferLoaded = true, 4200);
    
    // Application initialization
  }
  
  public onWindowResize() {
    this.size.width = window.innerWidth;
    this.size.height = window.innerHeight;
  }
  
  private getLoadProgress() {
    const bfrCount = this.bufferLoaded ? 1 : 0;
    return 101;
  }
  
  private isLoading() {
    return this.getLoadProgress() < 100;
  }
  
  private isLoggingIn(): boolean {
    // @TODO use event emitter istead of ngIf
    return location.hash.indexOf('login') !== -1;
  }
  
}
