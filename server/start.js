const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();

app.use(express.static('./public'));
app.use('/elastic', proxy({
  target: 'http://127.0.0.1:9200',
  changeOrigin: true,
  pathRewrite: {
    '^/elastic': '/', // rewrite path
  },
}));

app.listen(8080);