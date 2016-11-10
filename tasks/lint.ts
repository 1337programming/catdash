import {Gulpclass, Task} from 'gulpclass/Decorators';
import tslint from 'gulp-tslint';

// Globals
declare let __projectRoot: string;

let path = require('path');
let shell = require('gulp-shell');
let gulp = require('gulp');

@Gulpclass()
export class Lint {
  
  /**
   * Runs linter
   * @returns {any}
   */
  @Task()
  lint() {
    return gulp.src(path.resolve(__projectRoot, 'app/**/*.ts'))
      .pipe(tslint({
        formatter: 'verbose'
      }))
      .pipe(tslint.report())
  }
  
  /**
   * Runs linter on code-examples
   * @returns {any}
   */
  @Task('lint:doc')
  lintDoc() {
    return gulp.src(path.resolve(__projectRoot, 'documentation/**/*.ts'))
      .pipe(tslint({
        formatter: 'verbose'
      }))
      .pipe(tslint.report())
  }
  
  /**
   * Runs linter on tests
   * @returns {any}
   */
  @Task('lint:test')
  lintDoc() {
    return gulp.src(path.resolve(__projectRoot, 'test/**/*.ts'))
      .pipe(tslint({
        formatter: 'verbose'
      }))
      .pipe(tslint.report())
  }
  
}
