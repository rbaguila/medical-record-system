'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MedicineSchema = new Schema({
    
    genericName: String,
    brandName: String,
    dosage: Number,

});

module.exports = mongoose.model('Medicine', MedicineSchema);