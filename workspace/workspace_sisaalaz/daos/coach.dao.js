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

        var data = {};
        Object.assign(data, req.body);
        req.models.coaches.create(data, function (err, data) {
            if (err) return next(err);
            console.log("\t Zeile angelegt (id= " + data.id + ")");
            return next(null, data);
        });
    },
    update: function (req, res, next) {
        console.log("coachesDAO.js --> update");
        req.models.coaches.find({
            id: req.params.coachId
        }).each(function (coach) {
            Object.assign(coach, req.body);
            coach.save(function (err, data) {
                if (err) return next(err);
                console.log("\t Zeile geändert (id= " + req.params.coachId + ")");
                return next(null, data);
            });
        });
    },
    delete: function (req, res, next) {
        console.log("coachesDAO.js --> delete (id=" + req.params.coachId + ")");
        req.models.coaches.find({id: req.params.coachId}).remove(function (err, data) {
            if (err) return next(err);
            console.log("\t Zeile entfernt (id= " + req.params.coachId + ")");
            return next(null, data);
        });
    },

};



