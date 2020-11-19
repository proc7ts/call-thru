import { externalModules } from '@proc7ts/rollup-helpers';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import ts from '@wessberg/rollup-plugin-ts';
import sourcemaps from 'rollup-plugin-sourcemaps';
import typescript from 'typescript';
import pkg from './package.json';

export default {
  input: './src/index.ts',
  plugins: [
    commonjs(),
    ts({
      typescript,
      tsconfig: 'tsconfig.main.json',
      hook: {
        outputPath(path, kind) {
          if (kind === 'declaration') {
            return './index.d.ts';
          }
        },
      },
    }),
    nodeResolve(),
    sourcemaps(),
  ],
  external: externalModules(),
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
};
