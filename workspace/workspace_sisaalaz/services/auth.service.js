var auth = {
    requireLogin: function () {
        return function (req, res, next) {
            return next();
            if (req.session.user) {
                return next();
            }
            return res.status(401).json({
                status: 401,
                message: 'Unauthorized'
            });
        }
    },

    /**
     * @param {(string|string[])} roles
     */
    requireRole: function (roles) {
        if (typeof roles === 'string') {
            roles = [roles];
        }
        return function (req, res, next) {
            if (req.session.user && roles.includes(req.session.user.role)) {
                next();
            }
            res.status(401).json({
                status: 401,
                message: 'Unauthorized'
            });
        };
    }
}

module.exports = auth;
