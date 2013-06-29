var http = require('http');

http.createServer(function (req, res) {
  if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
    return;
  }

  if (req.url === '/login' && req.method === 'GET') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var html = '<form method="post"> <input name="username"> <input type="password" name="password"></form>';
    res.end(html);
    return;
  }

  if (req.url === '/login' && req.method === 'POST') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var html = '<form method="post"> <input name="username"> <input type="password" name="password"></form>';
    res.end(html);
    return;
  }

  res.writeHead(404);
  res.end('not found');
}).listen(3000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:3000/');
