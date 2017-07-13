const UserProfile = (function(){

    var isLoggedin = false;

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

    var isAuth = function(){
        if(isLoggedin === false){
            return false;
        }else{
            true;
        }
    }

    var removeUser = function(){
        isLoggedin = false;
    }

    var getUser = function(){
        return currentUser;
    };

    var setUser = function(user){
        for(var prop in user){
            if(user.hasOwnProperty(prop)){
                currentUser[prop] = user[prop];
            }
        }

        isLoggedin = true;
    };

    return{
        getUser: getUser,
        setUser: setUser,
        removeUser: removeUser,
        isAuth: isAuth,
    }

})();

export default UserProfile;