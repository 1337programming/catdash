import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/interval';

@Injectable()
export class Random {
  
  private static getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  constructor() {
  }
  
  public nextInt(min: number, max: number): number {
    return min + Math.floor(Math.random() * (max - min));
  }
  
  public element<T>(array: T[]): any {
    return array[this.nextInt(0, array.length)];
  }
  
  public sampler<T>(array: T[]) {
    let previous: T;
    return () => {
      const options: any = array.slice(0).filter((x) => x !== previous);
      return previous = this.element(options);
    };
  }
  
  public markovProcess(minDelay: number, maxDelay: number): boolean {
    return Observable.create((observer) => {
      let running: boolean = true;
      let next: Function = () => {
        if (running) {
          observer.next();
          setTimeout(next, this.nextInt(minDelay, maxDelay));
        }
      };
      next();
      
      return () => running = false;
    });
  }
  
  public randomWalk(startStep: number, minChange: number, maxChange: number): boolean {
    return Observable.create((observer) => {
      let running: boolean = true;
      let step: number = startStep;
      let next = () => {
        if (running) {
          step += this.nextInt(minChange, maxChange);
          observer.next();
          setTimeout(next, step);
        }
      };
      next();
      
      return () => running = false;
    });
  }
  
  public constrainedRandomWalk(startStep: number, minStep: number, maxStep: number,
                               minChange: number, maxChange: number): boolean {
    return Observable.create((observer) => {
      let running: boolean = true;
      let step: number = startStep;
      /*(async () => {
       while (running) {
       step += this.nextInt(minChange, maxChange);
       step = Math.min(step, maxStep);
       step = Math.max(step, minStep);
       observer.next();
       await this.sleep(step);
       }
       })();*/
      return () => running = false;
    });
  }
  
  public randomWalkInterp(min, max, stepsPerInterval): boolean {
    return Observable.create((observer) => {
      let running: boolean = true;
      let current: number = this.nextInt(min, max);
      let next: number = this.nextInt(min, max);
      let step: number = 0;
      /*(async () => {
       while (running) {
       const diff         = next - current;
       const stepFraction = step / stepsPerInterval;
       const val          = current + stepFraction * diff;
       
       observer.next();
       await this.sleep(val);
       
       step++;
       if (step === stepsPerInterval) {
       current = next;
       next = this.nextInt(min, max);
       step = 0;
       }
       }
       })();*/
      return () => running = false;
    });
  }
  
  public noise(x: number): number {
    x = (x << 13) ^ x;
    return (1.0 - ((x * (x * x * 15731 + 789221) + 1376312589) & 0x7fffffff) / 1073741824.0);
  }
  
  public linearInterpolate(a, b, x): number {
    return a * (1 - x) + b * x;
  }
  
  public cosineInterpolate(a: number, b: number, x: number): number {
    const ft: number = x * Math.PI;
    const f: number = (1 - Math.cos(ft)) * .5;
    return a * (1 - f) + b * f;
  }
  
  public interpolatedNoise(x): number {
    const xFloor: number = Math.floor(x);
    const xFraction: number = x - xFloor;
    const v1: number = this.noise(xFloor);
    const v2: number = this.noise(xFloor + 1);
    return this.cosineInterpolate(v1, v2, xFraction);
  }
  
  public perlinNoise(initialDelay, sleepTime = 200, adjust = 5): boolean {
    const persistence: number = 1 / 2;
    const numberOfOctaves: number = 4;
    return Observable.create((observer) => {
      let running: boolean = true;
      
      let x: number = Math.random();
      /*let nextNoise = async () => {
       await this.sleep(initialDelay);
       while (running) {
       let total = 0;
       for (let i=0 ; i < numberOfOctaves - 1 ; i++) {
       const frequency = 2 ** i;
       const amplitude = persistence ** i;
       total = total + this.interpolatedNoise(x * frequency) * amplitude;
       }
       const probability = (total + 1) / adjust;
       const yes = (Math.random() < probability);
       if (yes) {
       observer.next();
       }
       await this.sleep(sleepTime);
       x += 0.2;
       }
       };
       nextNoise();*/
      return () => running = false;
    });
  }
  
  public simpleCurve(samplesPerStep: number = 10): Observable<any> {
    return Observable.interval(100)
      .map(i => i / samplesPerStep)
      .map(step => this.interpolatedNoise(step));
  }
  
  
  private sleep(ms: number): any {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
}
