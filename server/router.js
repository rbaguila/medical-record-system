const user = require(__dirname + '/controller/user')

module.exports = (router) => {

    //Get functions
    router.get('/', user.initializeAPI);
    router.get('/users', user.viewUsers);

    //Post functions
    router.post('/users', user.addUser);

    //Edit functions
    router.put('/user/:user_id', user.editUser);

    //Delete functions
    router.delete('/user/:user_id', user.deleteUser);

    return router;
}