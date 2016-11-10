import {Gulpclass, Task, SequenceTask} from 'gulpclass/Decorators';

// Globals
declare let __projectRoot: string;

let path = require('path');
let shell = require('gulp-shell');
let gulp = require('gulp');
let spawn = require('child_process').spawn;

@Gulpclass()
export class Serve {
  
  // Helper Tasks //
  
  /**
   * Serves up application in dev mode
   * @returns {any}
   */
  @Task('server:dev')
  serverDev(callback: Function) {
    return gulp.src(path.resolve(__projectRoot), {read: false, env: {FORCE_COLOR: true}})
      .pipe(shell(['webpack-dev-server --config config/webpack.dev.js --progress --profile --watch']));
  }
  
  @Task('server:dev:hmr')
  serverDevHmr() {
    return gulp.src(path.resolve(__projectRoot), {read: false})
      .pipe(shell(['webpack-dev-server --config config/webpack.dev.js --progress --profile --watch --inline --hot']));
  }
  
  /**
   * Serves up application in production mode
   * @returns {any}
   */
  @Task('server:prod')
  serverProd() {
    return gulp.src(path.resolve(__projectRoot), {read: false})
      .pipe(shell(['http-server dist --cors']));
  }
  
  @SequenceTask('pre-serve')
  preServe() {
    return ['lint'];
  }
  
  // Main Tasks //
  
  @SequenceTask()
  serve() {
    return ['pre-serve', 'server:dev'];
  }
  
  @SequenceTask('serve:dist')
  serveDist() {
    return ['pre-serve', 'clean:build', 'build:dev', 'server:prod'];
  }
  
  @SequenceTask('serve:hmr')
  serveHmr() {
    return ['pre-serve', 'server:dev:hmr'];
  }
  
  @SequenceTask('watch:dev')
  serveHmr() {
    return ['pre-serve', 'server:dev:hmr'];
  }
  
  @SequenceTask('watch:dev:hmr')
  serveHmr() {
    return ['pre-serve', 'server:dev:hmr'];
  }
  
  
}
