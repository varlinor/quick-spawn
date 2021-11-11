// rollup.config.js
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/quick-spawn.js',
    format: 'cjs',
  },
  plugins: [json(), commonjs(), nodeResolve()],
  external: [
    'fs',
    'path',
    'events',
    'child_process',
    'util',
    'os',
    'process',
    'promise',
    'bluebird',
    'iconv-lite',
  ],
};
