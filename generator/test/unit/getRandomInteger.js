'use strict';
var chai = require('chai');
var expect = chai.expect;
chai.should();
var getRandomInteger = require('../../getRandomInteger');

describe('getRandomInteger()', function() {
  it('should generate a random value in the proper range', function() {
    var maxValue = 100;
    var minValue = -34;

    var generatedInteger = getRandomInteger(minValue, maxValue);
    generatedInteger.should.be.a('number').and
      .be.at.least(minValue).and.at.most(maxValue);
  });

  describe('with invalid arguments', function() {
    it('should throw an error when no values are sent', function() {
      expect(getRandomInteger).to.throw(Error);
    });

    it('should throw an error when non-number values are sent', function() {
      expect(function() {
        getRandomInteger('stri', false);
      }).to.throw(Error);
    });
  });
});
