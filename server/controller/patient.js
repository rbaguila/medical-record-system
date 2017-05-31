'use-strict'

var Patient = require('../../model/patients');

//Shows all users
exports.viewPatients = (req, res) => {
    Patient.find(function(err, patients){
        if (err)
            res.send(err);
            //responds with a json object of our database users.
        res.json(patients);
    });
};

//Adds a patient
exports.addPatient = (req, res) => {
    console.log("Received request");
    console.log(req.body);

    const patient = new Patient();
  
    //First bracket
    patient.firstName = req.body.firstName;
    patient.middleName = req.body.middleName;
    patient.lastName = req.body.lastName;
    patient.age = req.body.age;
    patient.sex = req.body.sex;
    patient.civilStatus = req.body.civilStatus;
    patient.occupation = req.body.occupation;
    patient.homeAddress = req.body.homeAddress;
    patient.birthDate = req.body.birthDate;
    patient.refferedBy = req.body.refferedBy;
    patient.contactNumber = req.body.contactNumber;

    patient.dateRegistered = req.body.dateRegistered;

    patient.save(function(err) {
        if (err)
        res.send(err);
        res.json({ message: 'Patient successfully added!' });
    });
};

exports.editPatient = (req, res) =>{
    Patient.findById(req.params.patient_id, function(err, patient) {
        if (err){
            res.send(err);
        }else{
            //setting the new username and password to whatever was changed. If 
            //nothing was changed we will not alter the field.
            (req.body.username) ? patient.username = req.body.username : null;
            (req.body.password) ? patient.password = req.body.password : null;
            (req.body.firstName) ? patient.firstName = req.body.firstName : null;
            (req.body.middleName) ? patient.middleName = req.body.middleName : null;
            (req.body.lastName) ? patient.lastName = req.body.lastName : null;

            (req.body.civilStatus) ? patient.civilStatus = req.body.civilStatus : null;
            (req.body.occupation) ? patient.occupation = req.body.occupation : null;
            (req.body.age) ? patient.age = req.body.age : null;
            (req.body.sex) ? patient.sex = req.body.sex : null;
            (req.body.homeAddress) ? patient.homeAddress = req.body.homeAddress : null;

            (req.body.birthDate) ? patient.birthDate = req.body.birthDate : null;
            (req.body.refferedBy) ? patient.refferedBy = req.body.refferedBy : null;
            (req.body.contactNumber) ? patient.contactNumber = req.body.contactNumber : null;
        }
        
        //Saves the Patient
        patient.save(function(err) {
            if (err)
            res.send(err);
            res.json({ message: 'Patient has been updated' });
        });
    });
};

//Deletes a Patient
exports.deletePatient = (req, res) =>{
    Patient.remove({ _id: req.params.patient_id }, function(err, patient) {
        if (err){
            res.send(err);
        }else{
             res.json({ message: 'Patient has been deleted' })
        }
    });
}