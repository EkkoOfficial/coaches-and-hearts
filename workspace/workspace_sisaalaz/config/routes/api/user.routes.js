var express = require('express');
var router = express.Router();
var userDAO = require('../../../daos/user.dao');
var auth = require('../../../services/auth.service');

router.get('/', function (req, res, next) {
    userDAO.getAll(req, res, function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

router.get('/:userId(\\d+)', auth.requireLogin(), function (req, res, next) {
    userDAO.getById(req.params.userId)(req, res, function (err, user) {
        if (err) return next(err);
        return res.json(user);
    });
});

router.get('/me', auth.requireLogin(), function (req, res, next) {
    userDAO.getById(req.session.user.id)(req, res, function (err, user) {
        if (err) return next(err);
        return res.json(user);
    });
});

module.exports = router;
