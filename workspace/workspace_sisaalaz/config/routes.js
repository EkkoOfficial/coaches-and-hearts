module.exports = function (app, controllers) {
    app.get('/api/auth', controllers.auth.check);
    app.post('/api/login', controllers.auth.login);
    app.post('/api/logout', controllers.auth.logout)
    app.get('/api/coaches', controllers.auth.requireLogin(), controllers.coaches.getAll);
    app.get('/api/coaches/:coachId', controllers.auth.requireLogin(), controllers.coaches.get);
    app.delete('/api/coaches/:coachId', controllers.auth.requireLogin(), controllers.auth.requireRole('admin'), controllers.coaches.delete);
    app.put('/api/coaches/:coachId', controllers.auth.requireLogin(), controllers.auth.requireRole('admin'), controllers.coaches.update);
    app.post('/api/coaches', controllers.coaches.create);
}
