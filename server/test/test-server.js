var assert = require('assert');
var request = require('supertest');
var express = require('express');

describe('Test server responses', function() {
    var url = 'http://localhost:3001/api/';

    it('Homepage responds with "API initialized!"', function(done) {
        request(url)
            .get('/')
            .expect({ message: 'API Initialized!'})
            .expect(200, done);
    });

});