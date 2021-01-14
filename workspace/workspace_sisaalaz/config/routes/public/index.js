var express = require('express');
var path = require("path");
var router = express.Router();


/**
 * css uns javascript dateien über 'express.static' linken
 * @see http://expressjs.com/en/starter/static-files.html
 */
router.use('/assets', express.static(path.join(APP_ROOT_DIR, 'assets')));


/**
 * öffentlich zugängliche html dateien über 'express.static' linken
 * @see http://expressjs.com/en/starter/static-files.html
 */
router.use('/', express.static(path.join(APP_ROOT_DIR, 'views/public')));

module.exports = router;
