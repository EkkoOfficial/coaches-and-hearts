/*
var express = require('express');
var router = express.Router();
*/



module.exports = function(app, controllers) {
    app.use('/api', require('./routes/api'));
}
/*module.exports = router;*/
