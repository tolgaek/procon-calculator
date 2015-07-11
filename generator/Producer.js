/**
 * Producer that generates a random arithmetic expressions
 * and makes an http request to the given server for its evaluation
 *
 * @module Producer
 */
'use strict';

/**
 * Module Dependencies
 */
var request = require('request');
var getRandomInteger = require('./getRandomInteger');
/**
 * Constructs a Producer instance
 *
 * @constructor
 */
var Producer = module.exports = function Producer(evaluatorUrl, options) {
  if(!(this instanceof Producer)) {
    return new Producer(evaluatorUrl, options);
  }

  if(typeof evaluatorUrl !== 'string' && !(evaluatorUrl instanceof String)) {
    throw new Error ('Producer must be insantiated with a valid url');
  }

  if(!options) {
   options = {};
  }

  this.options = {
    evaluatorUrl: evaluatorUrl,
    minValue: options.minValue || (options.minValue === 0 ? 0 : -1000),
    maxValue: options.maxValue || (options.maxValue === 0 ? 0 : 1000),
    supportedOperators: options.supportedOperators || ['+', '-', '*', '/']
  };
};

/**
 * Sets a new random arithmetic expression
 *
 * @public
 
 * @return {Producer} - For chaining
 */
Producer.prototype.produceExpression = function() {
  this.expression = this._generateExpression();
  return this;
};

/**
 * Sends expression to the generator to have it evaluated
 *
 * @public
 * @param callback {Function}
 *
 * @return {Producer} - For chaining
 */
Producer.prototype.evaluate = function(callback) {
  this._send(callback);
  return this;
};

/**
 * Generate a random arithmetic expression
 *
 * @private
 * @return {string} Randomly generated expression
 */
Producer.prototype._generateExpression = function _generateExpression() {
  var _this = this;

  var getRandomOperator = function () {
    return _this.options.supportedOperators[getRandomInteger(0, 4)];
  };

  var expression = '' +
    getRandomInteger(_this.options.minValue, _this.options.maxValue) +
    getRandomOperator() +
    getRandomInteger(_this.options.minValue, _this.options.maxValue) +
    '=';

  return expression;
};

/**
 * Sends a given expression to the evaluator and returns the evaluation
 *
 * @private
 * @param callback {Function}
 */
Producer.prototype._send = function send(callback) {
  request.get(this.options.evaluatorUrl + '/calculate', {
    qs: {
      expression: this.expression
    }
  }, function(err, response, body) {
    if(err) {
      return callback(err);
    }

    if(response !== 200) {
      return callback(null, body);
    }

    return callback(null, body);
  });
};
