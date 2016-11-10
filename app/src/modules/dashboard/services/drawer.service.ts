import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class DrawerService {
  
  public drawerChange: EventEmitter<any>;
  private drawer: boolean;
  
  constructor() {
    this.drawer = true;
    this.drawerChange = new EventEmitter(); // This get's invoked from common service
  }
  
  public toggleDrawer(): void {
    this.drawer = !this.drawer;
  }
  
  public isOpen(): boolean {
    return this.drawer;
  }
  
}
