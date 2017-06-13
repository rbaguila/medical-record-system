'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
var TreatmentsSchema = new Schema({
 
 complaint: String,
 Date: Date,
 procedure: [],
 toothNumber: Number,
 amount: Number,
 balance: Number,
 remarks: String,

});

//export our module to use in server.js
module.exports = mongoose.model('Treatment', TreatmentsSchema);