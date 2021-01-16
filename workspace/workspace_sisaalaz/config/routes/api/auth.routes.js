var express = require('express');
var router = express.Router();
var userDAO = require('../../../daos/user.dao');
router.post('/login', function (req, res) {

    var responseData = {
        authenticated: false,
        user: null
    };

    userDAO.getByNameAndPassword(req, res, function (err, user) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        responseData.authenticated = true;
        responseData.user = user;
        req.session.user = JSON.parse(JSON.stringify(user));
        res.json(responseData);
    }, req.body);
});

module.exports = router;
