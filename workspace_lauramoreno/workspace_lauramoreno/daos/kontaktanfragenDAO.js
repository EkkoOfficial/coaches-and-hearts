/* *****************************************************************
* Diese Datei gehört zum webeng-Musterprojekt                      *
* Copyright (c) by Laura Moreno                               *
* Licensed under GPL3, see http://www.gnu.org/licenses/gpl.html    *
******************************************************************** */

module.exports = {    
    get: function (req, res, next) {
        console.log("kontaktanfragenDAO.js --> get");
        req.models.kontaktanfragenDB.find({id: req.params.id}, function(err, data) {
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
        console.log("kontaktanfragenDAO.js --> getall");
        req.models.kontaktanfragenDB.find(function(err, data) {
            if(err) return next(err);
            console.log("\t Alle Zeilen gelesen");
            return next(null, data);
        });
    },
    create: function (req, res, next) {
        console.log("kontaktanfragenDAO.js --> create");
        var anfrage = req.body;
        console.log("\t Zeile zum anlegen (name= " + anfrage. name+ ")");
        req.models.kontaktanfragenDB.create({
           anrede: anfrage.anrede,
			  name: anfrage.name,
			  email: anfrage.email,
			  betreff: anfrage.betreff,
         nachricht: anfrage.nachricht,
          telefonnummer:anfrage.telefonnummer,
        }, function(err, data) {
            if(err) return next(err);
            console.log("\t Zeile angelegt (id= " + data.id + ")");
            return next(null, data);
        });
    },
    update: function(req, res, next){
        console.log("kontaktanfragenDAO.js --> update");
        var myRequest = req.body;
        console.log(JSON.stringify(req.body));
        console.log("\t update fuer id= " + req.params.id + "!" + "\t mit name=" + myRequest.name +"!");
        req.models.kontaktanfragenDB.find({
            id: req.params.id
        }).each(function (kontaktanfrage) {
            //myRequest-Parameter lesbar, weil wir den urlencoded-body-parser eingebunden haben
            kontaktanfrage.anrede= myRequest.anrede;
			   kontaktanfrage.name= myRequest.name;
			   kontaktanfrage.email= myRequest.email;
			  kontaktanfrage.betreff= myRequest.betreff;
         kontaktanfrage.nachricht= myRequest.nachricht; 
          kontaktanfrage.telefonnummer= myRequest.telefonnummer;
			  
        }).save(function(err,data){
            if(err) return next(err);
            console.log("\t Zeile geändert (id= " + req.params.id + ")");
            return next();
        });
    },
    delete: function(req, res, next){
        console.log("kontaktanfragenDAO.js --> delete (id=" + req.params.id + ")");
        req.models.kontaktanfragenDB.find({id: req.params.id}).remove(function(err, data) {
            if(err) return next(err);
            console.log("\t Zeile entfernt (id= " + req.params.id + ")");
            return next(null,data);
        });
    },
    
};



