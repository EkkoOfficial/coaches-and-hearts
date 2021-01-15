console.log("\n \n \n settings.js: \n Start des Servers beginnt ...")
//Achtung: HNU-Arbeitsumgebung (bzw. lokal) benutzt den HNU-mySQL-Server 'guerillacamp.hs-neu-ulm.de' als dbHOST
//var dbHost = process.env.HOST || 'guerillacamp.hs-neu-ulm.de';
//         CODEANYWHERE benutzt eigenen Container-mySQL-Server als dbHOST
var dbHost = process.env.HOST || 'localhost';


//Achtung: HNU-Arbeitsumgebung (bzw. lokal) benutzt Ihre selbstangelegte Datenbank WebEng-x 
//var dbName = "WebEng-x";
//         CODEANYWHERE benutzt vorkonfigurierte Datenbank WebEng
var dbName = "WebEng";

//Benutzer der mySQL-Datenbank
var dbUser = 'root';
dbUser=dbUser.substring(0,16);
//Passwort für den root-User der mySQL-Datenbank an der HNU
var dbPasswd="webeng";
//Passwort für den root-User der mySQL-Datenbank lokal bei mir
//var dbPasswd="WebEngStuff";

//node.js-Server läuft bei HNU-Arbeitsumgebung (lokal) unter localhost:8080,
//                     bei CODEANYWHERE auf eigenem Server
var port = process.env.PORT || 8080;

console.log("\t mySQL-Server: " + dbHost + "\n\t Datenbank: " + dbName + "\n\t User: " + dbUser);
console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
console.log("CODEANYWHERE:\n\t Ihr Server ist nun ansprechbar unter der Adresse in der Info-Datei des Projekts,");
console.log("\t d.h. Container selektieren, rechte Maustaste benutzen, Info wählen");
console.log("\t Beispiel: 'https://container_ako-andreakohlhase624916.codeanyapp.com/'");
console.log("HNU-Arbeitsumgebung (bzw. lokal):\n\t Ihr Server ist nun ansprechbar unter 'localhost:8080'!");
console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

module.exports = {
    development: {
        ip: dbHost, 
        port: port,
        db: {
            host: dbHost,
            port: 3306,
            protocol: 'mysql',
            user: dbUser,
            password: dbPasswd,
            database: dbName,
            connectionLimit: 100
        }
    },
    production: {
        ip: dbHost,
        port: port,
        db: {
            host: dbHost,
            port: 3306,
            protocol: 'mysql',
            user: dbUser,
            password: dbPasswd,
            database: dbName,
            connectionLimit: 100
        }
    }
};