const express = require('express')
const consola = require('consola')
const http = require('http')
const { Nuxt, Builder } = require('nuxt')
// const { loadNuxt } = require('nuxt-start')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
const isLocalhost = process.env.isLocalhost
config.dev = isLocalhost

async function start() {
  // Init Nuxt.js
  //const nuxt = await loadNuxt(config.dev ? 'dev' : 'start')
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // if (!config.dev) {
  //   app.use(cookieParser())
  //   app.use(
  //     csrf({
  //       cookie: true,
  //     })
  //   )
  // }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Listen the server
  const server_http = http.createServer(app)

  server_http.listen(port, host, () => {
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true,
    })
  })
}
start()
