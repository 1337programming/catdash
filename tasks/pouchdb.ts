import {Gulpclass, Task, SequenceTask} from 'gulpclass/Decorators';

// Globals
declare let __projectRoot: string;
declare let __pouchdbport: number
declare let __pouchdbendpoint:string;

let path = require('path');
let shell = require('gulp-shell');
let gulp = require('gulp');

@Gulpclass()
export class PouchDB {
  
  @Task('pouchdb:run')
  pouchdbRun() {
    return gulp.src(path.resolve(__projectRoot), {read: false})
      .pipe(shell([`cd pouchdb-logs && pouchdb-server --port ${__pouchdbport}`]));
  }
  
  @Task('pouchdb:test')
  pouchdbTest() {
    return gulp.src(path.resolve(__projectRoot), {read: false})
      .pipe(shell([`curl ${__pouchdbendpoint}:${__pouchdbport}`]));
  }
  
  @Task('pouchdb:setup')
  pouchdbSetup() {
    return gulp.src(path.resolve(__projectRoot), {read: false})
      .pipe(shell(['mkdir pouchdb-logs']));
  }
  
  @SequenceTask()
  pouchdb() {
    return ['clean:pouchdb', 'pouchdb:setup', 'pouchdb:run'];
  }
  
}
