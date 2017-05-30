var assert = require('assert');
var supertest = require('supertest');
var express = require('express');

describe('Test server responses', function() {
    var url = 'http://localhost:3001/api/';

    it('Homepage responds with "API initialized!"', function(done) {
        request(url)
            .get('/')
            .expect('API Initialized!')
            .expect(200, done);
    });

});