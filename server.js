const express = require('express');
const logger = require('morgan'); 
const helmet = require('helmet');

const server = express();

server.use(express.json(), logger('dev'), helmet());

server.get('/', (req, res) => {
  res.send(`<h2>Sprint Challenge Node Express</h2>`);
});

module.exports = server;