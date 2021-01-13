/* *****************************************************************
* Diese Datei gehört zum webeng-Musterprojekt                      *
* Copyright (c) by Andrea Kohlhase                                 *
* Licensed under GPL3, see http://www.gnu.org/licenses/gpl.html    *
******************************************************************** */

module.exports = {    
    get: function (req, res, next) {
        console.log("coachesDAO.js --> get");
        req.models.coach_anmeldung.find({id: req.params.id},function(err,data){
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
        console.log("coachesDAO.js --> getall");
        req.models.coach_anmeldung.find(function(err, data) {
            if(err) return next(err);
            console.log("\t Alle Zeilen gelesen");
            return next(null, data);
        });
    },
    create: function (req, res, next) {
        console.log("coachesDAO.js --> create");
        var anfrage = req.body;
        console.log("\t Zeile zum anlegen (titel= " + anfrage.titel + ")");
        req.models.coach_anmeldung.create({
           empaenger: anfrage.empfaenger,
			  betrag: anfrage.betrag,
			  titel: anfrage.titel,
			  name: anfrage.name,
        }, function(err, data) {
            if(err) return next(err);
            console.log("\t Zeile angelegt (id= " + data.id + ")");
            return next(null, data);
        });
    },
    update: function(req, res, next){
        console.log("coachesDAO.js --> update");
        var myRequest = req.body;
        console.log(JSON.stringify(req.body));
        console.log("\t update fuer id= " + req.params.id + "!" 
                    +"\t mit titel=" + myRequest.titel +"!");
        req.models.coach_anmeldung.find({
            id: req.params.id
        }).each(function (coach) {
            //myRequest-Parameter lesbar, weil wir den urlencoded-body-parser eingebunden haben
            coach.titel= myRequest.empfaenger;
			   coach.autor= myRequest.betrag;
			   coach.preis= myRequest.name;
			   coach.zustand= myRequest.titel;
			  
        }).save(function(err,data){
            if(err) return next(err);
            console.log("\t Zeile geändert (id= " + req.params.id + ")");
            return next();
        });
    },
    delete: function(req, res, next){
        console.log("coachesDAO.js --> delete (id=" + req.params.id + ")");
        req.models.coach_anmeldung.find({id: req.params.id}).remove(function(err, data) {
            if(err) return next(err);
            console.log("\t Zeile entfernt (id= " + req.params.id + ")");
            return next(null,data);
        });
    },
    
};



