import {Component, Input, Output, EventEmitter} from '@angular/core';

let style = require('!!raw!sass!./views/hamburger-menu.scss');

@Component({
  selector: 'hamburger-menu',
  template: `
    <button class="hamburger" [class.open]="active" type="button" (click)="toggle()">
    <span class="box">
        <span class="hamburger-inner"></span>
    </span>
    </button>
    `,
  styles: [style]
})
export class HamburgerMenuComponent {
  
  public active: boolean;
  
  @Output() private selectionChange: EventEmitter<Object>;
  
  constructor() {
    this.active = false;
    this.selectionChange = new EventEmitter();
  }
  
  public toggle() {
    this.active = !this.active;
    this.selectionChange.emit({val: this.active});
  }
}
