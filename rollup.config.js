const vue = require('rollup-plugin-vue')
const postCss = require('rollup-plugin-postcss')
const commonjs = require('rollup-plugin-commonjs')
const postCssVariables = require('postcss-css-variables')
const postCssNested = require('postcss-nested')
const postCssHexRgba = require('postcss-hexrgba')
const postCssColorFuntion = require('postcss-color-function')
const postCssCalc = require('postcss-calc')
const postCssPresetEnv = require('postcss-preset-env')
const Dot = require('dot-object')

const dot = new Dot('-')

const plugins = [
  commonjs(),
  postCss({
    extract: true,
    plugins: [
      postCssNested(),
      postCssHexRgba(),
      postCssColorFuntion(),
      postCssCalc(),
      postCssPresetEnv({
        stage: 4
      }),
      postCssVariables({
        variables: dot.dot(require('./postcss.variables.js'))
      })
    ]
  }),
  vue({ css: false })
]

module.exports = [
  {
    input: 'src/vue-pleasure.js',
    output: [
      {
        file: 'dist/vue-pleasure.js',
        format: 'cjs'
      },
      {
        file: 'dist/vue-pleasure.esm.js',
        format: 'esm'
      },
      {
        file: 'dist/vue-pleasure.iife.js',
        name: 'VuePleasure',
        format: 'iife'
      }
    ],
    plugins
  },
  {
    input: 'src/element-ui/index.js',
    output: [
      {
        file: 'dist/vue-pleasure.element-ui.js',
        format: 'cjs'
      },
      {
        file: 'dist/vue-pleasure.element-ui.esm.js',
        format: 'esm'
      },
      {
        file: 'dist/vue-pleasure.element-ui.iife.js',
        name: 'ElementUiPleasure',
        format: 'iife'
      }
    ],
    plugins
  }
]
