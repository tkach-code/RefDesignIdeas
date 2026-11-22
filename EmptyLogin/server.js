'use strict';

const path = require('node:path');
const express = require('express');
const routes = require('./routes');

const app = express();
const publicDir = path.join(__dirname, 'public');

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.use(express.static(publicDir, {
  extensions: ['html'],
  index: 'index.html',
}));
app.use((req, res) => {
  res.status(404).type('text/plain').send('Not Found');
});

const port = Number(process.env.PORT) || 8000;
const host = '127.0.0.1';

app.listen(port, host, () => {
  console.log(`Serving at http://${host}:${port}/`);
});
