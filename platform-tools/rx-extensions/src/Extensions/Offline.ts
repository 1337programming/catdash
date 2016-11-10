import {AbstractExtension} from 'platform-tools/rx-extensions/src/Extensions/AbstractExtension';
import {Response} from 'platform-tools/rx-extensions/src/Response';

export class Offline extends AbstractExtension {
  
  private timer: any = null;
  
  private offline: boolean = !this.isOnline();
  
  private url: string;
  
  private timeout: number;
  
  constructor(url: string = 'favicon.ico', timeout: number = 5000, autostart: boolean = true) {
    super();
    
    this.url = url;
    this.timeout = timeout;
    
    if (autostart) {
      this.start();
    }
  }
  
  public start(): void {
    if (this.timer !== null) {
      throw new Error('Offline http extension is already running.');
    }
    
    this.check();
  }
  
  public stop(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
  
  private check() {
    
    this.timer = setTimeout(() => {
      let unique = Math.floor(Math.random() * 1000000000);		// prevent from caching
      
      if (this.isOnline()) {
        // Was Offline, now Online
        this.offline = false;
        this.http.connected.next(null);
      } else {
        // Was Online, now Offline
        this.offline = true;
        this.http.disconnected.next(null);
      }
      
      this.check();
      
    }, this.timeout);
  }
  
  private isOnline(): boolean {
    return navigator.onLine;
  }
  
  
}
