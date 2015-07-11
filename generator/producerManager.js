/**
 * Generates a given number of Producers and
 * schedules them for a given integer
 * and triggers them
 */
'use strict';

/** 
 * Module Depenedencies
 */
var Producer = require('./Producer');

/**
 * Triggers a producers to generate and evaluate an expression
 *
 * @private
 */
var _triggerProducer = function(producer, callback) {
  producer.produceExpression();
  producer.evaluate(callback);
};

/**
 * Initializes and schedules Producers to run at specific intervals
 *
 * @public
 * @param numOfProducers {number}
 * @param evaluatorUrl {string}
 * @param producerOptions {Object} - Options to pass to each producer
 */

var createProducers = function(numOfProducers, evaluatorUrl, producerOptions) {
  var producers = [];
  for(var i = 0; i < numOfProducers; i++) {
    var producer = new Producer(evaluatorUrl, producerOptions);
    producers.push(producer);
  }

  return producers;
};

/**
 * Schedules given array of producers to run
 *
 * @public
 * @param producers {array}
 * @param interval {number} - Interval in milliseconds
 */
var scheduleSend = function(producers, interval) {
  if(!interval || isNaN(interval)) {
    throw new Error('Invalid interval');
  }
  setInterval(function() {
    producers.forEach(function(producer, index) {
      _triggerProducer(producer, function(err, response) {
        var logMessage = '[PRODUCER ' + index + '] ';
        logMessage += 'generated expression : ' + producer.expression;

        if(err) {
          throw new Error(logMessage + ' Threw unexpected error:' + err);
        }

        console.log(logMessage + ' Evaluator responded with : ' + response);
      });
    });
  }, interval);
};

module.exports = {
  createProducers: createProducers,
  scheduleSend: scheduleSend
};
