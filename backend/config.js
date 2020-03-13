//Need this library to read .env files instead of passing them
//through the command line
const dotenv = require('dotenv')
dotenv.config()

const { PORT, MONGO_URL, PORT_RANGE_START, PORT_RANGE_END, OUTLOOK_EMAIL, OUTLOOK_PASS, OUTLOOK_NAME } = process.env

if(!PORT){
  console.error("Please specify a port number in your .env")
  process.kill(process.pid, 'SIGTERM')
}

if(!MONGO_URL){
  console.error("Please specify your mongodb URL in your .env")
  process.kill(process.pid, 'SIGTERM')
}

if(!PORT_RANGE_START || !PORT_RANGE_END){
  console.error("Please specify your port range in your .env")
  process.kill(process.pid, 'SIGTERM')
}

if(!OUTLOOK_EMAIL || !OUTLOOK_PASS || !OUTLOOK_NAME ){
  console.error("Please specify your outlook details in your .env")
  process.kill(process.pid, 'SIGTERM')
}

module.exports = {
  PORT,
  MONGO_URL,
  PORT_RANGE_START,
  PORT_RANGE_END,
  OUTLOOK_EMAIL,
  OUTLOOK_PASS,
  OUTLOOK_NAME
}