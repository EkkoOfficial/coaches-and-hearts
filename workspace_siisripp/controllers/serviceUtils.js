/* *****************************************************************
* Diese Datei gehört zum imuk3-webeng-Musterprojekt                *
* Copyright (c) WS 20/21 by Andrea Kohlhase                            *
* Licensed under GPL3, see http://www.gnu.org/licenses/gpl.html    *
******************************************************************** */

var path = require('path');
//var path=__dirname;  //|| "/home/ubuntu/workspace/projekt/views";

module.exports = {
   
    durchreichen: function (req, res, next) {
        console.log("serviceUtils.js --> durchreichen von " + req.url);
        var pathNew="../views";
        //Content-Type setzen (wg. nosniff-MIME-Type-Fehler)
        //Wegen des "Die Ressource von "http://localhost:8080/*.css" wurde wegen eines MIME-Typ-Konfliktes ("text/html") blockiert (X-Content-Type-Options: nosniff)."-Errors
        if(req.url.indexOf(".css")!=-1){
        	console.log("Content-type auf text/css setzen");
        	res.type(".css");
        	//Unterordner für Stylesheets festlegen
        	pathNew=pathNew + "/stylesheets";
        } else if(req.url.indexOf(".js")!=-1){
        	console.log("Content-type auf text/javascript setzen");
        	//Unterordner für Javascript-Dateien festlegen
        	res.type(".javascript");
        	pathNew=pathNew + "/client-js";
        }
        res.sendFile(path.join(__dirname,pathNew,req.url));
    },
    durchreichenBackend: function (req, res, next) {
        console.log("serviceUtils.js --> durchreichen von " + req.url);
        var pathNew="../views";
        //Content-Type setzen (wg. nosniff-MIME-Type-Fehler)
        //Wegen des "Die Ressource von "http://localhost:8080/*.css" wurde wegen eines MIME-Typ-Konfliktes ("text/html") blockiert (X-Content-Type-Options: nosniff)."-Errors
        if(req.url.indexOf(".css")!=-1){
        	console.log("Content-type auf text/css setzen");
        	res.type(".css");
        	//Unterordner für Stylesheets festlegen
        } else if(req.url.indexOf(".js")!=-1){
        	console.log("Content-type auf text/javascript setzen");
        	//Unterordner für Javascript-Dateien festlegen
        	res.type(".javascript");
        }
        res.sendFile(path.join(__dirname,pathNew,req.url));
    },
    index: function (req, res, next) {
        console.log("serviceUtils.js --> index");
        res.sendFile(path.join(__dirname,"../views","index.html"));
    },
    
   

    istEingelogged: function(req, res, next) {
        console.log("serviceUtils.js --> istEingelogged");
        var loggedIn = false;
        if(req.session.user_id){loggedIn=true}
        console.log("\t " + loggedIn);
        res.send(loggedIn);
    },
};
