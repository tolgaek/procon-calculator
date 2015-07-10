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
var evaluator = require('./evaluator');

/**
 * Configure connect app and start http server
 */
(function() {

  var app = connect();

  // Log all incoming requests to the console
  app.use(connect.logger());

  // Middleware for creating req.query from url params
  app.use(connect.query());

  app.use('/calculate', function(req, res, next) {
    if(req.method === 'GET') {
      
    }
  });
  // Create server and listen on port 3000
  http.createServer(app).listen(3000);
})();
