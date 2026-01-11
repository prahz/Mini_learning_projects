const http = require('http');
const server = http.createServer((req, res) => {
  const myUrl = new URL(req.url, 'http://localhost:3000');
  const pathname = myUrl.pathname;
  const checkIn = myUrl.searchParams.get('check-in');

  if (pathname === '/health' && checkIn === 'yes' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'you are on check-in page' }));

  } else if (pathname === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'you are on health' }));

  } else if (pathname === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'you are on root' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('Error 404 Not Found');
  }

  res.end();
});
server.listen(3000);
