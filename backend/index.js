const express = require("express")
const app = express()

const config = require("./config.js")

const port = config.PORT

const server = app.listen(port, ()=> console.log(`Listening on port ${port}`))

//sigterm POSIX signal telling it to terminate gracefully
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated')
  })
})