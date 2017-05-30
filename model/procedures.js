'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProcedureSchema = new Schema({

    name: String,
    description: String,
    fee: Number,

});

module.exports = mongoose.model('Procedure', ProcedureSchema);