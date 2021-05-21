const http = require('http'); //import function http package
const app = require('./app');

const port = process.env.PORT || 3000; //providing a port on which server will run with env var

const server = http.createServer(app); //server setup

server.listen(port); //run server on port




