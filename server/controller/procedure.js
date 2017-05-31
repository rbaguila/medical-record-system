'use strict'

var Procedure = require('../../model/procedures');

//Show all procedures
exports.viewProcedures = (req, res) => {
    Procedure.find(function(err, procedures){
        if (err)
            res.send(err);
            //responds with a json object of our database procedures.
        res.json(procedures);
    });
};

//Adds a medicine
exports.addProcedure = (req, res) => {
    console.log("Received request");
    console.log(req.body);

    const procedure = new Procedure();
  
    procedure.name = req.body.name;
    procedure.description = req.body.description;
    procedure.fee = req.body.fee;

    procedure.save(function(err) {
        if (err)
        res.send(err);
        res.json({ message: 'Procedure successfully added!' });
    });
};

exports.editProcedure = (req, res) =>{
    Procedure.findById(req.params.procedure_id, function(err, procedure) {
        if (err){
            res.send(err);
        }else{
            //setting the new username and password to whatever was changed. If 
            //nothing was changed we will not alter the field.
            (req.body.name) ? procedure.name = req.body.name : null;
            (req.body.description) ? procedure.description = req.body.description : null;
            (req.body.fee) ? procedure.fee = req.body.fee : null;
        }
        
        //Saves the Patient
        procedure.save(function(err) {
            if (err)
            res.send(err);
            res.json({ message: 'Procedure has been updated' });
        });
    });
};

//Deletes a Patient
exports.deleteProcedure = (req, res) =>{
    Procedure.remove({ _id: req.params.procedure_id }, function(err, procedure) {
        if (err){
            res.send(err);
        }else{
             res.json({ message: 'Procedure has been deleted' })
        }
    });
}