import {Gulpclass, Task, SequenceTask} from 'gulpclass/Decorators';

// Globals
declare let __projectRoot: string;

let path = require('path');
let shell = require('gulp-shell');
let gulp = require('gulp');

@Gulpclass()
export class Server {
  
  /**
   * Serves up application in dev mode
   * @returns {any}
   */
  @Task()
  server() {
    return gulp.src(path.resolve(__projectRoot), {read: false})
      .pipe(shell(['cd mock-server && npm install && npm start']));
  }
  
}
