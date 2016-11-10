import {Request} from 'platform-tools/rx-extensions/src/Request';

export interface IQueue {
  
  append(request: Request, fn: (done?: () => void) => void): void;
  
  isRunning(): boolean;
  
  run(): void;
  
}
