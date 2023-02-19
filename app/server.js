const hapi = require('@hapi/hapi')
const { serverConfig } = require('./config')

const createServer = async () => {
  // Create the hapi server
  const server = hapi.server({
    port: serverConfig.port,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    },
    router: {
      stripTrailingSlash: true
    }
  })

  // Register the plugins
  await server.register(require('./plugins/errors'))
  await server.register(require('./plugins/router'))
  await server.register(require('./plugins/logging'))
  if (serverConfig.isDev) {
    await server.register(require('blipp'))
  }

  return server
}

module.exports = {
  createServer
}
