import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {ModuleWithProviders, Provider} from '@angular/core';
import {HttpModule} from '@angular/http';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {COMPILER_PROVIDERS} from '@angular/compiler';
import {SETTINGS} from 'app/src/core/settings';

// Modules
import {CustomCommonModule} from 'app/src/common/common.module';
import {DashboardModule} from 'app/src/modules/dashboard/dashboard.module';

// Components
import {AppComponent} from 'app/src/root/app.component';

// Services
import {AppState} from './app.service';
import {APP_RESOLVER_PROVIDERS} from './app.resolver';

// Routing
import {routing, appRoutingProviders} from 'app/src/root/app.router';
import {AuthService} from 'app/src/common/services/auth.service';

// Application wide providers
import {ENV_PROVIDERS} from './environment';
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

// Types
type Module = any | ModuleWithProviders | any[];
type Declaration = any | any[];

let appProviders: Array<Provider> = [AuthService, appRoutingProviders,
  {provide: LocationStrategy, useClass: HashLocationStrategy}, COMPILER_PROVIDERS, APP_PROVIDERS, ENV_PROVIDERS];
let appModules: Array<Module> = [BrowserModule, ReactiveFormsModule, FormsModule, HttpModule, CustomCommonModule,
  DashboardModule, routing];

// Dev only modules
if (!SETTINGS.PROD) {
  // appModules.push(...);
}

export let modules: Array<Module> = appModules;
export let declarations: Array<Declaration> = [AppComponent];
export let bootstrap: Array<Declaration> = [AppComponent];
export let providers: Array<Provider> = appProviders;

