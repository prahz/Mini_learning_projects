const http = require('http');

const server = http.createServer((req, res) => {
  const myUrl = new URL(req.url, 'http://localhost:3000');
  const pathname = myUrl.pathname;
  const checkIn = myUrl.searchParams.get('check-in');

  if(pathname === '/health' && checkIn === 'yes' && req.method === 'POST') {
    let s = '';
    req.on('data', (data) => {
      s += data;
    });
    req.on('end', () => {
      let final_json = JSON.parse(s);
      final_json.additionalcheckup = "done";
      res.writeHead(200, {'Content-Type' : 'application/json'});
      res.write(JSON.stringify(final_json));
      res.end();
    });
  } else if (pathname === '/health' && checkIn === 'yes' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'you are on check-in page' }));
    res.end();
  } else if (pathname === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'you are on health' }));
    res.end();
  } else if (pathname === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'you are on root' }));
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('Error 404 Not Found');
    res.end();
  }
});
server.listen(3000);
