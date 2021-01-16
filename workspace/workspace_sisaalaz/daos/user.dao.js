
module.exports = {

    getAll: function (req, res, next) {
        req.models.benutzer
            .find({})
            .omit('passwort')
            .run(function (err, result) {
                if (err) return next(err);
                return next(null, result);
            });
    },

    getById: function (userId) {
        return function (req, res, next) {
            req.models.benutzer
                .find({
                    id: userId
                }).limit(1)
                .omit('passwort')
                .run(function (err, result) {
                    if (err)
                        return next(err);
                    if (result.length === 0)
                        return res.status(404).json({status: 404, message: 'user not found'});
                    return next(null, result[0]);
                });
        }
    },

    getByNameAndPassword: function (credentials) {
        return function (req, res, next) {
            req.models.benutzer
                .find({
                    benutzername: credentials.username,
                    passwort: credentials.password
                })
                .limit(1)
                .omit('passwort')
                .run(function (err, results) {
                    if (err) return next(err);
                    if (results.length === 0) return next(err);
                    return next(null, results[0]);
                });
        };
    }
}
