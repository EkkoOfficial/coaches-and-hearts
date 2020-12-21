/* *****************************************************************
* Diese Datei gehört zum imuk3-webeng-Musterprojekt                *
* Copyright (c) by Andrea Kohlhase                                 *
* Licensed under GPL3, see http://www.gnu.org/licenses/gpl.html    *
******************************************************************** */

module.exports = function (orm, db) {
    db.define('gebrauchteBuecherDB', {
		titel:   { type: 'text'},
		autor:   { type: 'text'},
		zustand: { type: 'text'},
		preis:   { type: 'text'},
		verkaeufer: {type:'text'}
    });
};