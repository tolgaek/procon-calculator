/**
 * Parse a given arithmetic expression string
 *
 * @module evaluate
 */
'use strict';

/**
 * Regexp definition of the expression
 * Accepts a string in the format of {integer}{operand}{integer}=
 * Strings like 10*-1
 */
var _expressionRegex = /^(-?[0-9]+)([\+\-\*x\/])(-?[0-9]+)=/;

/**
 * Exposed public function for evaluatingExpression
 * @public
 * @param {string} expression - arithmetic expression to be parsed
 * @param {Function} callback
 */
var evaluate = function evaluate(expression, callback) {
  if(!expression) {
    return callback('Expression undefined or empty');
  }

  var matches = expression.match(_expressionRegex);

  if(!matches || matches.length < 4) {
    return callback('Expression is not valid');
  }

  var firstOperand = parseInt(matches[1], 10);
  var operatorType = matches[2];
  var secondOperand = parseInt(matches[3], 10);

  return callback(null, firstOperand, operatorType, secondOperand);
};

module.exports = evaluate;
