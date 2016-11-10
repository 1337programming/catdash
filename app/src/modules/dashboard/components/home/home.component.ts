import {Component} from '@angular/core';

let template = require('./views/home.html');
let style = require('!!raw!sass!./views/home.scss');

@Component({
  selector: 'home',
  template: template,
  styles: [style]
})
export class HomeComponent {
  
  constructor() {
  }
  
}
