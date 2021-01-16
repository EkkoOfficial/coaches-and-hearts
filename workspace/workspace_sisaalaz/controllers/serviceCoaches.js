var coachDAO = require('../daos/coach.dao');

module.exports = {
    
    get: function (req, res, next) {
        console.log("serviceCoaches.js --> get");
        var data= buchDAO.get(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
        });
    },
    
    getall: function (req, res, next) {
        console.log("serviceCoaches.js --> getall");
        
        buchDAO.getall(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
        });
    },
    
    create: function (req, res, next) {
        console.log("serviceCoaches.js --> create");
        buchDAO.create(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
        });
    },
    
    update: function(req, res, next){
        console.log("serviceCoaches.js --> update");
        buchDAO.update(req,res, function(err, data){
            if(err) return next(err);
            if(data){res.send(data)} else {res.end();}
        });
    },
    
    delete: function(req, res, next){
        console.log("serviceCoaches.js --> delete");
        buchDAO.delete(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
            res.end();
        });
    }
    
};

