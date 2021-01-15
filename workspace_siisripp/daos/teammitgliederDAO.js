/* *****************************************************************
* Diese Datei gehört zum webeng-Musterprojekt                      *
* Copyright (c) by Isabell Ripple                                *
* Licensed under GPL3, see http://www.gnu.org/licenses/gpl.html    *
******************************************************************** */

module.exports = {    
    get: function (req, res, next) {
        console.log("teammitgliederDAO.js --> get");
        req.models.teammitgliederDB.find({id: req.params.id}, function(err, data) {
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
        console.log("teammitgliederDAO.js --> getall");
        req.models.teammitgliederDB.find(function(err, data) {
            if(err) return next(err);
            console.log("\t Alle Zeilen gelesen");
            return next(null, data);
        });
    },
    create: function (req, res, next) {
        console.log("teammitgliederDAO.js --> create");
        var anfrage = req.body;
        console.log("\t Zeile zum anlegen (name= " + anfrage.name + ")");
        req.models.teammitgliederDB.create({
        bild: anfrage.bild,
			  name: anfrage.name,
			  strasse: anfrage.strasse,
			  ort: anfrage.ort,
        geburtsdatum: anfrage.geburtsdatum,
        beruf: anfrage.beruf,
        telefonnummer: anfrage.telefonnummer,
          
        }, function(err, data) {
            if(err) return next(err);
            console.log("\t Zeile angelegt (id= " + data.id + ")");
            return next(null, data);
        });
    },
    update: function(req, res, next){
        console.log("teammitgliederDAO.js --> update");
        var myRequest = req.body;
        console.log(JSON.stringify(req.body));
        console.log("\t update fuer id= " + req.params.id + "!" 
                    +"\t mit name=" + myRequest.name +"!");
        req.models.teammitgliederDB.find({
            id: req.params.id
        }).each(function (teammitglied) {
            //myRequest-Parameter lesbar, weil wir den urlencoded-body-parser eingebunden haben
        teammitglied.bild= myRequest.bild;
			  teammitglied.name= myRequest.name;
			  teammitglied.strasse= myRequest.strasse;
			  teammitglied.ort= myRequest.ort;
        teammitglied.geburtstag= myRequest.geburtstag;
        teammitglied.beruf= myRequest.beruf;
        teammitglied.telefonnummer= myRequest.telefonnummer;
			  
        }).save(function(err,data){
            if(err) return next(err);
            console.log("\t Zeile geändert (id= " + req.params.id + ")");
            return next();
        });
    },
    delete: function(req, res, next){
        console.log("teammitgliederDAO.js --> delete (id=" + req.params.id + ")");
        req.models.teammitgliederDB.find({id: req.params.id}).remove(function(err, data) {
            if(err) return next(err);
            console.log("\t Zeile entfernt (id= " + req.params.id + ")");
            return next(null,data);
        });
    },
    
};



