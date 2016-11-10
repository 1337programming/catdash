import {Gulpclass, Task, SequenceTask} from 'gulpclass/Decorators';

// Globals
declare let __projectRoot: string;

let gulp = require('gulp');
let plato = require('plato');
let glob = require('glob');
let path = require('path');
let opn = require('opn');

@Gulpclass()
export class Plato {
  
  @Task('plato:run')
  runPlato(cb:Function) {
  
    const files:Array<string> = glob.sync(path.resolve(__projectRoot, 'dist/**/*.js'));
    
    let outputDir:string = path.resolve(__projectRoot, 'reports/plato');
    let options:any = {
      title: 'Remo Code Analysis'
    };
    
    let callback:Function = (report) => {
      cb();
    };
  
    plato.inspect(files, outputDir, options, callback);
    
  }
  
  @Task('plato:open')
  openDoc() {
    opn(path.resolve(__projectRoot, 'reports/plato/index.html'));
  }
  
  @SequenceTask()
  plato() {
    return ['clean:report', 'plato:run'];
  }
  
  @SequenceTask('plato:open')
  platoOpen() {
    return ['clean:report', 'plato:run', 'plato:open'];
  }
  
}
