module.exports = function (orm, db) {
    var coaches = db.define('coaches', {
            empfaenger: String,
            betrag: Number,
            quittung: Boolean,
            anrede: String,
            titel: String,
            vorname: String,
            nachname: String,
            firma: String,
            firmenzusatz: String,
            email: String,
            strasse: String,
            hausnummer: String,
            plz: {type: "integer"},
            ort: String,
            land: String,
            zahlungsmethode: {type: "object"}
        }
    );

    if (process.env.MODE === 'development') {

        db.driver.execQuery('truncate table coaches', function (err, data) {
            if (err) throw err;
            coaches.create({
                empfaenger: 'Radio7',
                betrag: 100,
                quittung: true,
                anrede: 'Herr',
                titel: '',
                vorname: 'Samuel',
                nachname: 'Alazar',
                firma: 'Hochschule Neu-Ulm',
                firmenzusatz: 'HNU',
                email: '',
                strasse: 'test-strasse',
                hausnummer: 'test-hausnummer',
                plz: 'test-plz',
                ort: 'Blaustein',
                land: 'Deutschland',
                zahlungsmethode: {
                    name: 'PayPal',
                    transactionId: '12N17240XG8953826'
                }
            }, function (err, data) {
                if (err) throw err;
            });
        });
    }


}
