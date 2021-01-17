/*
var express = require('express');
var router = express.Router();
*/


module.exports = function (app, controllers) {
    app.get('/api/auth', controllers.auth.check);
    app.post('/api/login', controllers.auth.login);
}
/*console.log(controllers);*/

/*app.get('/api/auth', controllers.auth)*/

/*
    app.use('/', require('./routes/public'));

    app.use('/api', require('./routes/api'));*/
/*module.exports = router;*/
