import {HttpExtension} from 'platform-tools/rx-extensions/src/Http';
import {Request} from 'platform-tools/rx-extensions/src/Request';
import {Response} from 'platform-tools/rx-extensions/src/Response';

export abstract class AbstractExtension {
  
  protected http: HttpExtension;
  
  
  public attach(http: HttpExtension): void {
    this.http = http;
  }
  
  public send(request: Request): void {
    
  }
  
  public afterSend(request: Request): void {
    
  }
  
  public success(response: Response): void {
    
  }
  
  public error(err: Error): void {
    
  }
  
}
