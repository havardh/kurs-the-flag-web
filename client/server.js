const httpProxyMiddleware = require('http-proxy-middleware');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.dev.config.js');

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use('/api', httpProxyMiddleware('http://localhost:3003/**'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, 'localhost', function (err) {
  if (err) {
    console.log(err); // eslint-disable-line no-console
    return;
  }

  console.log('Listening at http://localhost:3000'); // eslint-disable-line no-console
});
