module.exports = {

    check: function (req, res, next) {
        if (!req.session.user) {
            return res.status(401).json({
                status: 401,
                message: 'Du bist im Moment nicht angemeldet.',
                authenticated: false,
                user: null
            });
        }
        return res.json({
            authenticated: true,
            user: req.session.user
        });
    },

    login: function (req, res, next) {
        req.models.users.find({
            username: req.body.username,
            password: req.body.password
        }, function (err, results) {
            if (err) return next(err);
            if (results.length === 0) {
                return res.status(401).json({
                    status: 401,
                    message: 'Zugangsdaten fehlerhaft',
                    authenticated: false,
                    user: null
                });
            }
            var user = JSON.parse(JSON.stringify(results[0]));
            delete user.password;
            req.session.user = user;
            return res.json({
                authenticated: true,
                user: user
            });
        });
    }

}
