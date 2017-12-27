'use strict';
var http = require('http');
var publish = require('./publish');
var subscribe = require('./subscribe');

var port = process.env.PORT || 1337;
console.log('process.env.PORT =' + process.env.PORT);
console.log('process.env.RABGLITMQ =' + process.env.RABGLITMQ);

subscribe('hello');

http.createServer(function (req, res) {
    console.log('received request!');
    publish('hello', 'Hello world message!');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);
