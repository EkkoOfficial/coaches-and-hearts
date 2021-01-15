/* *****************************************************************
* Diese Datei gehört zum imuk3-webeng-Musterprojekt                *
* Copyright (c) by Andrea Kohlhase                                 *
* Licensed under GPL3, see http://www.gnu.org/licenses/gpl.html    *
******************************************************************** */

module.exports = function (orm, db) {
    db.define('wareDB', {
		bild:   { type: 'text'},
		bezeichnung:   { type: 'text'},
		artikelnummer: { type: 'text'},
		preis:   { type: 'text'},
    groesse:   { type: 'text'},
    verfuegbar: { type: 'text'}
    });
};