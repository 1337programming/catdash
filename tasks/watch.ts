import {Gulpclass, Task, SequenceTask} from 'gulpclass/Decorators';

// Globals
declare let __projectRoot: string;

let path = require('path');
let shell = require('gulp-shell');
let gulp = require('gulp');

@Gulpclass()
export class Watch {
  
  // Helper Tasks //
  
  /**
   * Serves up application in dev mode
   * @returns {any}
   */
  
  @Task('watch-dev-hmr')
  watchHotTask() {
    return gulp.src(path.resolve(__projectRoot), {read: false})
      .pipe(shell(['webpack --config config/webpack.dev.js --progress --profile --watch --hot']));
  }
  
  @Task('watch-dev')
  watchDevTask() {
    return gulp.src(path.resolve(__projectRoot), {read: false})
      .pipe(shell(['webpack --config config/webpack.dev.js --progress --profile --watch']));
  }
  
  @Task('watch-prod')
  watchProdTask() {
    return gulp.src(path.resolve(__projectRoot), {read: false})
      .pipe(shell(['webpack --config config/webpack.prod.js  --progress --profile --bail --watch']));
  }
  
  @Task('watch-test')
  watchTestTask() {
    // @TODO fix
    return gulp.src(path.resolve(__projectRoot), {read: false})
      .pipe(shell(['karma start --auto-watch --no-single-run']));
  }
  
  @SequenceTask('watch:dev:hmr')
  watchDevHmr() {
    return ['lint', 'watch-dev-hmr'];
  }
  
  @SequenceTask('watch:dev')
  preServe() {
    return ['lint', 'watch-dev'];
  }
  
  @SequenceTask('watch:prod')
  preServe() {
    return ['lint', 'watch-prod'];
  }
  
  @SequenceTask('watch:test')
  preServe() {
    return ['lint', 'watch-test'];
  }
  
}
