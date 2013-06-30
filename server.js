var http = require('http');
var concat = require('concat-stream');
var domain = require('domain');
var qs = require('querystring');
var loginHTML = 'Login\n<form method="post"><input name="username"> <input type="password" name="password"><input type="submit" value="Login"></form>';
var registerHTML = 'Register\n<form method="post"><input name="username"><input type="password" name="password"><input type="submit" value="Register"></form>';

http.createServer(function (req, res) {
  var reqd = domain.create();

  // catch error that accured in the req and res streams
  // for example - curl -d '' :3000/login
  reqd.add(req);
  reqd.add(res);

  reqd.on('error', function(er) {
    console.error('Error', er, req.url);
    try {
      res.writeHead(500);
      res.end('Error occurred, sorry.');
    } catch (er) {
      console.error('Error sending 500', er, req.url);
    }
  });

  // catch error that accured in this blog
  // for example throw(new Error('foo')); inside any route
  // behind the curtain - wrapping the annonymous function in a try/catch and if we
  // create new streams, it will add the stream into the domain (domain.add)
  reqd.run(function () {
    if (req.url === '/' && req.method === 'GET') {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('welcome\n');
      return;
    }

    if (req.url === '/login' && req.method === 'GET') {
      res.writeHead(200, {'Content-Type': 'text/html'});
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

    if (req.url === '/register' && req.method === 'GET') {
      res.writeHead(200, {'Content-Type': 'text/html'});

      res.end(registerHTML);
      return;
    }

    if (req.url === '/register' && req.method === 'POST') {
      // var cookies = new Cookies( req, res, keys );
      // var unsigned;
      // var signed;
      // var tampered;
      // cookies.set( "unsigned", "foo", { httpOnly: false } )
      res.writeHead( 302, { "Location": "/" } )
      res.end();
      return;
    }

    res.writeHead(404);
    res.end('not found');
  });
}).listen(3000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:3000/');

function parseBody(readableStream, cb) {
  readableStream.pipe(concat(function (body) { 
    cb(qs.parse(body.toString()));
  }));
};
