import {Gulpclass, Task, SequenceTask} from 'gulpclass/Decorators';

// Globals
declare let __projectRoot: string;

let path = require('path');
let Server = require('karma').Server;
let opn = require('opn');

@Gulpclass()
export class Test {
  
  public configPath: string = path.resolve(__projectRoot, 'config/karma.conf.js');
  
  /**
   * Run Full Jasmine tests using Karama as the test runner
   * @param cb
   */
  @Task('test:dev')
  testDev(cb: Function) {
    console.log('\x1b[36m', 'test:dev uses the "Chrome" launcher. \nFor more performance run test:unit instead. However debugging will be insufficient.','\x1b[0m');
    new Server({
      configFile: this.configPath,
      autoWatch: true,
      singleRun: false,
      reporters: ['mocha', 'coverage'],
      browsers: ['Chrome']
    }).start();
  }
  
  /**
   * Run Full Jasmine tests using Karama as the test runner
   * @param cb
   */
  @Task('test:full')
  testFull(cb: Function) {
    console.log('\x1b[33m', 'Warning: Source maps are broken -- Coverage reports might be compromised.' ,'\x1b[0m');
    console.log('\x1b[36m', 'If you want to watch test files then use either test:dev or test:unit instead.' ,'\x1b[0m');
    new Server({
      configFile: this.configPath,
      autoWatch: false,
      singleRun: true,
      reporters: ['mocha', 'coverage', 'remap-coverage'],
      browsers: ['Chrome']
    }).start();
  }
  
  /**
   * Run Unit Jasmine tests using Karama as the test runner
   * @param cb
   */
  @Task('test:unit')
  testUnit(cb: Function) {
    new Server({
      configFile: this.configPath,
      autoWatch: true,
      singleRun: false,
      reporters: ['mocha', 'coverage'],
      browsers: ['PhantomJS2']
    }).start();
  }
  
  /**
   * @TODO Coverage does not produce static builds
   */
  @Task('test:open.coverage')
  openCoverage() {
    console.log('Task is not support, please exit'); // @TODO remove when fixed
    opn(path.resolve(__projectRoot, 'test/coverage/index.html'));
  }
  
  /**
   * @TODO fix
   * @returns {string|string[]}
   */
  @SequenceTask('test:unit-open')
  testUnitOpen() {
    return ['test:unit', 'test:open.coverage'];
  }
  
  @SequenceTask()
  test() {
    return ['test:unit'];
  }
  
}
