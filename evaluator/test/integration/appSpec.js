'use strict';

var supertest = require('supertest');
var chai = require('chai');
var expect = chai.expect;
chai.should();

var app = require('../../app')();

describe('app', function() {
  describe('GET /calculate', function() {
    it('should calculate an expression', function(done) {
      supertest(app)
        .get('/calculate')
        .query({
          expression: '1+2='
        })
        .expect(200)
        .end(function(err, res) {
          expect(err).to.equal(null);
          res.text.should.equal('3');
          done();
        });
    });

    describe('with invalid expression', function() {
      it('should return 422', function(done) {
        supertest(app)
          .get('/calculate')
          .query({
            expression: 'awef'
          })
          .expect(422, done);
      });
    });
  });
});
