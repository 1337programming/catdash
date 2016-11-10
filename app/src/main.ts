/*
 * Angular bootstrapping
 */
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {bootloader} from '@angularclass/hmr';
import {decorateModuleRef} from 'app/src/root/environment';
/*
 * App Module
 * our top level module that holds all of our components
 */
import {AppModule} from 'app/src/root/app.module';

/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(decorateModuleRef);
    // .catch(err => console.error(err));  this hides template errors for some reason
}

// needed for hmr
// in prod this is replace for document ready
bootloader(main);
