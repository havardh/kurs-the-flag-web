import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import socket from './socket';
import webpack from 'webpack';

import * as config from '../config';
import playerApi from './api/player';
import roundApi from './api/round';

const app = express();

if (config.BABEL_ENV === 'development') {
  const webpackConfig = require('../webpack.config.js');
  const compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.all('*', (req, res, next) => {
  console.log(`${req.method}:${req.url}`); // eslint-disable-line no-console
  next();
});

app.use(bodyParser.json());
app.use('/api/round', roundApi);
app.use('/api/player', playerApi);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

export default app;
