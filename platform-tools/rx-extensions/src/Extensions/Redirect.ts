import {AbstractExtension} from 'platform-tools/rx-extensions/src/Extensions/AbstractExtension';
import {Response} from 'platform-tools/rx-extensions/src/Response';

export class Redirect {
  
  public success(response: Response): void {
    let data = response.json();
    
    if (data !== null && typeof data['redirect'] !== 'undefined') {
      window.location.href = data['redirect'];
    }
  }
  
}
