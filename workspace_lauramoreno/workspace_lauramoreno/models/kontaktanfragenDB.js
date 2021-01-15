/* *****************************************************************
* Diese Datei gehört zum imuk3-webeng-Musterprojekt                *
* Copyright (c) by Laura Moreno                              *
* Licensed under GPL3, see http://www.gnu.org/licenses/gpl.html    *
******************************************************************** */

module.exports = function (orm, db) {
    db.define('kontaktanfragenDB', {
		anrede:   { type: 'text'},
		name:   { type: 'text'},
		email: { type: 'text'},
		betreff:   { type: 'text'},
    nachricht:   { type: 'text'},
    telefonnummer:   { type: 'text'}
    });
};