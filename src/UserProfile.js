const UserProfile = (function(){

    var currentUser = {
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
    };

    var getUser = function(){
        return currentUser;
    };

    var setUser = function(user){
        for(var prop in user){
            if(user.hasOwnProperty(prop)){
                currentUser[prop] = user[prop];
            }
        }
    };

    return{
        getUser: getUser,
        setUser: setUser,
    }

})();

export default UserProfile;