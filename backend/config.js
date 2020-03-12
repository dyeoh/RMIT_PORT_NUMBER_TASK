//Need this library to read .env files instead of passing them
//through the command line
const dotenv = require('dotenv')
dotenv.config()

const { PORT } = process.env

if(!PORT){
  console.error("Please specify a port number in your .env")
  process.kill(process.pid, 'SIGTERM')
}

module.exports = {
  PORT
}