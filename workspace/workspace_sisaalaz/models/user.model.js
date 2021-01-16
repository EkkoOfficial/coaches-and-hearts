module.exports = function (orm, db) {
    db.define('benutzer', {
        email: String,
        benutzername: String,
        passwort: String,
        rolle: ['admin', 'mitarbeiter', 'teammitglied', 'aushilfe']
    })
}
