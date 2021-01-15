/* *****************************************************************
* Diese Datei gehört zum IMUK3 Kurs Webeng             *
* Copyright (c) by Sarah Schmirander                               *
* Licensed under GPL3, see http://www.gnu.org/licenses/gpl.html    *
******************************************************************** */

module.exports = function (orm, db) {
    db.define('aktionenDB', {
		aktionsname:   { type: 'text'},
		ort:   { type: 'text'},
		datum: { type: 'text'},
		aktionsinfo:   { type: 'text'},
    spendengeld:   { type: 'text'},
    veranstalter:   { type: 'text'},
    foto:   { type: 'text'}
    });
};