'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
var UsersSchema = new Schema({
 
 //Creds
 username: String,
 password: String,
 
 //First bracket
 firstName: String,
 middleName: String,
 lastName: String,
 
 officeAddress: [],

 ptrNumber: Number,
 licenseNumber: Number,
 contactNumber: Number,

 timeSlots: String,
 civilStatus: String,
 occupation: String,
 age: Number,
 sex: String,
 
 //Second bracket
 birthDate: Date,
 refferedBy: String,
 

 dateRegistered: Date,

 //Kapg doctor
 //ptrnumber, licensenumber

});

//export our module to use in server.js
module.exports = mongoose.model('User', UsersSchema);
