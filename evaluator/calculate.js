/**
 * Factory for simple arithmetic operation functions
 */
'use strict';

/**
 * Given two integers, it returns their sum
 *
 * @private
 * @param firstOperand {number}
 * @param secondOperand {number}
 *
 * @return {number} the total of the first and secondOperand
 */
var _add = function(firstOperator, secondOperator) {
  return firstOperator + secondOperator;
};

/**
 * Given two integers, it returns their difference
 *
 * @private
 * @param firstOperand {number}
 * @param secondOperand {number}
 *
 * @return {number} the difference between the first and secondOperand
 */
var _subtract = function(firstOperator, secondOperator) {
  return firstOperator - secondOperator;
};

/**
 * Given two integers, it returns the division result
 *
 * @param firstOperand {number}
 * @param secondOperand {number}
 *
 * @private
 * @return {float}
 */
var _divide = function(firstOperator, secondOperator) {
  return firstOperator / secondOperator;
};

/**
 * Given two integers, it returns their multiplication
 *
 * @private
 * @param firstOperand {number}
 * @param secondOperand {number}
 *
 * @return {number}
 */
var _multiply = function(firstOperator, secondOperator) {
  return firstOperator * secondOperator;
};


/**
 * Evaluates a given simple arithmetic expression
 *
 * @param firstOperand {number}
 * @param operatorType {string}
 * @param seconkljdOperand {number}
 *
 * @return {Function}
 */
var calculate = function(firstOperand, operatorType, secondOperand) {
  var operator;

  switch(operatorType) {
    case '+':
      operator = _add;
      break;
    case '-':
      operator = _subtract;
      break;
    case '*':
    case 'x':
      operator = _multiply;
      break;
    case '/':
      operator = _divide;
      break;
  }

  if(!operator) {
    return null;
  }
  return operator(firstOperand, secondOperand);
};

module.exports = calculate;
