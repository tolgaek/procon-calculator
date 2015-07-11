/**
 * Generates a random integer within the range of max and min values
 *
 * @param minValue {number}
 * @param maxValue {number}
 * @return {number} Integer within the min and max values
 *
 */
'use strict';

module.exports = function(minValue, maxValue) {
  if(isNaN(minValue) || isNaN(maxValue)) {
    throw new Error('getRandomInteger must be supplied with min/max values');
  }
    
  var random = Math.random() * (maxValue - minValue) + minValue;
  return Math.floor(random);
};
