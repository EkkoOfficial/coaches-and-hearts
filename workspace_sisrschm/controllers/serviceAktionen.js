/* *****************************************************************
* Diese Datei gehört zum kurs imuk3 webeng                         *
* Copyright (c) by Sarah Schmirander                               *
* Licensed under GPL3, see http://www.gnu.org/licenses/gpl.html    *
******************************************************************** */


var aktionenDAO=require('../daos/aktionenDAO.js');

module.exports = {
    
    get: function (req, res, next) {
        console.log("serviceAktionen.js --> get");
        var data=aktionenDAO.get(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
        });
    },
    
    getall: function (req, res, next) {
        console.log("serviceAktionen.js --> getall");
        
        aktionenDAO.getall(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
        });
    },
    
    create: function (req, res, next) {
        console.log("serviceAktionen.js --> create");
        aktionenDAO.create(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
        });
    },
    
    update: function(req, res, next){
        console.log("serviceAktionen.js --> update");
        aktionenDAO.update(req,res, function(err, data){
            if(err) return next(err);
            if(data){res.send(data)} else {res.end();}
        });
    },
    
    delete: function(req, res, next){
        console.log("serviceAktionen.js --> delete");
        aktionenDAO.delete(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
            res.end();
        });
    },
    
};

