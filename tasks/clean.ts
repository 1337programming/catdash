import {Gulpclass, Task} from 'gulpclass/Decorators';

// Globals
declare let __projectRoot: string;

let path = require('path');
let del = require('del');

@Gulpclass()
export class Clean {
  
  /**
   * Clean Task, deletes build and report folders
   * @param cb
   * @returns {any}
   */
  @Task()
  clean(cb: Function) {
    let dist: string = path.resolve(__projectRoot, 'dist/**');
    let doc: string = path.resolve(__projectRoot, 'doc/**');
    let report: string = path.resolve(__projectRoot, 'report/**');
    let pouchdb: string = path.resolve(__projectRoot, 'pouchdb-logs/**');
    return del([dist, doc, report, pouchdb], cb);
  }
  
  @Task('clean:pouchdb')
  cleanPouchdb(cb: Function) {
    let pouchdb: string = path.resolve(__projectRoot, 'pouchdb-logs/**');
    return del([pouchdb], cb);
  }
  
  @Task('clean:report')
  cleanReport(cb: Function) {
    let reports: string = path.resolve(__projectRoot, 'reports/**');
    return del([reports], cb);
  }
  
  @Task('clean:build')
  cleanBuild(cb: Function) {
    let dist: string = path.resolve(__projectRoot, 'dist/**');
    return del([dist], cb);
  }
  
}
