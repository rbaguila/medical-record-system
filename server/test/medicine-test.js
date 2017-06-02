var chai = require('chai');
var assert = require('assert');
var request = require('supertest');
var express = require('express');

chai.should();

var sampleInput = {
    brandName: String,
    genericName: String,
    dosage: Number
}

describe('Medicine API responses', function(){

    var url = 'http://localhost:3001';

    //Elements
    it('brandName should be a String', function(done){
        sampleInput.brandName.should.be.equal(String);
        done();
    })

    it('genericName should be a String', function(done){
        sampleInput.genericName.should.be.equal(String);
        done();
    })

    it('dosage should be a Number', function(done){
        sampleInput.dosage.should.be.equal(Number);
        done();
    })

    it('/api/medicines should return list of json object of medicines', function(done){
        request(url)
            .get('/api/users')
            .expect('Content-type', 'application/json; charset=utf-8', done)
    });


    //Post
    it('/api/medicines should accept complete variables', function(done) {
        request(url)
            .post('/api/medicines')
            .send(sampleInput)
            .expect({message: 'Medicine successfully added!'}, done);
    });


    it('Generated ID should be equal to stored ID', function (done) {
        request(url)
            .post('/api/medicines')
            .send({
                genericName: sampleInput.genericName,
                brandName: sampleInput.brandName
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
            .delete('/api/medicines/' +sampleInput.id)
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
            .put('/api/medicines/' +sampleInput.id)
            .expect(404)
            .end(function(err){
                if(err){
                    return done(err);
                }

                done();
            });
    })
});