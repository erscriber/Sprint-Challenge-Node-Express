const express = require('express');
const logger = require('morgan'); 
const helmet = require('helmet');

const projectRouter = require('./data/ProjectRouter.js');
const actionRouter = require('./data/ActionRouter.js');

const server = express();

server.use(express.json(), logger('dev'), helmet());
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Sprint Challenge Node Express</h2>`);
});

module.exports = server;