'use strict'
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('../model/users');

//create app instance
var app = express();
var router = express.Router();
//set api port to 3001
var port = process.env.API_PORT || 3001;

//db config
mongoose.connect('mongodb://localhost:27017');

//Configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

 res.setHeader('Cache-Control', 'no-cache');
 next();
});

//now we can set the route path & initialize the API
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});

//adding the /users route to our /api router
router.route('/users')
 //retrieve all users from the database
 .get(function(req, res) {
 //looks at our User Schema
 User.find(function(err, users) {
    if (err)
    res.send(err);
    //responds with a json object of our database users.
    res.json(users)
 });
})



 //post new user to the database
 .post(function(req, res) {
    console.log('Received request: ')
    console.log(req.body)
    var user = new User();
    //body parser lets us use the req.body
    user.username = req.body.username;
    user.password = req.body.password;
    user.firstName = req.body.firstName;
    user.middleName = req.body.middleName;
    user.lastName = req.body.lastName;
    
    user.officeAddress = req.body.officeAddress;
    user.homeAddress = req.body.homeAddress;
    user.civilStatus = req.body.civilStatus;
    user.occupation = req.body.occupation;
    user.age = req.body.age;
    user.sex = req.body.sex;
    
    //Second bracket
    user.birthDate = req.body.birthDate;
    user.refferedBy = req.body.refferedBy;
    user.contactNumber = req.body.contactNumber;

    user.dateRegistered = req.body.dateRegistered;


    user.save(function(err) {
        if (err)
        res.send(err);
        res.json({ message: 'User successfully added!' });
    });
 });

 //Adding a route to a specific user based on the database ID
router.route('/user/:user_id')
//The put method gives us the chance to update our user based on 
//the ID passed to the route
 .put(function(req, res) {
    // console.log(req.params)
    User.findById(req.params.user_id, function(err, user) {
        if (err)
        res.send(err);
        //setting the new username and password to whatever was changed. If 
        //nothing was changed we will not alter the field.
        (req.body.username) ? user.username = req.body.username : null;
        (req.body.password) ? user.password = req.body.password : null;
        (req.body.firstName) ? user.firstName = req.body.firstName : null;
        (req.body.middleName) ? user.middleName = req.body.middleName : null;
        (req.body.lastName) ? user.lastName = req.body.lastName : null;

        (req.body.officeAddress) ? user.officeAddress = req.body.officeAddress : null;
        (req.body.homeAddress) ? user.homeAddress = req.body.homeAddress : null;
        (req.body.civilStatus) ? user.civilStatus = req.body.civilStatus : null;
        (req.body.occupation) ? user.occupation = req.body.occupation : null;
        (req.body.age) ? user.age = req.body.age : null;
        (req.body.sex) ? user.sex = req.body.sex : null;

        (req.body.birthDate) ? user.birthDate = req.body.birthDate : null;
        (req.body.refferedBy) ? user.refferedBy = req.body.refferedBy : null;
        (req.body.contactNumber) ? user.contactNumber = req.body.contactNumber : null;


        //save user
        user.save(function(err) {
            if (err)
            res.send(err);
            res.json({ message: 'User has been updated' });
        });
    });
 })



 //delete method for removing a user from our database
 .delete(function(req, res) {
    //selects the user by its ID, then removes it.
    User.remove({ _id: req.params.user_id }, function(err, user) {
        if (err)
        res.send(err);
        res.json({ message: 'User has been deleted' })
    })
 });

//Use our router configuration when we call /api
app.use('/api', router);


//starts the server and listens for requests
app.listen(port, function() {
 console.log(`API running on port ${port}`);
});