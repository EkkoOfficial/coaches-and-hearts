var express = require('express');
var router = express.Router();

router.use('/user', require('./user.routes'));

router.get('/', function (req, res) {
    var route, routes = [];
    router.stack.forEach(function (middleware) {
        if (middleware.route) { // routes registered directly on the app
            routes.push(middleware.route);
        } else if (middleware.name === 'router') { // router middleware
            middleware.handle.stack.forEach(function (handler) {
                /*route = Object.create(handler.route);
                delete route.stack;*/
                route && routes.push(route);
            });
        }
    });
    res.json({
        version: '1.0.0',
        routes: routes
    })
});

module.exports = router;
