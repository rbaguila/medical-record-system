'use-strict'


var Patient = require('../../model/patient');

//Shows all users
exports.viewPatients = (req, res) => {
    User.find(function(err, patients){
        if (err)
            res.send(err);
            //responds with a json object of our database users.
        res.json(patients)
    });
};