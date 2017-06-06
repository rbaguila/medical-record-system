'use strict'

const user = require(__dirname + '/controller/user');
const patient = require(__dirname + '/controller/patient');
const medicine = require(__dirname + '/controller/medicine');
const procedure = require(__dirname + '/controller/procedure')
const server = require(__dirname + '/controller/server');

module.exports = (router) => {

    //Server
    router.get('/', server.initializeAPI);

    //User
    router.get('/users', user.viewUsers);
    router.get('/user/:user_id', user.viewUser);
    router.post('/users', user.addUser);
    router.put('/user/:user_id', user.editUser);
    router.delete('/user/:user_id', user.deleteUser);

    //Patient
    router.get('/patients', patient.viewPatients);
    router.get('/patients/:patient_id', patient.viewPatient);
    router.post('/patients', patient.addPatient);
    router.put('/patient/:patient_id', patient.editPatient);
    router.delete('/patient/:patient_id', patient.deletePatient);

    //Medicine
    router.get('/medicines', medicine.viewMedicines);
    router.get('/medicines/:medicine_id', medicine.viewMedicine);
    router.post('/medicines', medicine.addMedicine);
    router.put('/medicine/:medicine_id', medicine.editMedicine);
    router.delete('/medicine/:medicine_id', medicine.deleteMedicine);

    //Procedure
    router.get('/procedures', procedure.viewProcedures);
    router.get('/procedures/:procedure_id', procedure.viewProcedure);
    router.post('/procedures', procedure.addProcedure);
    router.put('/procedure/:procedure_id', procedure.editProcedure);
    router.delete('/procedure/:procedure_id', procedure.deleteProcedure);

    return router;
}