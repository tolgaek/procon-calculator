'use strict';
var chai = require('chai');
chai.should();

var calculate = require('../../calculate');

describe('calculate', function() {
  it('should evaluate simple arithmetic expression', function() {
    calculate(1, '+', 2).should.equal(3);
    calculate(5, '/', 2).should.equal(2.5);
    calculate(3, '*', 4).should.equal(12);
    calculate(4, '-', 1).should.equal(3);
    calculate(1, '/', 0).should.equal(0);
  });
});
