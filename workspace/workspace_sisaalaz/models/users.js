var plainObject = require('../helpers/plainObject');

module.exports = function (orm, db) {

    var users = db.define('users', {
        email: String,
        username: String,
        password: String,
        role: ['admin', 'mitarbeiter', 'teammitglied', 'aushilfe']
    });

    if (process.env.MODE === 'development') {

        db.driver.execQuery('truncate table users', function (err, data) {
            if (err) throw err;
            users.create({
                email: 'admin@admin.org',
                username: 'admin',
                password: 'admin',
                role: 'admin'
            }, function (err, data) {
                if (err) throw err;
            });
        });
    }

}