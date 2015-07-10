/**
 * Bootstraps and starts the http server
 */
  
'use strict';

/**
 * Module dependencies
 * @private
 */
var connect = require('connect');
var http = require('http');
var morgan = require('morgan');
var qs = require('qs');

var parse = require('./parse');
var calculate = require('./calculate');

/**
 * Configure connect app and start http server
 */

module.exports = function() {
  var app = connect();

  // Log all incoming requests to the console
  app.use(morgan('common'));

  app.use('/calculate', function(req, res) {
    if(req.method === 'GET') {
      var params = qs.parse(req.url.substring(2));
      parse(params.expression, function(err, firstNum, operator, secondNum) {
        if(err) {
          res.statusCode = 422;
          return res.end(err);
        }

        var result = calculate(firstNum, operator, secondNum);
        res.end(result + '');
      });
      
    }
  });
  // Create server and listen on port 3000
  http.createServer(app).listen(3000);

  return app;
};
