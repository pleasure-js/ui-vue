const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
const { getConfig } = require('pleasure')
const _ = require('lodash')

console.log(`pleasure config`, getConfig())
const nodeModule = name => {
  return path.join(__dirname, 'node_modules', name)
}
const PleasureEnv = {
  $pleasure: true,
  '$pleasure.settings': {
    ui: 'element-ui'
  }
}
_.forOwn(getConfig(), (value, name) => {
  PleasureEnv[`$pleasure.${name}`] = value
})

module.exports = {
  dev: isDev,
  srcDir: path.join(__dirname, 'client'),
  env: PleasureEnv,
  build: {
    transpile: ['pleasure', 'vue-pleasure', 'nuxt-pleasure']
  },
  css: [
    `element-ui/lib/theme-chalk/display.css`,
    `element-ui/packages/theme-chalk/lib/index.css`
  ],
  vue: {
    config: {
      productionTip: isDev,
      devtools: isDev,
      silent: !isDev,
      performance: isDev
    }
  },
  plugins: [
    `~/plugins/setup-element-ui.js`,
    `~/plugins/pleasure.js`
  ]
  /*xx
    modules: [
      ['nuxt-pleasure', {
        locales: {
          sandy: 'papo'
        }
      }]
    ]
  */
}
