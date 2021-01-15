
    //Die Datenstruktur einer Coach
    function Coach(id , empfaenger, betrag, quittung, anrede, titel, firma, firmenzusatz) {
    console.log("Funktion Coach mit " +id+ empfaenger + betrag + quittung + anrede + titel + firma + firmenzusatz)
    this.id ="";
    this.empfaenger = empfaenger;
    this.ort = betrag;
    this.quittung = quittung;
    this.anrede = anrede;
    this.anrede = titel;
    this.firma = firma;
    this.foto = firmenzusatz;
}




    //Dieses Array dient der Speicherung aller Aktionen

    var arrCoaches = new Array();




    /* CRUD-FUNKTIONEN */
    //ANZEIGEN
    function coachesAnzeigen(ort) {
    console.log('coachesAnzeigen: ' + ort);
    var route="/coach";
    var daten="";

    $.get(route, daten, function(res) {
    console.log("Callbackfunktion des get-Requests (lesen): \n" + JSON.stringify(res).toString());
    //Listenansicht initialisieren

    //Anlegen-Knopf erzeugen, wenn er noch nicht existiert
    /*  if ($("#aktion").length == 0) {
          console.log("\t Anlegeknopf wird erzeugt");
          $("#liste").prepend(
              erzeugeButton("",
                  "zeigeEingabemaske", "pics/icons/add.png",
                  "anlegenButton adminButton maButton")
          )
      }*/

    $('#' + ort).empty();
    arrCoaches=res;
    //Array-Schleife: für jeden Eintrag Erzeugung eines Coach-Eintrags in die Listenansicht
    for (var i = 0; i < arrCoaches.length; i++) {
    erzeugeCoachElem(i, ort);
}
    $(".view").hide();
    $(".eingabeButtonzurueck").hide();
    $("#liste").show();
    $(".neuanlegenInfo").show();
    checkeBerechtigungen();
})
    .fail(function(xhr){
    console.log("/t Aufruf von get.fail-Funktion mit Parameter err=" + xhr.responseText);
    errorAlert(xhr.responseText);
});
}





    //ANLEGEN
    function aktionBearbeiten(index) {
    console.log("Funktion CoachBearbeiten mit " + index);

    //Lesen der Benutzereingaben
    var empfaenger = $("#eingabeEmpfaenger").val();
    var betrag = $("#eingabeBetrag").val();
    var quittung = $("#eingabeQuittung").val();
    var anrede = $("#eingabeAnrede").val();
    var titel = $("#eingabeTitel").val();
    var firma = $("#eingabeFirma").val();
    var firmenzusatz = $("#eingabeFirmenzusatz").val();
    var coach = new Coach ("",empfaenger, betrag, quittung, anrede, titel, firma, firmenzusatz);

    if (index == "") {
    console.log("\t anlegen");

    var route = "/coach";
    var daten= coach;

    // POST-Request
    $.post(route, daten, function(res) {
    console.log("\t Callbackfunktion des post-Requests (anlegen): \n" + JSON.stringify(res).toString());
    arrCoaches=res;

    coachesAnzeigen('aktionen');
})
    .fail(function(xhr){
    console.log("\t Aufruf von post.fail-Funktion mit Parameter err=" + xhr.responseText);
    errorAlert(xhr.responseText);
});


} else {
    var route = "/coach/";
    var daten= coach;
    var identifikation = arrCoaches[index].id;
    //AENDERN
    console.log("\t ändern mit " + index);

    // PUT-Request (jquery-extensions.js einbinden!)
    $.put(route + identifikation, daten, function(res) {
    console.log("Callbackfunktion des put-Requests (ändern): \n"
    + JSON.stringify(res).toString());
    arrCoaches=res;

    coachesAnzeigen('aktionen');
})
    .fail(function(xhr){
    console.log("/t Aufruf von put.fail-Funktion mit Parameter err=" + xhr.responseText);
    errorAlert(xhr.responseText);
});
}
}



    //LOESCHEN
    function coachLoeschen(index) {
    console.log("Funktion coachLoeschen mit " + index)

    // DELETE-Request (jquery-extensions.js einbinden!)
    $.delete("/aktion/"+ arrCoaches[index].id, function(res) {
    console.log("Callbackfunktion des delete-Requests (löschen): \n" + JSON.stringify(res).toString());
    arrCoaches=res;

    coachesAnzeigen('aktionen');
})
    .fail(function(xhr){
    console.log("/t Aufruf von delete.fail-Funktion mit Parameter err=" + xhr.responseText);
    errorAlert(xhr.responseText);
});


}





    //HILFSFUNKTIONEN
    function berechneKlasse(index) {
    // in dieser Funktion wird die Gridklasse berechnet zur Anzeige der Aktionen
    console.log("Funktion berechneKlasse mit " + index);
    var klasse = "item-zelle-" + index;
    console.log("Klasse: " + klasse);
    return klasse;
}



    function erzeugeCoachElem(index, ort) {
    console.log("Funktion erzeugeCoachElem mit " + index + ", " + ort);

    //neu für Listenansicht-Grid ist die Unterscheidung, ob die Gridklasse schon im DOM existiert
    var klasse = berechneKlasse(index);
    //Wenn ein Element dieser Klasse schon existiert, dann wird darein der neue Coach erzeugt, ansonsten wird ein Element dieser Klasse im ort-Tag erzeugt
    if ($("." + klasse).length) {
    console.log("Klasse " + klasse + " existiert schon!")
    $("." + klasse).append(
    erzeugeCoach(index)
    );
} else {
    $("#" + ort).append(
    '<div class="' + klasse + '">' +
    erzeugeCoach(index) +
    '</div>'
    );
}
}


    function erzeugeCoach(index) {
    return '<div id="' + index + '"' +
    'class="aktion">' +
    erzeugeCoachInhalt(index)
    //neu für Buch-Grid ist ein div-Tag, welches die Buttons enthält
    +
    '<div class="item-buttons">' +
    erzeugeButton(index, "zeigeEingabemaske", "pics/icons/edit.png", " adminButton ")

    +
    erzeugeButton(index, "zeigeSicherheitsabfrage", "pics/icons/delete.png", " adminButton maButton") +
    '</div>' +
    '</div>';
}




    function erzeugeCoachInhalt(index) {
    console.log("Funktion erzeugeCoachInhalt mit " + index);
    /* In dieser Funktion wird jeweils der Arrayeintrag der index-ten Stelle als Ast erzeugt (der später in die Baumstruktur des DOM als Ast gehängt werden kann)
     */
    var coach = "";

    //Erzeuge empfaenger
    var empfaenger = "";

    empfaenger = "<div class='item-n-value'>" + arrCoaches[index].aktionsname + "</div>";

    //Erzeuge betrag
    var betrag = "";
    betrag = "<label class='item-betrag'>Ort:</label>";
    betrag = betrag + "<div class='item-o-value'>" + arrCoaches[index].betrag + "</div>";

    //Erzeuge quittung
    var quittung = "";
    quittung = "<label class='item-quittung'>Datum:</label>";
    quittung = quittung + "<div class='item-d-value'>" + arrCoaches[index].quittung + "</div>";

    //Erzeuge titel
    var anrede = "";

    anrede = "<h3 class='item-i-value'>" + arrCoaches[index].anrede + "</h3>";


    //Erzeuge Spendengeld
    var titel = "";
    titel = "<label class='item-titel'>Spendengeld:</label>";
    titel = titel + "<div class='item-s-value'>" + arrCoaches[index].titel + "</div>";

    //Erzeuge Veranstalter
    var firma = "";
    firma = "<label class='item-firma'>Veranstalter:</label>";
    firma = firma + "<div class='item-v-value'>" + arrCoaches[index].veranstalter + "</div>";





    //neu für Buchgrid: die strukturierenden divs entfallen
    coach = empfaenger +
    betrag +
    quittung +
    titel +
    titel +
    firma +
    firmenzusatz;

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
    //Das mit \ "maskierte" Anführungszeichen ist die dritte verschachtelte Ebene für Anführungszeichen
    vButton = "<img id='aktion" + id + "'" +
    "onclick='" +
    func + "(\"" + id + "\")'" +
    "class='bildknopf " + berechtigungsKlassen + "'" +
    "src='" + bildpfad + "'/>";
    return vButton;

}

    // ********* FUNKTIONEN ZUM LOGIN UND LOGOUT **********
    function checkeBerechtigungen() {
    console.log("Funktion checkeBerechtigungen")
    //Alle Knöpfe auf unsichtbar setzen
    $('.adminButton, .maButton').hide();
    leseRolle(callback);
    function callback(roles){
    console.log("Funktion callback mit " + JSON.stringify(roles).toString());
    var rolesArray=roles.toString().split(',');
    for (var i = 0; i < rolesArray.length; i++) {
    if (rolesArray[i] == 'admin') {
    console.log("\t admin-Button wird gezeigt");
    $('.adminButton').show();
} else if (rolesArray[i] == 'mitarbeiter') {
    console.log('\t mitarbeiter-Button wird gezeigt');
    $('.maButton').show();

    /*** Teammitglied und aushilfe wurden als Rollen hinzugefügt **/
}else if (rolesArray[i] == 'teammitglied') {
    console.log('\t Teammitgliedansicht wird gezeigt');

}else if (rolesArray[i] == 'aushilfe') {
    console.log('\t n wird gezeigt');

} else {
    console.log("\t Unbekannte Rolle: " + rolesArray[i]);

}
}
    console.log("Achtung Achtung")
}

}




    function leseRolle(func) {
    console.log("Funktion leseRolle");
    //Beim Server wird nachgefragt, ob der Benutzer eingeloggt ist
    $.get("/service_istEingelogged", function(data) {
    console.log("eingeloggt: " + data.toString());

    //Falls User eingeloggt ist, dann werden Sichtbarkeiten in Abhängigkeit von den Rollen gesetzt
    if (data === true) {
    //Benutzer ist eingeloggt
    console.log("\t eingeloggt");
    setLoginButton("ausloggen");
    //Berechtigungen werden erfragt und bei erfolgreichem Lesen wird whatToDo ausgeführt
    $.get("/service_rollenAbfrage", function(roles){
    func(roles);
})}
    else {
    //Benutzer ist nicht eingeloggt
    console.log("\t nicht eingeloggt");
    setLogoutButton("zeigeLoginmaske");

    /***Spendengeld wird nur angezeigt wenn man eingeloggt ist**/
    $(".item-anrede").hide();
    $(".item-s-value").hide();
}
})
}

    function einloggen() {
    console.log("Funktion einloggen");

    //Einloggen
    var loginDaten = {"user": $("#item-eingabeBenutzer").val(),
    "password": $("#password").val()
}
    $.post('/login', loginDaten, function(data) {
    if (data === false) {
    console.log("\t POST: falscher login");

    /*****Dialogbox wenn login fehlgeschlagen ist **/
    $(function() {
    $("<div title ='Login Fehlgeschlagen'> <p> <img class='alertbild' src='pics/aktion/907px-Simple_Alert.svg.png' /> </br> Ihre Benutzerdaten waren nicht richtig, bitte versuchen Sie es noch einmal.</p> </div>").dialog({
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    buttons: {
    "ok": function() {
    $(this).dialog("close");
    zeigeLoginmaske();
},

}
});
});
}
    else {
    console.log("\t POST: richtiger login");

    //Richtige Ansicht nach dem Einloggen anzeigen
    coachesAnzeigen("coaches");
}
})
}

    function ausloggen() {
    console.log("Funktion ausloggen");
    //Ausloggen
    $.get('/logout', function(res) {
    console.log("\t GET: logout success");
    //Berechtigungen anpassen
    checkeBerechtigungen();
    //Loggen-Knopf setzen
    setLogoutButton('zeigeLoginmaske');
    //Richtige Ansicht nach dem Ausloggen anzeigen
    $(".hide").show();
    coachesAnzeigen("aktionen");
})
    .fail(function(xhr){
    console.log("\t GET: logout failure");
    //xhr steht für XML-HTTP-Request, also das HTTP-Objekt
    console.log("/t Aufruf von get.fail-Funktion mit Parameter err=" + xhr.responseText);
    errorAlert(xhr.responseText);
});
}

    function setLoginButton(func) {
    console.log("Funktion setLoginButton mit " + func)
    //Loggen-Knopf zu Logout-Knopf machen
    $("#logKnopf").html("Ausloggen")
    .attr("onclick", func + "()");
}

    function setLogoutButton(func) {
    console.log("Funktion setLogoutButton mit " + func)
    //Loggen-Knopf zu Login-Knopf machen
    $("#logKnopf").html("Einloggen")
    .attr("onclick", func + "()");
}

    function zeigeLoginmaske() {
    console.log('zeigeLoginmaske');
    //nur Loginansicht sichtbar machen
    $(".view").hide();
    $(".hide").hide();
    $(".eingabeButtonzurueck").hide();
    $("#loginMaske").show();
}


    function zeigeEingabemaske(index) {
    console.log('zeigeEingabemaske von index ' + index);

    //nur Eingabemaske sichtbar machen
    $(".view").hide();
    $(".hide").hide();
    $("#eingabe").show();
    $(".eingabeButtonzurueck").show();
    $(".anlegenButton").hide();
    $(".neuanlegenInfo").hide();
    $(".anlegenText").hide();
    if (index == "") {
    console.log("\ t anlegen");


    // verschiedene Überschriften werden angezeigt mit show und hide
    $("#coachAnlegenueberschrift").show();
    $("#coachbearbeitenueberschrift").hide();

    //Eingabemaske initialisieren
    $("#eingabe input").val("");
    $("#eingabeAnrede").val("");
    $("#eingabe input[type='submit']").val("Speichern");
    $("#eingabe").attr("action", "javascript:aktionBearbeiten('')");
} else {
    console.log("\ t ändern");

    // verschiedene Überschriften werden angezeigt mit show und hide
    $("#coachAnlegenueberschrift").hide();
    $("#coachbearbeitenueberschrift").show();
    //Eingabemaske initialisieren
    $("#eingabe input").val("");
    $("#eingabe input[type='submit']").val("Speichern");
    $(".coachAnlegenueberschrift").append(" <b>bearbeiten</b>");

    //Daten in die Eingabemaske eintragen
    $("#eingabeEmpfaenger").val(arrCoaches[index].aktionsname);
    $("#eingaveBetrag").val(arrCoaches[index].ort);
    $("#eingabeQuittung").val(arrCoaches[index].datum);
    $("#eingabeAnrede").val(arrCoaches[index].aktionsinfo);
    $("#eingabeTitel").val(arrCoaches[index].spendengeld);
    $("#eingabeFirma").val(arrCoaches[index].veranstalter);
    $("#eingabeFirmenzusatz").val(arrCoaches[index].foto);



    $("#eingabe").attr("action", "javascript:aktionBearbeiten('" + index + "')");



}

}



    /** Hier wird die Dialogbox in der Sicherheitsabfrage erstellt / Text der Dialogbox ist integriert***/
    function zeigeSicherheitsabfrage(index) {

    $(function() {
        $("<div title ='Sicherheitsabfrage'> <p> <img class='alertbild' src='pics/aktion/907px-Simple_Alert.svg.png' /> </br> Sind Sie Sicher, dass Sie die Coach mit dem Namen <span id='abfragename'>" + arrCoaches[index].aktionsname + " </span> wirklich löschen wollen?</p> </div>").dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
                "Löschen": function() {
                    $(this).dialog("close");
                    coachLoeschen(index);
                    coachesAnzeigen('aktionen');


                },
                abbrechen: function() {
                    $(this).dialog("close");
                }
            }
        });
    });


}


    /********************Prüfen ob Eingaben valide sind*******************/
    function save() {
    if ($("#eingabe").valid()) {
    console.log("\t Eingabe ist gültig");





} else {
    /********************Dialogbox wenn Eingaben nicht valide sind*******************/
    $(function() {
    $("<div title ='Eingabe fehlgeschlagen'> <p> <img class='alertbild' src='pics/aktion/907px-Simple_Alert.svg.png' /> </br> Ihre Eingaben sind nicht valide! Bitte tragen Sie an den gewünschten Stellen Informationen ein. </p> </div>").dialog({
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    buttons: {
    "ok": function() {
    $(this).dialog("close");
    zeigeEingabemaske();
},

}
});
});


}
}

    function myRules() {
    console.log("Aufruf von Funktion myRules()");

    // das Inputfeld mit dem Namen Aktionsname wird selektiert */
    $("input[name='empfaenger']").rules("add", {

    required: true, // das Feld Muss ausgefüllt werden

    minlength: 2,

    // Fehlermeldungen bei Nichteinhalten der Regeln

    messages: {
    required: 'Bitte geben Sie einen vollständingen Aktionsnamen ein.',

    minlength: 'Bitte geben Sie einen vollständigen Aktionsnamen (mind. 2 Zeichen) ein.',
}


});




    $("input[name='quittung']").rules("add", {

    required: true, // Das Feld muss ausgefüllt sein


    messages: {
    required: 'Bitte geben Sie das Datum ein.',


}


});




    $("input[name='firma']").rules("add", {

    required: true, // Das Feld muss ausgefüllt sein
    minlength: 2,

    messages: {
    required: 'Bitte geben Sie den Namen des Veranstalters ein.',
    minlength: 'Bitte geben Sie den Namen des Veranstalters (mind. 2 Zeichen) ein.',


}



});



}

    // Formbasierte Validierung mit Query

    //Validate Funktion

    $("#eingabe").validate({

    errorElement: 'span'



});
    //Aufruf der Funktion myRules()
    myRules();







    /*        /********************Prüfen ob LOGIN valide ist *******************/
    function savelogin() {
    if ($("#validateForm").valid()) {
    console.log("\t Eingabe ist gültig");





} else {

    /* Dialogbox wird angezeigt wenn die Logindaten falsch sind */
    console.log("\t Eingabe ist nicht valide");



}
}

    function myRuleslogin() {
    console.log("Aufruf von Funktion myRuleslogin()");

    // das Inputfeld mit dem Namen Aktionsname wird selektiert */
    $("input[name='benutzernameEingeben']").rules("add", {

    required: true, // das Feld Muss ausgefüllt werden

    minlength: 2,

    // Fehlermeldungen bei Nichteinhalten der Regeln

    messages: {
    required: 'Sie müssen ein Benutzernamen eingeben.',

    minlength: 'Bitte geben Sie ein Benutzername mit mind. 8 Zeichen ein.',
}


});

    $("input[name='passwortEingeben']").rules("add", {

    required: true, // Das Feld muss ausgefüllt sein
    minlength: 2,

    messages: {
    required: 'Sie müssen ein Passwort eingeben',

    minlength: 'Bitte geben Sie ein Passwort mit mind. 5 Zeichen ein.',
}



});






}

    // Formbasierte Validierung mit Query

    //Validate Funktion

    $("#validateForm").validate({

    errorElement: 'span'



});
    //Aufruf der Funktion myRuleslogin()
    myRuleslogin();




    // Falls es einen Fehler im Code gibt und man sich nicht mit dem Server verbinden kann erscheint eine Dialogbox
    function errorAlert(data) {
    console.log("Server Error Message: " + JSON.stringify(data).toString());

    $(function() {
    $("<div title ='Fehler auf dem Server'> <p> Aufgrund eines Fehlers kann keine Verbindung zum Server hergestellt werden. Dort befindet sich der Fehler:  " + JSON.stringify(data).toString()+ "</p> </div>").dialog({
    resizable: false,
    height: "auto",
    width: 1000,
    modal: true,
    buttons: {
    ok: function() {
    $(this).dialog("close");
}
}

});
});
}



    //Ansicht beim Aufrufen der Webseite
    coachesAnzeigen('coaches');


