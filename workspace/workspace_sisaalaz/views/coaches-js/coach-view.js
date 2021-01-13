function erzeugeCoachInhalt(index) {
    console.log("Funktion erzeugeCoachInhalt mit " + index);
    /* In dieser Funktion wird jeweils der Arrayeintrag der index-ten Stelle als Ast erzeugt (der spÃ¤ter in die Baumstruktur des DOM als Ast gehÃ¤ngt werden kann)
     */
    var coach = "";


    //Erzeuge empfaenger
    var empfaenger = "";
    empfaenger = `<div class='item-empfaenger'>${arrCoaches[index].empfaenger}</div>`;

    var betrag = "";
    betrag = `<div class='item-betrag'>${arrCoaches[index].betrag}</div>`;

    var quittung = "";
    quittung = `<div class='item-quittung'>${arrCoaches[index].quittung}</div>`;

    var anrede = "";
    anrede = `<div class='item-anrede'>${arrCoaches[index].anrede}</div>`;

    var titel = "";
    titel = `<div class='item-titel'>${arrCoaches[index].titel}</div>`;

    var vorname = "";
    vorname = `<div class='item-vorname'>${arrCoaches[index].vorname}</div>`;

    var nachname = "";
    nachname = `<div class='item-nachname'>${arrCoaches[index].nachname}</div>`;

    var firma = "";
    firma = `<div class='item-firma'>${arrCoaches[index].firma}</div>`;

    var firmenzusatz = "";
    firmenzusatz = `<div class='item-firmenzusatz'>${arrCoaches[index].firmenzusatz}</div>`;

    var email = "";
    email = `<div class='item-email'>${arrCoaches[index].email}</div>`;

    var strasse = "";
    strasse = `<div class='item-strasse'>${arrCoaches[index].strasse}</div>`;

    var hausnummer = "";
    hausnummer = `<div class='item-hausnummer'>${arrCoaches[index].hausnummer}</div>`;

    var plz = "";
    plz = `<div class='item-plz'>${arrCoaches[index].plz}</div>`;

    var ort = "";
    ort = `<div class='item-ort'>${arrCoaches[index].ort}</div>`;

    var land = "";
    land = `<div class='item-land'>${arrCoaches[index].land}</div>`;

    var zahlungsmethode = "";
    zahlungsmethode = `<div class='item-zahlungsmethode'>${arrCoaches[index].zahlungsmethode}</div>`;






    //neu fÃ¼r Buchgrid: die strukturierenden divs entfallen
    coach = empfaenger +
        betrag +
        quittung +
        anrede +
        titel +
        vorname +
        nachname +
        firma +
        firmenzusatz +
        email +
        strasse +
        hausnummer +
        plz +
        ort +
        land +
        zahlungsmethode;

    return coach;
}


function erzeugeButton(id, func, bildpfad, berechtigungsKlassen) {
    console.log("Funktion erzeugeButton mit " +
        id + ", " +
        func + ", " +
        bildpfad + ", " +
        berechtigungsKlassen
    );


    var vButton = "";
    //Das mit \ "maskierte" AnfÃ¼hrungszeichen ist die dritte verschachtelte Ebene fÃ¼r AnfÃ¼hrungszeichen
    vButton = "<img id='aktion" + id + "'" +
        "onclick='" +
        func + "(\"" + id + "\")'" +
        "class='bildknopf " + berechtigungsKlassen + "'" +
        "src='" + bildpfad + "'/>";
    return vButton;

}

//Ansicht beim Aufrufen der Webseite
coachesAnzeigen('coaches');
