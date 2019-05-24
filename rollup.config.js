const { name, version, author, peerDependencies: external, dependencies: only } = require('./package.json')
const minify = require('rollup-plugin-babel-minify')
const vue = require('rollup-plugin-vue')
const postCss = require('rollup-plugin-postcss')
const commonjs = require('rollup-plugin-commonjs')
const postCssVariables = require('postcss-css-variables')
const postCssExtend = require('postcss-extend')
const postCssEasings = require('postcss-easings')
const postCssNested = require('postcss-nested')
const postCssHexRgba = require('postcss-hexrgba')
const postCssColorFuntion = require('postcss-color-function')
const postCssCalc = require('postcss-calc')
const postCssPresetEnv = require('postcss-preset-env')
const Dot = require('dot-object')
const merge = require('deepmerge')
const { get, kebabCase, mapKeys } = require('lodash')

const banner = `/*!
 * ${name} v${version}
 * (c) 2018-${new Date().getFullYear()} ${author}
 * Released under the MIT License.
 */`

const dot = new Dot('-')

const pcssVars = mapKeys(dot.dot(require('./postcss.variables.js')), (v, k) => kebabCase(k).replace(/-default$/, ''))

const getPlugins = ({ exportCss = false, minified = false } = {}) => {
  const plugs = []
  plugs.push(commonjs())

  plugs.push(postCss({
      extract: exportCss,
      minimize: minified,
      plugins: [
        postCssPresetEnv({
          stage: 4
        }),
        postCssNested(),
        postCssExtend(),
        postCssEasings(),
        postCssVariables({
          variables: pcssVars
        }),
        postCssHexRgba(),
        postCssColorFuntion(),
        postCssCalc()
      ]
    })
  )

  plugs.push(vue({ css: false }))

  if (minified) {
    plugs.push(minify(merge({
      comments: false,
      bannerNewLine: true
    }, typeof minified === 'object' ? minified : {})))
  }

  return plugs
}

const vuePleasureCss = getPlugins({ exportCss: `dist/pleasure-ui-vue.css` })
const vuePleasureMin = getPlugins({ exportCss: `dist/pleasure-ui-vue.min.css`, minified: true })
const vuePleasureElementCss = getPlugins({ exportCss: `dist/pleasure-ui-vue.element-ui.css` })
const vuePleasureElementMin = getPlugins({ exportCss: `dist/pleasure-ui-vue.element-ui.min.css`, minified: true })
const plugins = getPlugins()

module.exports = [
  {
    input: 'src/pleasure-ui-vue.js',
    output: [
      {
        file: 'dist/pleasure-ui-vue.js',
        name: 'VuePleasure',
        format: 'iife',
        banner
      }
    ],
    plugins: vuePleasureCss
  },
  {
    input: 'src/pleasure-ui-vue.js',
    output: [
      {
        file: 'dist/pleasure-ui-vue.common.js',
        format: 'cjs',
        banner
      },
      {
        file: 'dist/pleasure-ui-vue.esm.js',
        format: 'esm',
        banner
      }
    ],
    plugins
  },
  {
    input: 'src/element-ui/index.js',
    output: [
      {
        file: 'dist/pleasure-ui-vue.element-ui.js',
        name: 'ElementUiPleasure',
        format: 'iife',
        banner
      }
    ],
    plugins: vuePleasureElementCss
  },
  {
    input: 'src/element-ui/index.js',
    output: [
      {
        file: 'dist/pleasure-ui-vue.element-ui.common.js',
        format: 'cjs',
        banner
      },
      {
        file: 'dist/pleasure-ui-vue.element-ui.esm.js',
        format: 'esm',
        banner
      }
    ],
    plugins
  },
  {
    input: 'src/pleasure-ui-vue.js',
    output: [
      {
        file: 'dist/pleasure-ui-vue.min.js',
        format: 'iife',
        name: 'VuePleasure',
        banner
      }
    ],
    plugins: vuePleasureMin
  },
  {
    input: 'src/element-ui/index.js',
    output: [
      {
        file: 'dist/pleasure-ui-vue.element-ui.min.js',
        format: 'iife',
        name: 'ElementUiPleasure',
        banner
      }
    ],
    plugins: vuePleasureElementMin
  }
]
