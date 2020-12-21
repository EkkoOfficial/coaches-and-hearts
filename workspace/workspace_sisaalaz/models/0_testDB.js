/* *****************************************************************
* Diese Datei gehört zum imuk3-webeng-Musterprojekt                *
* Copyright (c) SS20 by Andrea Kohlhase                            *
* Licensed under GPL3, see http://www.gnu.org/licenses/gpl.html    *
******************************************************************** */

//Bemerkung: Die "1" am Anfang des Dateinamens wurde nur genommen, 
//           weil die Modelle lexikographisch eingelesen werden.
//           Falls also die Reihenfolge wichtig ist: richtige Benennung einführen!

module.exports = function (orm, db) {
    db.define('testgDB', {
		test:  { type: 'text'}
    });
};