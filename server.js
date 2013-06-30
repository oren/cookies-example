var http = require('http');
var concat = require('concat-stream');
var qs = require('querystring');
var loginHTML = '<form method="post"> <input name="username"> <input type="password" name="password"></form>';

http.createServer(function (req, res) {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
    return;
  }

  if (req.url === '/login' && req.method === 'GET') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(loginHTML);
    return;
  }

  if (req.url === '/login' && req.method === 'POST') {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    parseBody(req, function (body) {
      console.dir(body);
    });

    res.end();
    return;
  }

  res.writeHead(404);
  res.end('not found');
}).listen(3000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:3000/');

function parseBody(req, cb) {
  req.pipe(concat(function (body) { 
    cb(qs.parse(body.toString())); 
  }));
};
