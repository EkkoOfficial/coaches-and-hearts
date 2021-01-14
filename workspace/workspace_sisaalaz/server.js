/**
 * Globale Variable für den Project-Root-Pfad deklarieren
 * @see https://stackoverflow.com/questions/10265798/determine-project-root-from-a-running-node-js-application
 */
var path = require('path');
global.APP_ROOT_DIR = path.resolve(__dirname);

require('express-orm-mvc')({
        mode: 'development',           //default: production
        path: __dirname,               //default: auto detect
        express: require('express'),   //specify your express version
        orm: require('orm'),    //specify your orm version

    },
    function (error, mvc) {
        if (error)
            return console.log(error);
        console.log('Server wird gestartet');
        console.log('Mode: %s', mvc.mode);
        console.log('Port: %s', mvc.settings.port);
    });
