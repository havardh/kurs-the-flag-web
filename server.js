/* eslint-disable no-var, vars-on-top */
require('babel-core/register');

var app = require('./server/app').default;
var config = require('./config');

app.listen(config.PORT, '0.0.0.0', err => {
  if (err) {
    console.log(err); // eslint-disable-line no-console
    return;
  }

  console.log('Listening at http://localhost:3000'); // eslint-disable-line no-console
});
