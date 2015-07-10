'use strict';

var async = require('async');
var chai = require('chai');
var expect = chai.expect;
chai.should();

var parse = require('../../parse');

describe('parse', function() {
  describe('with valid input', function() {
    var validExpressions = [
      {
        expression: '1+2=',
        first: 1,
        operator: '+',
        second: 2
      }, {
        expression: '-3/43=',
        first: -3,
        operator: '/',
        second: 43
      }, {
        expression: '123456--12=',
        first: 123456,
        operator: '-',
        second: -12
      }
    ];

    it('should parse expressions', function(done) {

      var testParse = function(data, callback) {
        parse(data.expression, function(err, first, type, second) {
          expect(err).to.equal(null);
          first.should.be.a('number').and.equal(data.first);
          second.should.be.a('number').and.equal(data.second);
          type.should.equal(data.operator);
          return callback();
        });
      };

      async.each(validExpressions, testParse, function(err) {
        expect(err).to.equal(null);
        done();
      });
    });
  });

  describe('with invalid input', function() {
    it('should check for undefined expressions', function(done) {
      parse(undefined, function(err) {
        err.should.be.a('string');
        done();
      });
    });
    
    it('should check for empty strings', function(done) {
      parse('', function(err) {
        err.should.be.a('string');
        done();
      });
    });
    
    it('should check for invalid expressions', function(done) {
      parse('34asdf', function(err) {
        err.should.be.a('string');
        done();
      });
    });
  });
});
