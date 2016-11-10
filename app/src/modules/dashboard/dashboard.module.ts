import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

// Modules
import {PanelMenuModule} from 'primeng/primeng';
import {CustomCommonModule} from 'app/src/common/common.module';

// Components
import {DashboardComponent} from 'app/src/modules/dashboard/dashboard.component';
import {DrawerComponent} from 'app/src/modules/dashboard/components/drawer/drawer.component';
import {HomeComponent} from 'app/src/modules/dashboard/components/home/home.component';

// Services
import {DrawerService} from 'app/src/modules/dashboard/services/drawer.service';

// Routing
import {routing} from 'app/src/modules/dashboard/dashboard.router';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, HttpModule, PanelMenuModule, routing, CustomCommonModule
  ],
  declarations: [DashboardComponent, DrawerComponent, HomeComponent],
  providers: [
    DrawerService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ]
})
export class DashboardModule {
}
