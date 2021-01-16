module.exports = function (orm, db) {
    db.define('coach_anmeldung', {
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
    )
}
