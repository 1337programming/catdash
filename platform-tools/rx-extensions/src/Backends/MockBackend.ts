import {IBackend} from 'platform-tools/rx-extensions/src/Backends/IBackend';
import {Request} from 'platform-tools/rx-extensions/src/Request';
import {Response} from 'platform-tools/rx-extensions/src/Response';
import {Helpers} from 'platform-tools/rx-extensions/src/Utils/Helpers';
import {HeadersList, MockReceiverOptions} from 'platform-tools/rx-extensions/src/interfaces';

export class MockBackend implements IBackend {
  
  private static COUNTER: number = 0;
  
  private static JSONP_METHOD_PREFIX = '__rxajax_mock_jsonp_callback_';
  
  
  private receiving: MockReceiverOptions;
  
  constructor() {
    this.receiving = null;
  }
  
  
  public fetch(request: Request, cb: (err: Error, response: Response) => void): Function {
    let response = new Response;
    
    if (!this.receiving) {
      cb(null, new Response);
      return;
    }
    
    MockBackend.COUNTER++;
    
    setTimeout(() => {
      let jsonpCallbackName: string = null;
      
      if (request.jsonp) {
        jsonpCallbackName = MockBackend.JSONP_METHOD_PREFIX + MockBackend.COUNTER;
      }
      
      response.status = this.receiving.statusCode;
      response.headers = this.receiving.headers;
      
      if ((response.status >= 200 && response.status < 300) || response.status === 304) {
        if (response.status === 204 || request.method === 'HEAD') {
          response.statusText = 'nocontent';
          
        } else if (response.status === 304) {
          response.statusText = 'notmodified';
          
        } else {
          response.statusText = this.receiving.statusText;
          response.contentType = typeof this.receiving.headers['content-type'] === 'undefined' ? 'text/plain' : this.receiving.headers['content-type'];
          
          let data = this.receiving.data === true ? request.data : <string>this.receiving.data;
          
          if (request.jsonPrefix) {
            let prefix = Helpers.escapeString(request.jsonPrefix);
            data = data.replace(new RegExp('^' + prefix), '');
          }
          
          if (request.jsonp) {
            window[jsonpCallbackName] = (data) => {
              response.data = data;
            };
            
            eval(data);
            
          } else {
            response.data = data;
          }
        }
        
        cb(null, response);
      } else {
        response.statusText = this.receiving.statusText;
        
        let error = new Error('Error loading resource ' + request.url + ' - server replied: ' + response.statusText + ' (' + response.status + ').');
        error['request'] = request;
        
        cb(error, null);
      }
    }, this.receiving.timeout);
    
    return () => {
    };
  }
  
  public receive(data: string = '', headers: HeadersList = {}, statusCode: number = 200, statusText: string = 'ok', timeout: number = 0): void {
    this.receiving = {
      data: data,
      headers: headers,
      statusCode: statusCode,
      statusText: statusText,
      timeout: timeout,
    };
  }
  
  public receiveAndResend(headers: HeadersList = {}, statusCode: number = 200, statusText: string = 'ok', timeout: number = 0): void {
    this.receiving = {
      data: true,
      headers: headers,
      statusCode: statusCode,
      statusText: statusText,
      timeout: timeout,
    };
  }
  
}
