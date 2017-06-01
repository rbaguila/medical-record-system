var chai = require('chai');
var assert = require('assert');
var request = require('supertest');
var express = require('express');

chai.should();

const sampleInput = {
    firstName: String,
    middleName: String,
    lastName: String,
    age: Number,
    sex: String,
    civilStatus: String,
    occupation: String,

    homeAddress: String,
    birthDate: Date,
    referredBy: String,

    contactNumber: Number,
    dateRegistered: Date
    
}

var trinketAge = 21;

describe('Patient API responses', function(){

    var url = 'http://localhost:3001';

    //Credentials
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

    //lastName
    it('Last name should be a String', function(done){
        sampleInput.lastName.should.be.equal(String);
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

     //contactNumber
    it('contactNumber should be a number', function(done){
        sampleInput.contactNumber.should.be.equal(Number);
        done();
    })

     //civilStatus
    it('civilStatus should be a String', function(done){
        sampleInput.civilStatus.should.be.equal(String);
        done();
    })

    //occupation
    it('occupation should be a String', function(done){
        sampleInput.occupation.should.be.equal(String);
        done();
    })

    //homeAddress
    it('homeAddress should be a String', function(done){
        sampleInput.homeAddress.should.be.equal(String);
        done();
    })

    //sex
    it('sex should be a String', function(done){
        sampleInput.sex.should.be.equal(String);
        done();
    })

    //birthDate
    it('birthDate should be of class Date', function(done){
        sampleInput.birthDate.should.be.equal(Date);
        done();
    })

    //referredBy
    it('referredBy should be a String', function(done){
        sampleInput.referredBy.should.be.equal(String);
        done();
    })

    //dateRegistered
    it('dateRegistered should be of class Date', function(done){
        sampleInput.dateRegistered.should.be.equal(Date);
        done();
    })


     it('/api/patients should return list of json object of patients', function(done){
        request(url)
            .get('/api/patients')
            .expect('Content-type', 'application/json; charset=utf-8', done)
    });


    //Post
    it('/api/patients should accept complete variables', function(done) {
        request(url)
            .post('/api/patients')
            .send(sampleInput)
            .expect({message: 'Patient successfully added!'}, done);
    });


    it('Generated ID should be equal to stored ID', function (done) {
        request(url)
            .post('/api/patients')
            .send({
                firstName: sampleInput.firstName,
                lastName: sampleInput.lastName
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
            .delete('/api/patients/' +sampleInput.id)
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
            .put('/api/patients/' +sampleInput.id)
            .expect(404)
            .end(function(err){
                if(err){
                    return done(err);
                }

                done();
            });
    })
 
})