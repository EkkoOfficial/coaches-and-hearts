/* *****************************************************************
* Diese Datei gehört kurs IMUK3 WebEng                             *
* Copyright (c) by Sarah Schmirander                               *
* Licensed under GPL3, see http://www.gnu.org/licenses/gpl.html    *
******************************************************************** */

module.exports = {    
    get: function (req, res, next) {
        console.log("aktionenDAO.js --> get");
        req.models.aktionenDB.find({id: req.params.id}, function(err, data) {
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
        console.log("aktionenDAO.js --> getall");
        req.models.aktionenDB.find(function(err, data) {
            if(err) return next(err);
            console.log("\t Alle Zeilen gelesen");
            return next(null, data);
        });
    },
    create: function (req, res, next) {
        console.log("aktionenDAO.js --> create");
        var anfrage = req.body;
        console.log("\t Zeile zum anlegen (aktionsname= " + anfrage.aktionsname + ")");
        req.models.aktionenDB.create({
         aktionsname: anfrage.aktionsname,
			  ort: anfrage.ort,
			  datum: anfrage.datum,
			  aktionsinfo: anfrage.aktionsinfo,
        spendengeld: anfrage.spendengeld,
        veranstalter: anfrage.veranstalter,
        foto: anfrage.foto,
         
        }, function(err, data) {
            if(err) return next(err);
            console.log("\t Zeile angelegt (id= " + data.id + ")");
            return next(null, data);
        });
    },
    update: function(req, res, next){
        console.log("aktionenDAO.js --> update");
        var myRequest = req.body;
        console.log(JSON.stringify(req.body));
        console.log("\t update fuer id= " + req.params.id + "!" +"\t mit aktionsname=" + myRequest.aktionsname +"!");
        req.models.aktionenDB.find({
            id: req.params.id
        }).each(function (aktion) {
            //myRequest-Parameter lesbar, weil wir den urlencoded-body-parser eingebunden haben
            aktion.aktionsname= myRequest.aktionsname;
			   aktion.ort= myRequest.ort;
			   aktion.datum= myRequest.datum;
			   aktion.aktionsinfo= myRequest.aktionsinfo;
         aktion.spendengeld= myRequest.spendengeld;
         aktion.veranstalter= myRequest.veranstalter;
         aktion.foto= myRequest.foto;
         
			  
        }).save(function(err,data){
            if(err) return next(err);
            console.log("\t Zeile geändert (id= " + req.params.id + ")");
            return next();
        });
    },
    delete: function(req, res, next){
        console.log("aktionenDAO.js --> delete (id=" + req.params.id + ")");
        req.models.aktionenDB.find({id: req.params.id}).remove(function(err, data) {
            if(err) return next(err);
            console.log("\t Zeile entfernt (id= " + req.params.id + ")");
            return next(null,data);
        });
    },
    
};



