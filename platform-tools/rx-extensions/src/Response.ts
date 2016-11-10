import {Subject} from 'rxjs/Subject';
import {Helpers} from 'platform-tools/rx-extensions/src/Utils/Helpers';

export interface ResponseI {
  status: number;
  statusText: string;
  contentType: string;
  data: any;
  headers: any;
  progress: Subject<any>;
  json(): Function;
}

export class Response {
  
  public status: number = null;
  
  public statusText: string = null;
  
  public contentType: string = null;
  
  public data: any = null;
  
  public headers: any = null;
  
  public progress: Subject<any> = new Subject<any>();
  
  private _json: any = null;
  
  public json(): any {
    if (this._json === null) {
      if (this.data === '') {
        this._json = false;
        
      } else {
        this._json = JSON.parse(this.data);
      }
    }
    
    return this._json ? this._json : null;
  }
  
  public getHeader(header: string): string {
    if (!this.headers) {
      return null;
    }
    
    return typeof this.headers[header] === 'undefined' ? null : this.headers[header];
  }
  
  public testContentType(contentType): boolean {
    return this.contentType !== null && this.contentType.match(Helpers.escapeString(contentType)) !== null;
  }
  
  public isApplicationJson(): boolean {
    return this.testContentType('application/json');
  }
  
  public isApplicationJavascript(): boolean {
    return this.testContentType('application/javascript');
  }
  
  public isTextJavascript(): boolean {
    return this.testContentType('text/javascript');
  }
  
}
