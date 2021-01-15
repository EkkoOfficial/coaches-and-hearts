
/* *****************************************************************
* Diese Datei gehört zum imuk3-webeng-Musterprojekt                *
* Copyright (c) by Andrea Kohlhase                                 *
* Licensed under GPL3, see http://www.gnu.org/licenses/gpl.html    *
******************************************************************** */

module.exports = function (orm, db) {
    db.define('partnerDB', {
		partnerbild:   { type: 'text'},
		partnername:   { type: 'text'},
		beschreibung: { type: 'text'},
		ansprechpartner:   { type: 'text'},
    telefonnummer: { type: 'text'},
    email: { type: 'text'},
    standort: { type: 'text'}
    
    });
};