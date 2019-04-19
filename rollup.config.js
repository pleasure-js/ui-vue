const vue = require('rollup-plugin-vue')
const commonjs = require('rollup-plugin-commonjs')

module.exports = {
  input: 'src/vue-pleasure.js',
  output: [
    {
      file: 'dist/vue-pleasure.js',
      format: 'cjs'
    },
    {
      file: 'dist/vue-pleasure.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    commonjs(),
    vue()
  ]
}
