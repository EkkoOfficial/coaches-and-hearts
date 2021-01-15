/* *****************************************************************
* Diese Datei gehört zum imuk3-webeng-Musterprojekt                *
* Copyright (c) by Isabell Ripple                                 *
* Licensed under GPL3, see http://www.gnu.org/licenses/gpl.html    *
******************************************************************** */

module.exports = function (orm, db) {
    db.define('teammitgliederDB', {
		bild:   { type: 'text'},
		name:   { type: 'text'},
		strasse: { type: 'text'},
		ort:   { type: 'text'},
    geburtsdatum:   { type: 'text'},
    beruf:   { type: 'text'},
    telefonnummer:   { type: 'text'}
    });
};