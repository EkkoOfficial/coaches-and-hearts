/* *****************************************************************
* Diese Datei gehört zum webeng-Musterprojekt                      *
* Copyright (c) by Andrea Kohlhase                                 *
* Licensed under GPL3, see http://www.gnu.org/licenses/gpl.html    *
******************************************************************** */

module.exports = {    
    get: function (req, res, next) {
        console.log("buecherDAO.js --> get");
        req.models.buecherDB.find({id: req.params.id}, function(err, data) {
            if(err) return next(err);
            if(data.length==0){
                console.log("Keinen Eintrag gefunden (id= " + req.params.id + ")");
                return next(err);
            } else {
                console.log("\t Zeile gelesen (id= " + req.params.id + ")");
                return next(null,data[0]);
            }
        });
    },
    getall: function (req, res, next) {
        console.log("buecherDAO.js --> getall");
        req.models.buecherDB.find(function(err, data) {
            if(err) return next(err);
            console.log("\t Alle Zeilen gelesen");
            return next(null, data);
        });
    },
    create: function (req, res, next) {
        console.log("buecherDAO.js --> create");
        var anfrage = req.body;
        console.log("\t Zeile zum anlegen (titel= " + anfrage.titel + ")");
        req.models.buecherDB.create({
           titel: anfrage.titel,
			  autor: anfrage.autor,
			  zustand: anfrage.zustand,
			  preis: anfrage.preis,
        }, function(err, data) {
            if(err) return next(err);
            console.log("\t Zeile angelegt (id= " + data.id + ")");
            return next(null, data);
        });
    },
    update: function(req, res, next){
        console.log("buecherDAO.js --> update");
        var myRequest = req.body;
        console.log(JSON.stringify(req.body));
        console.log("\t update fuer id= " + req.params.id + "!" 
                    +"\t mit titel=" + myRequest.titel +"!");
        req.models.buecherDB.find({
            id: req.params.id
        }).each(function (buch) {
            //myRequest-Parameter lesbar, weil wir den urlencoded-body-parser eingebunden haben
            buch.titel= myRequest.titel;
			   buch.autor= myRequest.autor;
			   buch.preis= myRequest.preis;
			   buch.zustand= myRequest.zustand;
			  
        }).save(function(err,data){
            if(err) return next(err);
            console.log("\t Zeile geändert (id= " + req.params.id + ")");
            return next();
        });
    },
    delete: function(req, res, next){
        console.log("buecherDAO.js --> delete (id=" + req.params.id + ")");
        req.models.buecherDB.find({id: req.params.id}).remove(function(err, data) {
            if(err) return next(err);
            console.log("\t Zeile entfernt (id= " + req.params.id + ")");
            return next(null,data);
        });
    },
    
};



