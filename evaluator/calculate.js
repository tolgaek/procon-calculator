/**
 * Factory for simple arithmetic operation functions
 */
'use strict';

/**
 * Given two integers, it returns their sum
 *
 * @param firstOperand {number}
 * @param secondOperand {number}
 *
 * @return {number} the total of the first and secondOperand
 */
var add = function(firstOperator, secondOperator) {
  return firstOperator + secondOperator;
};

/**
 * Given two integers, it returns their difference
 *
 * @param firstOperand {number}
 * @param secondOperand {number}
 *
 * @return {number} the difference between the first and secondOperand
 */
var subtract = function(firstOperator, secondOperator) {
  return firstOperator - secondOperator;
};

/**
 * Given two integers, it returns the division result
 *
 * @param firstOperand {number}
 * @param secondOperand {number}
 *
 * @return {float}
 */
var divide = function(firstOperator, secondOperator) {
  return firstOperator / secondOperator;
};

/**
 * Given two integers, it returns their multiplication
 *
 * @param firstOperand {number}
 * @param secondOperand {number}
 *
 * @return {number}
 */
var multiply = function(firstOperator, secondOperator) {
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
      operator = add;
      break;
    case '-':
      operator = subtract;
      break;
    case '*':
    case 'x':
      operator = multiply;
      break;
    case '/':
      operator = divide;
      break;
  }

  if(!operator) {
    return null;
  }
  return operator(firstOperand, secondOperand);
};

module.exports = calculate;
