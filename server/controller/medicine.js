'use strict'

var Medicine = require('../../model/medicines');

//Show all medicine
exports.viewMedicines = (req, res) => {
    Medicine.find(function(err, medicines){
        if (err)
            res.send(err);
            //responds with a json object of our database users.
        res.json(medicines);
    });
};

exports.viewMedicine = (req, res) => {
    Medicine.findById(req.params.medicine_id, function(err, medicine){
        if(err){
            res.send(err)
        }else{
            res.json(medicine);
        }
    });
};

//Adds a medicine
exports.addMedicine = (req, res) => {
    console.log("Received request");
    console.log(req.body);

    const medicine = new Medicine();
  
    medicine.genericName = req.body.genericName;
    medicine.brandName = req.body.brandName;
    medicine.dosage = req.body.dosage;

    medicine.save(function(err) {
        if (err)
        res.send(err);
        res.json({ message: 'Medicine successfully added!' });
    });
};

exports.editMedicine = (req, res) =>{
    Medicine.findById(req.params.medicine_id, function(err, medicine) {
        if (err){
            res.send(err);
        }else{
            //setting the new username and password to whatever was changed. If 
            //nothing was changed we will not alter the field.
            (req.body.genericName) ? medicine.genericName = req.body.genericName : null;
            (req.body.brandName) ? medicine.brandName = req.body.brandName : null;
            (req.body.dosage) ? medicine.dosage = req.body.dosage : null;
        }
        
        //Saves the Medicine
        medicine.save(function(err) {
            if (err)
            res.send(err);
            res.json({ message: 'Medicine has been updated' });
        });
    });
};

//Deletes a Medicine
exports.deleteMedicine = (req, res) =>{
    Medicine.remove({ _id: req.params.medicine_id }, function(err, medicine) {
        if (err){
            res.send(err);
        }else{
             res.json({ message: 'Medicine has been deleted' })
        }
    });
}