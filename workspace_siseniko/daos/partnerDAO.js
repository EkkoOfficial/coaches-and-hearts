/* *****************************************************************
* Diese Datei gehört zum webeng-Musterprojekt                      *
* Copyright (c) by Andrea Kohlhase                                 *
* Licensed under GPL3, see http://www.gnu.org/licenses/gpl.html    *
******************************************************************** */

module.exports = {    
    get: function (req, res, next) {
        console.log("partnerDAO.js --> get");
        req.models.partnerDB.find({id: req.params.id}, function(err, data) {
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
        console.log("partnerDAO.js --> getall");
        req.models.partnerDB.find(function(err, data) {
            if(err) return next(err);
            console.log("\t Alle Zeilen gelesen");
            return next(null, data);
        });
    },
    create: function (req, res, next) {
        console.log("partnerDAO.js --> create");
        var anfrage = req.body;
        console.log("\t Zeile zum anlegen (partnername= " + anfrage.partnername + ")");
        req.models.partnerDB.create({
        partnerbild: anfrage.partnerbild,
			  partnername: anfrage.partnername,
			  beschreibung: anfrage.beschreibung,
			  ansprechpartner: anfrage.ansprechpartner,
        telefonnummer: anfrage.telefonnummer,
        email: anfrage.email,
        standort: anfrage.standort,
        }, function(err, data) {
            if(err) return next(err);
            console.log("\t Zeile angelegt (id= " + data.id + ")");
            return next(null, data);
        });
    },
    update: function(req, res, next){
        console.log("partnerDAO.js --> update");
        var myRequest = req.body;
        console.log(JSON.stringify(req.body));
        console.log("\t update fuer id= " + req.params.id + "!"     +"\t mit partnername=" + myRequest.partnername +"!");
        req.models.partnerDB.find({
            id: req.params.id
        }).each(function (partner) {
            //myRequest-Parameter lesbar, weil wir den urlencoded-body-parser eingebunden haben
         partner.partnerbild= myRequest.partnerbild;
			   partner.partnername= myRequest.partnername;
			   partner.beschreibung= myRequest.beschreibung;
			   partner.ansprechpartner= myRequest.ansprechpartner;
         partner.telefonnummer= myRequest.telefonnummer;
			   partner.email= myRequest.email;  
			   partner.standort= myRequest.standort;
          
       
			  
        }).save(function(err,data){
            if(err) return next(err);
            console.log("\t Zeile geändert (id= " + req.params.id + ")");
            return next();
        });
    },
    delete: function(req, res, next){
        console.log("partnerDAO.js --> delete (id=" + req.params.id + ")");
        req.models.partnerDB.find({id: req.params.id}).remove(function(err, data) {
            if(err) return next(err);
            console.log("\t Zeile entfernt (id= " + req.params.id + ")");
            return next(null,data);
        });
    },
    
};



