const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const files = {
  '/': ['index.html', 'text/html; charset=utf-8'],
  '/index.html': ['index.html', 'text/html; charset=utf-8'],
  '/styles.css': ['styles.css', 'text/css; charset=utf-8'],
  '/script.js': ['script.js', 'text/javascript; charset=utf-8'],
};

const server = http.createServer((request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end();
    return;
  }

  const { pathname } = new URL(request.url, 'http://localhost');
  const file = files[pathname];

  if (!file) {
    response.writeHead(404);
    response.end('Not Found');
    return;
  }

  fs.readFile(path.join(__dirname, file[0]), (error, content) => {
    if (error) {
      response.writeHead(500);
      response.end('Server Error');
      return;
    }

    response.writeHead(200, { 'Content-Type': file[1] });
    response.end(request.method === 'HEAD' ? undefined : content);
  });
});

const port = Number(process.env.PORT) || 8000;
server.listen(port, '127.0.0.1', () => {
  console.log(`Serving at http://127.0.0.1:${port}/`);
});