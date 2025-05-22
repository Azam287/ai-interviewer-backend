const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const http = require('http')
const HBLogger = require(process.cwd() + '/utility/logger').logger
const errorHandler = require(process.cwd() + '/utility/errorhandler')
const responsehandler = require(process.cwd() + '/utility/responsehandler')
const db = require(process.cwd() + '/configuration/dbconfig');

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

app.use(bodyParser.urlencoded(bodyParser.urlencoded({
  extended: true,
  limit: "50mb",
})))
app.use(bodyParser.json({ limit: "50mb" }))

// require(process.cwd() + '/configuration/routeconfig')(app).then(res=>{
//   // register default middlewares
//   app.use(responsehandler())
//   app.use(errorHandler())
// })


// const server = http.createServer(app)

// server.listen(parseInt(process.env.NORAAI_MGT_PORT), function () {

//   HBLogger.info(
//     `noraai Server Started on port ${process.env.NORAAI_MGT_PORT}`
//   )

// })

async function startServer() {
  try {
    // Connect to MongoDB before anything else
    await db.connectToMongo(); // this calls your connectToMongo internally

    HBLogger.info('✅ MongoDB connected successfully');

    // Now load your routes (assuming it returns a promise)
    await require(process.cwd() + '/configuration/routeconfig')(app);

    // Register default middlewares
    app.use(responsehandler());
    app.use(errorHandler());

    // Create and start the server after DB connection
    const server = http.createServer(app);

    server.listen(parseInt(process.env.NORAAI_MGT_PORT), () => {
      HBLogger.info(`noraai Server Started on port ${process.env.NORAAI_MGT_PORT}`);
    });

  } catch (error) {
    HBLogger.error('❌ Failed to connect to MongoDB. Server not started.');
    HBLogger.error(error);
    process.exit(1);
  }
}

startServer();

module.exports = app
