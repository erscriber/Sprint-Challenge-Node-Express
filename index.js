// code away!
const express = require('express');
const server = require('./server.js');
PORT = 9090;

server.listen(PORT, () => {
	console.log(`Our server is listening on port ${PORT}`);
});