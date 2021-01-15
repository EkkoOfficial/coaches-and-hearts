/* *****************************************************************
* Diese Datei gehört zum webeng-Musterprojekt                      *
* Copyright (c) by Isabell Ripple                                *
* Licensed under GPL3, see http://www.gnu.org/licenses/gpl.html    *
******************************************************************** */


var teammitgliedDAO=require('../daos/teammitgliederDAO.js');

module.exports = {
    
    get: function (req, res, next) {
        console.log("serviceTeammitglieder.js --> get");
        var data=teammitgliedDAO.get(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
        });
    },
    
    getall: function (req, res, next) {
        console.log("serviceTeammitglieder.js --> getall");
        
        teammitgliedDAO.getall(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
        });
    },
    
    create: function (req, res, next) {
        console.log("serviceTeammitglieder.js --> create");
        teammitgliedDAO.create(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
        });
    },
    
    update: function(req, res, next){
        console.log("serviceTeammitglieder.js --> update");
        teammitgliedDAO.update(req,res, function(err, data){
            if(err) return next(err);
            if(data){res.send(data)} else {res.end();}
        });
    },
    
    delete: function(req, res, next){
        console.log("serviceTeammitglieder.js --> delete");
        teammitgliedDAO.delete(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
            res.end();
        });
    },
    
};

