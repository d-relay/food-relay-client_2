import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import config from 'sapper/config/rollup';
import svelte from 'rollup-plugin-svelte';
import esbuild from 'rollup-plugin-esbuild'
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import dotenv from 'dotenv';
dotenv.config();

import pkg from './package.json';

import { defaults } from './svelte.config.js';

const preprocess = [sveltePreprocess({ defaults, postcss: true, sass: true })];

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const sourcemap = dev ? 'inline' : false;
const sapperVersion = pkg.devDependencies.sapper.match(/[0-9]{1,5}/g).map(el => Number(el))

const warningIsIgnored = (warning) =>
  warning.message.includes(
    'Use of eval is strongly discouraged, as it poses security risks and may cause issues with minification'
  ) || warning.message.includes('Circular dependency: node_modules');

const optimizer = server => esbuild({
  include: /\.[jt]sx?$/,
  minify: server ? (sapperVersion[1] >= 28 && sapperVersion[2] > 0) ? false : true : true,
  target: 'esnext'
})


// Workaround for https://github.com/sveltejs/sapper/issues/1266
const onwarn = (warning, _onwarn) =>
  (warning.code === 'CIRCULAR_DEPENDENCY' &&
    /[/\\]@sapper[/\\]/.test(warning.message)) ||
  warningIsIgnored(warning) ||
  console.warn(warning.toString());

export default {
  client: {
    input: config.client.input().replace(/\.js$/, '.ts'),
    output: { ...config.client.output(), sourcemap },
    plugins: [
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
        'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL),
        'process.env.CLOUDINARY_VIDEO_URL': JSON.stringify(process.env.CLOUDINARY_VIDEO_URL),
        'process.env.CLOUDINARY_IMAGE_URL': JSON.stringify(process.env.CLOUDINARY_IMAGE_URL),
        'CLOUDINARY_IMAGE_URL': process.env.CLOUDINARY_IMAGE_URL
      }),
      json(),
      svelte({
        compilerOptions: {
          dev,
          hydratable: true,
        },
        emitCss: true,
        preprocess
      }),
      resolve({
        browser: true,
        dedupe: ['svelte']
      }),
      commonjs({
        sourceMap: !!sourcemap
      }),
      typescript({
        noEmitOnError: !dev,
        sourceMap: !!sourcemap
      }),
      // optimizer(),
      !dev &&
      terser({
        module: true
      })
    ],

    preserveEntrySignatures: false,
    onwarn
  },

  server: {
    input: { server: config.server.input().server.replace(/\.js$/, '.ts') },
    output: { ...config.server.output(), sourcemap },
    plugins: [
      replace({
        'process.browser': false,
        'process.env.NODE_ENV': JSON.stringify(mode),
        'module.require': 'require'
      }),
      json(),
      svelte({
        compilerOptions: {
          dev,
          generate: 'ssr',
        },
        preprocess
      }),
      resolve({
        dedupe: ['svelte']
      }),
      commonjs({
        sourceMap: !!sourcemap
      }),
      typescript({
        noEmitOnError: !dev,
        sourceMap: !!sourcemap
      }),
      // optimizer(),
    ],
    external: Object.keys(pkg.dependencies).concat(
      require('module').builtinModules ||
      Object.keys(process.binding('natives'))
    ),

    preserveEntrySignatures: 'strict',
    onwarn
  },

  serviceworker: {
    input: config.serviceworker.input().replace(/\.js$/, '.ts'),
    output: { ...config.serviceworker.output(), sourcemap },
    plugins: [
      resolve(),
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode)
      }),
      commonjs({
        sourceMap: !!sourcemap
      }),
      typescript({
        noEmitOnError: !dev,
        sourceMap: !!sourcemap
      }),
      // optimizer(),
      !dev && terser()
    ],

    preserveEntrySignatures: false,
    onwarn
  }
};
