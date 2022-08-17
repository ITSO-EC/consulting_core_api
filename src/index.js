const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const https = require('https');
const fs = require('fs');

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');

  console.log("mode", process.env.NODE_ENV)
  console.log("config.domain", config.domain)

  if (config.env === 'production') {
    const cert = fs.readFileSync('./path/to/the/cert.crt');
    const ca = fs.readFileSync('./path/to/the/ca.crt');
    const key = fs.readFileSync('./path/to/the/private.key');

    let options = {
      cert: cert, // fs.readFileSync('./ssl/example.crt');
      ca: ca, // fs.readFileSync('./ssl/example.ca-bundle');
      key: key // fs.readFileSync('./ssl/example.key');
    };
    const httpsServer = https.createServer(options, app);
    httpsServer.listen(config.port, config.domain);
  } else {
    server = app.listen(config.port, () => {
      logger.info(`Server started on port ${config.port}`);
    }).on('error', unexpectedErrorHandler);
  }
  // server = app.listen(config.port, () => {
  //   logger.info(`Listening to port ${config.port}`);
  // });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
