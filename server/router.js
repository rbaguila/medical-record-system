const controller = require(__dirname + '/controller/user')

module.exports = (router) => {

    //Get functions
    router.get('/', controller.initializeAPI);
    router.get('/users', controller.viewUsers);

    //Post functions
    router.post('/users', controller.addUser);

    //Edit functions
    router.put('/user/:user_id', controller.editUser);

    //Delete functions
    router.delete('/user/:user_id', controller.deleteUser);

    return router;
}