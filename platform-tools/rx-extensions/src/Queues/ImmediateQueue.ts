import {IQueue} from 'platform-tools/rx-extensions/src/Queues/IQueue';
import {Request} from 'platform-tools/rx-extensions/src/Request';

export class ImmediateQueue implements IQueue {
  
  public append(request: Request, fn: (done?: () => void) => void): void {
    fn();
  }
  
  public isRunning(): boolean {
    return false;
  }
  
  public run(): void {
    
  }
  
}
