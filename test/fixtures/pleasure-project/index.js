const Koa = require('koa')
const _ = require('lodash')
const { pleasureApi, getEntities, getConfig } = require('pleasure')
const koaBody = require('koa-body')
const { Nuxt, Builder } = require('nuxt')
const nuxtConfig = require('./nuxt.config.js')

console.log(`pleasure-project-config`, getConfig())

async function start (port) {
  const nuxt = new Nuxt(nuxtConfig)  // Build in development

  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  const app = new Koa()

  app.use(koaBody())

  app.use(pleasureApi({
    prefix: '/api',
    plugins: [
      {
        extend (router) {
          router.use((ctx, next) => {
            if (!_.get(ctx, '$pleasure.res')) {
              // throw new Error(`Not here.`)
            }
            return next() // important
          })
        }
      }
    ]
  }))

  // nuxt
  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Mark request as handled for Koa
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port)

  await getEntities()
  process.send && process.send('ready')

  return port
}

start(3000)
  .then((port) => {
    console.log(`Listening on ${port}`)
  })
