var chai = require('chai');
var assert = require('assert');
var request = require('supertest');
var express = require('express');

describe('Server test responses', function(){

    var url = 'http://localhost:3001';

    //Get
    it('Homepage responds with "API initialized!"', function(done) {
        request(url)
            .get('/api')
            .expect({ message: 'API Initialized!'})
            .expect(200, done);
    });
})