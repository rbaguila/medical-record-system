var chai = require('chai');
var assert = require('assert');
var request = require('supertest');
var express = require('express');

chai.should();

var sampleInput = {
    name: String,
    description: String,
    fee: Number
}

describe('Procedure API responses', function(){

    var url = 'http://localhost:3001'

    //Elements
    it('name should be a String', function(done){
        sampleInput.name.should.be.equal(String);
        done();
    })

    it('description should be a String', function(done){
        sampleInput.description.should.be.equal(String);
        done();
    })

    it('fee should be a String', function(done){
        sampleInput.fee.should.be.equal(Number);
        done();
    })

    //Get
     it('/api/procedures should return list of json object of procedures', function(done){
        request(url)
            .get('/api/procedures')
            .expect('Content-type', 'application/json; charset=utf-8', done)
    });


    //Post
    it('/api/procedures should accept complete variables', function(done) {
        request(url)
            .post('/api/procedures')
            .send(sampleInput)
            .expect({message: 'Procedure successfully added!'}, done);
    });


    it('Generated ID should be equal to stored ID', function (done) {
        request(url)
            .post('/api/procedures')
            .send({
                name: sampleInput.name,
                description: sampleInput.description
            })
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                
            sampleInput.id = res.body._id;
            done();
            });
    });


    //Delete
    it('Deleting an invalid ID wont do anything', function(done){
        request(url)
            .delete('/api/procedures/' +sampleInput.id)
            .expect(404)
            .end(function(err){
                if(err){
                    return done(err);
                }

                done();
            });
    })

    //Edit
    it('Editing an invalid ID wont do anything', function(done){
        request(url)
            .put('/api/procedures/' +sampleInput.id)
            .expect(404)
            .end(function(err){
                if(err){
                    return done(err);
                }

                done();
            });
    })
});