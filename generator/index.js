/**
 * Entry point for generator
 */
'use strict';

/**
 * Config values for producer behaviour
 */
var MAX_VALUE = process.env.MAX_VALUE || 1000;
var MIN_VALUE = process.env.MIN_VALUE || -1000;
var EVALUATOR_URL = process.env.GENERATOR_URL || 'http://localhost:3000';
var NUMBER_OF_PRODUCERS = process.env.NUMBER_OF_PRODUCERS || 2;
var INTERVAL_MILLISECONDS = process.env.INTERVAL_MILLISECONDS || 1000;

var producerManager = require('./producerManager');

var producers = producerManager.createProducers(
  NUMBER_OF_PRODUCERS,
  EVALUATOR_URL,
  {
    minValue: MIN_VALUE,
    maxValue: MAX_VALUE
  });

producerManager.scheduleSend(producers, INTERVAL_MILLISECONDS);
