var chai = require('chai');
var assert = require('assert');
var request = require('supertest');
var express = require('express');

chai.should();

//For users
var User = require('../../model/users');

var sampleInput = {
    username: String, 
    password: String, 
    firstName: String, 
    middleName: String, 
    lastname: String,
    age: Number
}

var trinketAge = 21;

describe('User API responses', function() {
    var url = 'http://localhost:3001';
   
    //Credentials checker
    //Username
    it('Username should be a String', function(done){
        sampleInput.username.should.be.equal(String);
        done();
    })

    //Password
    it('Password should be a String', function(done){
        sampleInput.password.should.be.equal(String);
        done();
    })

    //firstName
    it('First name should be a String', function(done){
        sampleInput.firstName.should.be.equal(String);
        done();
    })

    //middleName
    it('Middle name should be a String', function(done){
        sampleInput.middleName.should.be.equal(String);
        done();
    })

    it('Last name should be a String', function(done){
        sampleInput.lastname.should.be.equal(String);
        done();
    })

    //Age
     it('Age should not be negative', function(done){
        trinketAge.should.not.be.lessThan(0);
        done();
    })

    it('Age should not be a String', function(done){
        sampleInput.age.should.be.equal(Number);
        done();
    })

    it('/api/users should return list of json object of users', function(done){
        request(url)
            .get('/api/users')
            .expect('Content-type', 'application/json; charset=utf-8', done)
    });


    //Post
    it('/api/users should accept complete variables', function(done) {
        request(url)
            .post('/api/users')
            .send(sampleInput)
            .expect({message: 'User successfully added!'}, done);
    });


    it('Generated ID should be equal to stored ID', function (done) {
        request(url)
            .post('/api/users')
            .send({
                username: sampleInput.username,
                password: sampleInput.password
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
            .delete('/api/users/' +sampleInput.id)
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
            .put('/api/users/' +sampleInput.id)
            .expect(404)
            .end(function(err){
                if(err){
                    return done(err);
                }

                done();
            });
    })



});