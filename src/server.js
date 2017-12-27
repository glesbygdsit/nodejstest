'use strict';
var http = require('http');
var publish = require('./publish');
var subscribe = require('./subscribe');

var port = process.env.PORT || 1337;
console.log('process.env.PORT =' + process.env.PORT);
console.log('process.env.RABGLITMQ =' + process.env.RABGLITMQ);

subscribe('hello');

http.createServer(function (request, response) {
    console.log('received request!');
    
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();

      publish('hello', body);
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end('Hello World\n');
    });


}).listen(port);
