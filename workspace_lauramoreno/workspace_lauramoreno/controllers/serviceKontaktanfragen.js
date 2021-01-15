/* *****************************************************************
* Diese Datei gehört zum webeng-Musterprojekt                      *
* Copyright (c) by Laura Moreno                               *
* Licensed under GPL3, see http://www.gnu.org/licenses/gpl.html    *
******************************************************************** */


var kontaktanfrageDAO=require('../daos/kontaktanfragenDAO.js');

module.exports = {
    
    get: function (req, res, next) {
        console.log("serviceKontaktanfragen.js --> get");
        var data=kontaktanfrageDAO.get(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
        });
    },
    
    getall: function (req, res, next) {
        console.log("serviceKontaktanfragen.js --> getall");
        
        kontaktanfrageDAO.getall(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
        });
    },
    
    create: function (req, res, next) {
        console.log("serviceKontaktanfragen.js --> create");
        kontaktanfrageDAO.create(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
        });
    },
    
    update: function(req, res, next){
        console.log("serviceKontaktanfragen.js --> update");
       kontaktanfrageDAO.update(req,res, function(err, data){
            if(err) return next(err);
            if(data){res.send(data)} else {res.end();}
        });
    },
    
    delete: function(req, res, next){
        console.log("serviceKontaktanfragen.js --> delete");
       kontaktanfrageDAO.delete(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
            res.end();
        });
    },
    
};

