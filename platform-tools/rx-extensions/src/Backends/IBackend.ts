import {Request} from 'platform-tools/rx-extensions/src/Request';
import {Response} from 'platform-tools/rx-extensions/src/Response';

export interface IBackend {
  
  fetch(request: Request, cb: (err: Error, response: Response) => void): Function;
  
}
