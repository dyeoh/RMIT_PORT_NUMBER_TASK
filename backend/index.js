const express = require("express")
const app = express()
const mongoose = require("mongoose")
const routes = require("./routes/router")
const config = require("./config")

//MongoDB connection
mongoose.connect(config.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

//Middleware function in express, using this it will only look at an parse incoming json requests
app.use(express.json());

//CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
 });

app.use('/', routes);
const server = app.listen(config.PORT, ()=> console.log(`Listening on port ${config.PORT}`))

//sigterm POSIX signal telling it to terminate gracefully
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated')
  })
})