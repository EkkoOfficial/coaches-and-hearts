/* *****************************************************************
* Diese Datei gehört zum webeng-Musterprojekt                      *
* Copyright (c) by Andrea Kohlhase                                 *
* Licensed under GPL3, see http://www.gnu.org/licenses/gpl.html    *
******************************************************************** */

module.exports = {    
    get: function (req, res, next) {
        console.log("warenDAO.js --> get");
        req.models.wareDB.find({id: req.params.id}, function(err, data) {
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
        console.log("warenDAO.js --> getall");
        req.models.wareDB.find(function(err, data) {
            if(err) return next(err);
            console.log("\t Alle Zeilen gelesen");
            return next(null, data);
        });
    },
    create: function (req, res, next) {
        console.log("warenDAO.js --> create");
        var anfrage = req.body;
        console.log("\t Zeile zum anlegen (bezeichnung= " + anfrage.bezeichnung + ")");
        req.models.wareDB.create({
        bild: anfrage.bild,
			  bezeichnung: anfrage.bezeichnung,
			  artikelnummer: anfrage.artikelnummer,
			  preis: anfrage.preis,
        groesse: anfrage.groesse,
        verfuegbar: anfrage.verfuegbar
          
        }, function(err, data) {
            if(err) return next(err);
            console.log("\t Zeile angelegt (id= " + data.id + ")");
            return next(null, data);
        });
    },
    update: function(req, res, next){
        console.log("warenDAO.js --> update");
        var myRequest = req.body;
        console.log(JSON.stringify(req.body));
        console.log("\t update fuer id= " + req.params.id + "!" +"\t mit bezeichnung=" + myRequest.bezeichnung +"!");
        req.models.wareDB.find({
            id: req.params.id
        }).each(function (ware) {
            //myRequest-Parameter lesbar, weil wir den urlencoded-body-parser eingebunden haben
          ware.bild= myRequest.bild;
			   ware.bezeichnung= myRequest.bezeichnung;
			   ware.artikelnummer= myRequest.artikelnummer;
			   ware.preis= myRequest.preis;
         ware.groesse=myRequest.groesse;
          ware.verfuegbar= myRequest.verfuegbar;
			  
        }).save(function(err,data){
            if(err) return next(err);
            console.log("\t Zeile geändert (id= " + req.params.id + ")");
            return next();
        });
    },
    delete: function(req, res, next){
        console.log("warenDAO.js --> delete (id=" + req.params.id + ")");
        req.models.wareDB.find({id: req.params.id}).remove(function(err, data) {
            if(err) return next(err);
            console.log("\t Zeile entfernt (id= " + req.params.id + ")");
            return next(null,data);
        });
    },
    
};



