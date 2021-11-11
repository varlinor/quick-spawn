'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');
var child_process = require('child_process');
var Promise$1 = require('bluebird');
var iconv = require('iconv-lite');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var Promise__default = /*#__PURE__*/_interopDefaultLegacy(Promise$1);
var iconv__default = /*#__PURE__*/_interopDefaultLegacy(iconv);

//  default work directory
const _def_cwd = path__default["default"].resolve(__dirname, '../temp');
const _def_opts = {
  cwd: _def_cwd,
  silent: false,
};

let _def_env = {
  encoding: 'cp936',
  cmd: 'cmd',
  arg: '/C',
};

const platformCheck = function () {
  if (process.platform === 'win32') {
    _def_env = {
      encoding: 'cp936',
      cmd: 'cmd',
      arg: '/C',
    };
  } else {
    _def_env = {
      encoding: 'utf-8',
      cmd: 'sh',
      arg: '-c',
    };
  }
};

platformCheck();
/**
 * validate result is success or failure
 * @param {*} code
 * @param {*} out
 * @param {*} err
 * @returns
 */
function validateSuccess(code, out, err) {
  return code === 0 && err === '';
}

/**
 * 格式化错误信息
 * @param {*} code
 * @param {*} info
 * @returns
 */
function formatError(code, info) {
  const e = new Error(info);
  e.code = code;
  e.output = info;
  return e;
}

/**
 * 将子进程可能输出转为utf8
 * @param {*} str
 * @returns
 */
function decodeFromBuffer(data) {
  if (data) {
    // console.log('cur data:', data, ' encoding:', _def_encoding);
    return iconv__default["default"].decode(Buffer.from(data), _def_env.encoding);
  } else {
    return data;
  }
}

/**
 * support:
 *   quickSpawn('command line',callback)
 *   quickSpawn('command line',params,callback)
 *   quickSpawn('command line',opts,callback)
 *   quickSpawn('command line',opts, params, callback)
 * @param {*} cmd
 * @param {*} params
 * @param {*} opts
 * @param {*} callback  callback(err,data)
 */
const quickSpawn = function (cmd, params, opts, callback) {
  let silent = false,
    cbFunc = callback && typeof callback === 'function' ? callback : () => {};
  const outInfo = [],
    errInfo = [],
    innerPArr = [];
  if (cmd && typeof cmd === 'string') {
    if (params) {
      if (typeof params === 'function') {
        cbFunc = params;
        params = null;
      } else if (typeof params === 'string') {
        innerPArr = [params];
      } else if (Array.isArray(params)) {
        params.map((str) => {
          if (str) {
            if (Array.isArray(str)) {
              innerPArr.push(...str);
            } else {
              innerPArr.push(str);
            }
          }
        });
      } else if ('[object Object]' === params.toString()) ;
    }
    if (opts) {
      if (typeof opts === 'function') {
        cbFunc = opts;
        opts = null;
        if ('[object Object]' === params.toString()) {
          opts = { ..._def_opts, ...params };
          params = null;
        } else {
          opts = { ..._def_opts };
        }
      } else {
        opts = { ..._def_opts, ...opts };
      }
    } else {
      opts = { ..._def_opts };
    }
    if (opts) {
      silent = opts.silent;
    }

    const s = child_process.spawn(_def_env.cmd, [_def_env.arg, cmd, ...innerPArr], opts);

    s.on('error', (err) => {
      cbFunc && cbFunc(err);
    });
    s.on('close', (code, signal) => {
      const outStr = outInfo.join('');
      const errStr = errInfo.join('');
      if (validateSuccess(code, outStr, errStr)) {
        cbFunc && cbFunc(null, outStr);
      } else {
        const err = formatError(code, outStr);
        cbFunc && cbFunc(err);
      }
    });

    s.stdout.on('data', (info) => {
      const infoStr = decodeFromBuffer(info);
      if (!silent) {
        process.stdout.write(infoStr);
      }
      outInfo.push(infoStr);
    });

    s.stderr.on('data', (info) => {
      const infoStr = decodeFromBuffer(info);
      if (!silent) {
        process.stderr.write(infoStr);
      }
      errInfo.push(infoStr);
    });
  } else {
    cbFunc(new Error(`Command line is illegal, please check it! cmd:${cmd}`));
  }
};

/**
 * support for promise call
 * @param {*} cmd
 * @param {*} params
 * @param {*} opts
 * @returns
 */
const quickSpawnPromise = function (cmd, params, opts) {
  return new Promise__default["default"]((resolve, reject) => {
    quickSpawn(cmd, params, opts, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

exports.quickSpawn = quickSpawn;
exports.quickSpawnPromise = quickSpawnPromise;
