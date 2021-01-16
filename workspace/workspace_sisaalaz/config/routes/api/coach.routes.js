var express = require('express');
var router = express.Router();
var coachController = require('../../../controllers/coach.controller');
var auth = require('../../../services/auth.service');

router.get('/', auth.requireLogin(), coachController.getAll);

router.get('/:coachId(\\d+)', auth.requireLogin(), coachController.get);

module.exports = router;
