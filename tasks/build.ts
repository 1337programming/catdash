import {Gulpclass, Task, SequenceTask} from 'gulpclass/Decorators';

// Globals
declare let __projectRoot: string;

let path = require('path');
let shell = require('gulp-shell');
let opn = require('opn');
let gulp = require('gulp');

@Gulpclass()
export class Build {
  
  // Helper Tasks //
  
  @Task('build:dev')
  buildDev() {
    return gulp.src(path.resolve(__projectRoot), {read: false})
      .pipe(shell(['webpack --config config/webpack.dev.js --progress --profile']));
  }
  
  @Task('build:docker')
  buildDev() {
    return gulp.src(path.resolve(__projectRoot), {read: false})
      .pipe(shell(['webpack --config config/webpack.prod.js  --progress --profile --bail && docker build -t angular2-webpack-start:latest .']));
  }
  
  @Task('build:prod')
  buildDev() {
    return gulp.src(path.resolve(__projectRoot), {read: false})
      .pipe(shell(['webpack --config config/webpack.prod.js  --progress --profile --bail']));
  }
  
  @Task('bundle')
  webpackBuild() {
    return gulp.src(path.resolve(__projectRoot), {read: false})
      .pipe(shell(['webpack --prod --progress --profile --colors --display-error-details --display-cached --optimize-occurrence-order --optimize-dedupe']));
  }
  
  @Task('add-server')
  addServer() {
    return gulp.src(path.resolve(__projectRoot, 'server.js'))
      .pipe(gulp.dest(path.resolve(__projectRoot, 'dist')))
  }
  
  @Task('copy-package')
  copyPackage() {
    return gulp.src(path.resolve(__projectRoot, 'package.json'))
      .pipe(gulp.dest(path.resolve(__projectRoot, 'dist')))
  }
  
  @SequenceTask('pre-build')
  preBuild() {
    return ['lint', 'clean:build']
  }
  
  @Task('dist-server')
  openDist() {
    return gulp.src(path.resolve(__projectRoot), {read: false})
      .pipe(shell(['http-server dist']));
  }
  
  // Main Tasks //
  
  @SequenceTask()
  build() {
    return ['pre-build', 'build:prod', 'add-server', 'copy-package']
  }
  
  @SequenceTask('build:serve')
  buildServe() {
    return ['pre-build', 'build:dev', 'add-server', 'copy-package', 'dist-server'];
  }
  
}
