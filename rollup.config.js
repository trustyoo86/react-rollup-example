'use strict';

import rollup from 'rollup';
import { join, resolve } from 'path';

// rollup plugin
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-dev-server';
import html from 'rollup-plugin-bundle-html';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

// output dist
const distPath = resolve(__dirname, 'dist');
// src path
const srcPath = resolve(__dirname, 'src');


export default [{
  input: join(srcPath, 'App.jsx'),
  output: {
    file: join(distPath, 'main.bundle.js'),
    format: 'iife',
    sourcemap: 'inline',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    nodeResolve({
      jsnext: true,
      main: true,
      extensions: ['.js', '.jsx'],
    }),
    commonjs({
      include: 'node_modules/**',
      nameExports: {
        './node_modules/react/index.js': ['createElement', 'cloneElement', 'PropTypes', 'Children', 'Component'],
        './node_modules/react-dom/index.js': ['render'],
      },
    }),
    // html({
    //   template: join(srcPath, 'index.html'),
    //   dest: distPath,
    //   filename: 'index.html',
    //   inject: 'body',
    // }),
    // serve({
    //   contentBase: ['dist'],
    //   host: 'localhost',
    //   port: '9000',
    // })
  ],
}];