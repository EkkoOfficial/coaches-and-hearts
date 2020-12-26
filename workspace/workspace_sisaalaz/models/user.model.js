module.exports = function(orm,db){
    db.define('benutzer',{
        email: String,
        benutzername : String,
        passwort : String,
        rolle: ['ADMIN', 'MITARBEITER', 'AUSHILFE']
    })
}
