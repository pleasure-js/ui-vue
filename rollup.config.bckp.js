const { name, version, author, peerDependencies: external, dependencies: only } = require('./package.json')
const minify = require('rollup-plugin-babel-minify')
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
const merge = require('deepmerge')

const banner = `/*!
 * ${name} v${version}
 * (c) 2018-${new Date().getFullYear()} ${author}
 * Released under the MIT License.
 */`

const dot = new Dot('-')

const getPlugins = ({ exportCss = false, minified = false } = {}) => {
  const plugs = []
  plugs.push(commonjs())

  if (exportCss) {
    plugs.push(postCss({
        extract: exportCss,
        minimize: minified,
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
      })
    )
  }

  plugs.push(vue({ css: !exportCss }))

  if (minified) {
    plugs.push(minify(merge({
      comments: false,
      banner,
      bannerNewLine: true
    }, typeof minified === 'object' ? minified : {})))
  }

  return plugs
}

const vuePleasureCss = getPlugins({ exportCss: `dist/vue-pleasure.css` })
const vuePleasureMin = getPlugins({ exportCss: `dist/vue-pleasure.min.css`, minified: true })
const vuePleasureElementCss = getPlugins({ exportCss: `dist/vue-pleasure.element-ui.css` })
const vuePleasureElementMin = getPlugins({ exportCss: `dist/vue-pleasure.element-ui.min.css`, minified: true })
const plugins = getPlugins()

module.exports = [
  {
    input: 'src/vue-pleasure.js',
    output: [
      {
        file: 'dist/vue-pleasure.js',
        name: 'VuePleasure',
        format: 'iife'
      }
    ],
    plugins: vuePleasureCss
  },
  {
    input: 'src/vue-pleasure.js',
    output: [
      {
        file: 'dist/vue-pleasure.cjs.js',
        format: 'cjs'
      },
      {
        file: 'dist/vue-pleasure.esm.js',
        format: 'esm'
      }
    ],
    plugins
  },
  {
    input: 'src/element-ui/index.js',
    output: [
      {
        file: 'dist/vue-pleasure.element-ui.js',
        name: 'ElementUiPleasure',
        format: 'iife'
      }
    ],
    plugins: vuePleasureElementCss
  },
  {
    input: 'src/element-ui/index.js',
    output: [
      {
        file: 'dist/vue-pleasure.element-ui.cjs.js',
        format: 'cjs'
      },
      {
        file: 'dist/vue-pleasure.element-ui.esm.js',
        format: 'esm'
      }
    ],
    plugins
  },
  {
    input: 'src/vue-pleasure.js',
    output: [
      {
        file: 'dist/vue-pleasure.min.js',
        format: 'iife',
        name: 'VuePleasure'
      }
    ],
    plugins: vuePleasureMin
  },
  {
    input: 'src/element-ui/index.js',
    output: [
      {
        file: 'dist/vue-pleasure.element-ui.min.js',
        format: 'iife',
        name: 'ElementUiPleasure'
      }
    ],
    plugins: vuePleasureElementMin
  }
]
