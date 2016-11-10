import {Component, OnInit, trigger, animate, state, transition, style} from '@angular/core';
import {MenuItem} from 'primeng/primeng';
import {DrawerService} from 'app/src/modules/dashboard/services/drawer.service';
import {drawerItems} from 'app/src/modules/dashboard/components/drawer/drawer-items.mock';

let drawerStyle = require('!!raw!sass!./views/drawer.scss');

@Component({
  selector: 'drawer',
  template: `
        <div class="col-sm-3 col-md-2 sidebar" [@drawerState]="getDrawerState()">
            <p-panelMenu [model]="items" [style]="{'width':'250'}"></p-panelMenu>
        </div>
    `,
  styles: [drawerStyle],
  animations: [
    trigger('drawerState', [
      state('open', style({transform: 'translateX(0)'})),
      state('close', style({transform: 'translateX(-100%)'})),
      transition('open => close', animate('100ms ease-in')),
      transition('close => open', animate('100ms ease-out')),
      transition('void => open', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('open => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ]),
      transition('void => close', [
        style({transform: 'translateX(0)'}),
        animate(200)
      ]),
      transition('close => void', [
        animate(200, style({transform: 'translateX(0)'}))
      ])
    ])
  ]
})
export class DrawerComponent implements OnInit {
  
  public items: MenuItem[];
  
  constructor(private drawerService: DrawerService) {
    this.items = drawerItems;
  }
  
  public ngOnInit() {
    this.drawerService.drawerChange.subscribe((res) => {
      
    }, (err) => {
      console.error(err);
    });
  }
  
  public getDrawerState(): string {
    if (this.drawerService.isOpen()) {
      return 'open';
    } else {
      return 'close';
    }
  }
  
  private toggleDrawer(): void {
    this.drawerService.toggleDrawer();
  }
  
}
