import {Injectable} from '@angular/core';
import {DrawerService} from 'app/src/modules/dashboard/services/drawer.service';

@Injectable()
export class CommonService {
  
  constructor(private drawerService: DrawerService) {
  }
  
  public toggleDrawer(): void {
    // this.drawerService.drawerChange.emit(true);
    this.drawerService.toggleDrawer();
  }
  
  public isOpen(): boolean {
    return this.drawerService.isOpen();
  }
  
}
