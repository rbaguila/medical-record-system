'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PatientSchema = new Schema({
    
    firstName: String,
    middleName: String,
    lastName: String,
    age: Number,
    sex: String,
    civilStatus: String,
    occupation: String,

    homeAddress: String,
    birthdate: Date,
    RefferedBy: String,
    
    contactNumber: Number,
    dateRegistered: Date,
    
});

module.exports = mongoose.model('Patient', PatientSchema);