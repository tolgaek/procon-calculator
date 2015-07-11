'use strict';
var chai = require('chai');
var sinon = require('sinon');
var request = require('request');
var expect = chai.expect;
var Producer = require('../../Producer');

describe('Producer', function() {
  var evaluatorUrl = 'localhost:3000';
  var validExpressionRegex = /^(-?[0-9]+)([\+\-\*x\/])(-?[0-9]+)=/;

  describe('constructor', function() {
    it('should initialize a Producer without new keyword', function() {
      var producer = Producer(evaluatorUrl); // jshint ignore:line
      producer.should.be.an.instanceOf(Producer);
    });

    it('should throw an error when no url is passed down', function() {
      expect(Producer).to.throw(Error);
    });

    it('should assign default values', function() {
      var producer = new Producer(evaluatorUrl);
      
      producer.options.minValue.should.equal(-1000);
      producer.options.maxValue.should.equal(1000);
      producer.options.supportedOperators.should
        .deep.equal(['+', '-', '*', '/']);
    });
  });

  describe('produceExpression()', function() {
    it('should assign a valid expression', function() {
      var producer = new Producer(evaluatorUrl);
      expect(producer.expression).to.equal(undefined);
      producer.produceExpression();
      producer.expression.should.be.a('string').and.match(validExpressionRegex);
    });
  });

  describe('evaluate()', function() {
    beforeEach(function() {
      this.requestStub = sinon.stub(request, 'get');
      this.producer = new Producer('http://localhost');
      this.producer.expression = 'valid-expression';
    });
   
    afterEach(function() {
      request.get.restore();
    });

    it('should respond with the expression evaluation', function(done) {
      var _this = this;
      this.requestStub.callsArgWith(2, null, { status: 200 }, '3');
      
      this.producer.evaluate(function(err, response) {
        expect(err).to.equal(null);
        response.should.equal('3');
        _this.requestStub.calledOnce.should.equal(true);
        _this.requestStub.calledWith(_this.producer.options.generatorUrl);
        done();
      });
    });

    it('should return error message on non-200 http responses', function(done) {
      var _this = this;
      this.requestStub.callsArgWith(2, null, { status: 422 }, 'Error message');

      this.producer.evaluate(function(err, response) {
        expect(err).to.equal(null);
        response.should.equal('Error message');
        _this.requestStub.calledOnce.should.equal(true);
        done();
      });
    });

    it('should return error when there\'s a request error', function(done) {
      this.requestStub.callsArgWith(2, 'error');
      
      this.producer.evaluate(function(err, response) {
        expect(err).to.equal('error');
        expect(response).to.equal(undefined);
        done();
      });
    });
  });
});
