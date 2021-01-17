module.exports = {

    get: function (req, res, next) {
        req.models.coaches
            .find({id: req.params.coachId}, function (err, data) {
                if (err) return next(err);
                if (data.length === 0) {
                    console.log("Keinen Eintrag gefunden (id= " + req.params.id + ")");
                    return next(err);
                } else {
                    return next(null, data[0]);
                }
            });
    },

    getAll: function (req, res, next) {
        req.models.coaches.find(function (err, data) {
            if (err) return next(err);
            return next(null, data);
        });
    },
    create: function (req, res, next) {
        console.log("coachesDAO.js --> create");
        var anfrage = req.body;
        console.log("\t Zeile zum anlegen (empfaenger= " + anfrage.empfaenger + ")");
        req.models.coach_anmeldung.create({
            empaenger: anfrage.empfaenger,
            betrag: anfrage.betrag,
            quittung: anfrage.quittung,
            anrede: anfrage.anrede,
            titel: anfrage.empfaenger,
            betrag: anfrage.betrag,
            quittung: anfrage.quittung,
            anrede: anfrage.anrede,
        }, function (err, data) {
            if (err) return next(err);
            console.log("\t Zeile angelegt (id= " + data.id + ")");
            return next(null, data);
        });
    },
    update: function (req, res, next) {
        console.log("coachesDAO.js --> update");
        var myRequest = req.body;
        console.log(JSON.stringify(req.body));
        console.log("\t update fuer id= " + req.params.id + "!"
            + "\t mit empfaenger=" + myRequest.empfaenger + "!");


        req.models.coaches.find({
            id: req.params.id
        }).each(function (coach) {
            //myRequest-Parameter lesbar, weil wir den urlencoded-body-parser eingebunden haben
            coach.empfaenger = myRequest.empfaenger;
            coach.betrag = myRequest.betrag;
            coach.quittung = myRequest.quittung;
            coach.vorname = myRequest.vorname;
            coach.nachname = myRequest.nachname;
            coach.email = myRequest.email;
            coach.firma = myRequest.firma;
            coach.firmenzusatz = myRequest.firmenzusatz;
            coach.email = myRequest.email;
            coach.strasse = myRequest.strasse;
            coach.hausnummer = myRequest.hausnummer;
            coach.plz = myRequest.plz;
            coach.ort = myRequest.ort;
            coach.land = myRequest.land;
            coach.zahlungsmethode = myRequest.zahlungsmethode;


        }).save(function (err, data) {
            if (err) return next(err);
            console.log("\t Zeile geändert (id= " + req.params.id + ")");
            return next();
        });
    },
    delete: function (req, res, next) {
        console.log("coachesDAO.js --> delete (id=" + req.params.id + ")");
        req.models.coach_anmeldung.find({id: req.params.id}).remove(function (err, data) {
            if (err) return next(err);
            console.log("\t Zeile entfernt (id= " + req.params.id + ")");
            return next(null, data);
        });
    },

};



