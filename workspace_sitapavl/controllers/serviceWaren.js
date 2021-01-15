/* *****************************************************************
* Diese Datei gehört zum webeng-Musterprojekt                      *
* Copyright (c) by Tamara Pavlovic                              *
* Licensed under GPL3, see http://www.gnu.org/licenses/gpl.html    *
******************************************************************** */


var wareDAO=require('../daos/warenDAO.js');

module.exports = {
    
    get: function (req, res, next) {
        console.log("serviceWaren.js --> get");
        var data=wareDAO.get(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
        });
    },
    
    getall: function (req, res, next) {
        console.log("serviceWaren.js --> getall");
        
        wareDAO.getall(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
        });
    },
    
    create: function (req, res, next) {
        console.log("serviceWaren.js --> create");
        wareDAO.create(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
        });
    },
    
    update: function(req, res, next){
        console.log("serviceWaren.js --> update");
        wareDAO.update(req,res, function(err, data){
            if(err) return next(err);
            if(data){res.send(data)} else {res.end();}
        });
    },
    
    delete: function(req, res, next){
        console.log("serviceWare.js --> delete");
        wareDAO.delete(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
            res.end();
        });
    },
    
};

