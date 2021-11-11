const path = require('path');
const fs = require('fs');
const execSh = require('exec-sh');

const { quickSpawn, quickSpawnPromise } = require('../lib/quick-spawn');

describe('Test Quick Spawn', () => {
  let TestInfo = {};

  beforeEach((done) => {
    const temp = path.resolve(__dirname, '../temp/');
    const parentPath = path.dirname(temp);
    TestInfo = {
      cmd: `echo 'Test case' && ping -n 3 127.0.0.1`,
      tempRoot: temp,
    };
    if (!fs.existsSync(temp)) {
      fs.mkdirSync(temp, { recursive: true });
    } else {
      console.log('temp work directory has been created, ready to test!');
      done();
    }
  });

  it('Test callback', (done) => {
    quickSpawn(
      'netstat',
      ['-a', '-n', '-p'],
      {
        cwd: TestInfo.tempRoot,
      },
      (err, data) => {
        if (err) {
          expect(err).toBeFalsy();
        } else {
          expect(data).toBeTruthy();
        }
        done();
      }
    );
  });

  it('Test exec-sh', (done) => {
    execSh(TestInfo.cmd, { cwd: TestInfo.tempRoot }, (err, stdout, stderr) => {
      if (err) {
        throw err;
      }
      //  cannot get command output
      console.log('error:', err);
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
      console.log('test exec-sh over!');
      done();
    });
  });

  it('Test promise', (done) => {
    quickSpawnPromise('ping', ['-n', '3', '127.0.0.1'], {
      cwd: TestInfo.tempRoot,
    })
      .then((data) => {
        expect(data).toBeTruthy();
        done();
      })
      .catch((err) => {
        expect(err).toBeFalsy();
        console.log(err);
        done();
      });
  });

  //  quickSpawn('command line',opts,callback)
  it('Test argumets: step A', (done) => {
    quickSpawn(
      TestInfo.cmd,
      {
        cwd: TestInfo.tempRoot,
      },
      (err, data) => {
        if (err) {
          expect(err).toBeFalsy();
        } else {
          expect(data).toBeTruthy();
        }
        done();
      }
    );
  });

  //  quickSpawn('command line',params,callback)
  it('Test argumets: step B', (done) => {
    quickSpawn('ping', ['-n', '4', '127.0.0.1'], (err, data) => {
      if (err) {
        expect(err).toBeFalsy();
      } else {
        expect(data).toBeTruthy();
      }
      done();
    });
  });
});
