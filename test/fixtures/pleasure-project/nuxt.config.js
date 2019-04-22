const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  dev: isDev,
  srcDir: path.join(__dirname, 'client'),
  head: {
    meta: {
      link: {
        rel: `stylesheet`,
        href: `https://fonts.googleapis.com/css?family=Open+Sans`
      }
    }
  },
  vue: {
    config: {
      productionTip: isDev,
      devtools: isDev,
      silent: !isDev,
      performance: isDev
    }
  },
  css: [
    `@/assets/style.pcss`
  ]
}
