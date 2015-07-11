'use strict';
var chai = require('chai');
chai.should();
var sinon = require('sinon');

var Producer = require('../../Producer');
var producerManager = require('../../producerManager');

describe('producerManager', function() {
  var ProducerStub;
  beforeEach(function() {
    ProducerStub = sinon.createStubInstance(Producer);
  });
 
  afterEach(function() {
  });
  
  describe('createProducers()', function() {
    it('should return an array of producers', function() {
      var producers = producerManager.createProducers(5, 'http://testurl');
      producers.should.be.a('array').and.have.length(5);
      producers[0].should.be.an.instanceOf(Producer);
    });
  });

  describe('scheduleSend()', function() {
    it('should schedule a given array of producers to produce', function() {
      var clock = sinon.useFakeTimers();
      
      var producerOne = sinon.createStubInstance(Producer);
      var producerTwo = sinon.createStubInstance(Producer);

      producerManager.scheduleSend([producerOne, producerTwo], 1000);
      
      clock.tick(2005);
      producerOne.produceExpression.calledTwice.should.equal(true);
      producerTwo.produceExpression.calledTwice.should.equal(true);

      producerOne.evaluate.calledTwice.should.equal(true);
      producerTwo.evaluate.calledTwice.should.equal(true);
    });
  });
});
