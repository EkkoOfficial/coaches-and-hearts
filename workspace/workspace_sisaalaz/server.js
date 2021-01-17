/**
 * Globale Variable für den Project-Root-Pfad deklarieren
 * @see https://stackoverflow.com/questions/10265798/determine-project-root-from-a-running-node-js-application
 */
var path = require('path');
var dotenv = require('dotenv');

global.APP_ROOT_DIR = path.resolve(__dirname);

dotenv.config({
    path: path.join(APP_ROOT_DIR, 'config/.env')
});

require('express-orm-mvc')({
        mode: process.env.MODE || 'production',           //default: production
        path: __dirname,               //default: auto detect
        express: require('express'),   //specify your express version
        orm: require('orm'),    //specify your orm version

    },
    function (error, mvc) {
        if (error)
            return console.log(error);
        console.log('Server gestartet', 'http://' + mvc.settings.ip + ':' + mvc.settings.port);
        console.log('Mode: %s', mvc.mode);
        console.log('Host: %s', mvc.settings.ip);
        console.log('Port: %s', mvc.settings.port);
    });
