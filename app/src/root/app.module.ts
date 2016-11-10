import {NgModule, ApplicationRef} from '@angular/core';
import {removeNgStyles, createNewHosts, createInputTransfer} from '@angularclass/hmr';
import {modules, declarations, bootstrap, providers} from 'app/src/root/app.factory';
import {InternalStateType, AppState} from 'app/src/root/app.service';

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

@NgModule({
  imports: modules,
  declarations: declarations,
  providers: providers,
  bootstrap: bootstrap
})
export class AppModule {
  
  constructor(public appRef: ApplicationRef, public appState: AppState) {
  }
  
  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState.state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }
    
    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }
  
  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState.state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
    
    this.terminateWorkers();
  }
  
  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
  
  private terminateWorkers() {
    // nativeWorker.terminate();
    // reactiveWorker.terminate();
  }
}
