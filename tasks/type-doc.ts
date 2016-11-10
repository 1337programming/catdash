import {Gulpclass, Task, SequenceTask} from 'gulpclass/Decorators';

// Globals
declare let __projectRoot: string;

let gulp = require('gulp');
let path = require('path');
let del = require('del');
let opn = require('opn');
let typedoc = require('gulp-typedoc');

@Gulpclass()
export class TypeDoc {
  
  /**
   * Generate documentation
   * @returns {any}
   */
  @Task('generate-doc')
  generateDoc() {
    let src = path.resolve(__projectRoot, 'app/src/**/*.ts');
    console.log(src);
    return gulp
      .src(src)
      .pipe(typedoc({
        mode: 'modules',
        out: path.resolve(__projectRoot, 'reports/doc'),
        theme: 'default',
        ignoreCompilerErrors: true,
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        target: 'ES5',
        moduleResolution: 'node',
        preserveConstEnums: true,
        stripInternal: true,
        suppressExcessPropertyErrors: true,
        suppressImplicitAnyIndexErrors: true,
        module: 'commonjs'
      }));
  }
  
  /**
   * Open the documentation
   */
  @Task('open-doc')
  openDoc() {
    opn(path.resolve(__projectRoot, 'reports/doc/index.html'));
  }
  
  /**
   * Build and open the documentation
   * @returns {string|string[]}
   */
  @SequenceTask() // this special annotation using 'run-sequence' module to run returned tasks in sequence
  typedoc() {
    return ['generate-doc'];
  }
  
  @SequenceTask('typedoc:open')
  typedocOpen() {
    return ['generate-doc', 'open-doc'];
  }
  
}

