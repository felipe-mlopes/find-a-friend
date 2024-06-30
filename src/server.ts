import { app } from './app'

async function start() {
  await app.listen({
    host: '0.0.0.0',
    port: 3333,
  })

  app.swagger()
  console.log('HTTP Server Running!')
}

start().catch((err) => {
  app.log.error(err)
  process.exit(1)
})
