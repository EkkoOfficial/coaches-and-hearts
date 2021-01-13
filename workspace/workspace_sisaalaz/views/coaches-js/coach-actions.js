
/* CRUD-FUNKTIONEN */

//ANZEIGEN
function coachesAnzeigen(ort) {
    console.log('coachesAnzeigen: ' + ort);
    var route="/coach";
    var daten="coach";

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
        //Array-Schleife: fÃ¼r jeden Eintrag Erzeugung eines Aktion-Eintrags in die Listenansicht
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
function coachBearbeiten(index) {
    console.log("Funktion CoachBearbeiten mit " + index);

    //Lesen der Benutzereingaben
    var empfaenger = $("#eingabeEmpfaenger").val();
    var betrag = $("#eingabeBetrag").val();
    var quittung = $("#eingabeQuittung").val();
    var anrede = $("#eingabeAnrede").val();
    var titel = $("#eingabeTitel").val();
    var vorname = $("#eingabeVorname").val();
    var nachname = $("#eingabeNachname").val();
    var firma = $("#eingabeFirma").val();
    var firmenzusatz = $("#eingabeFirmenzusatz").val();
    var email = $("#eingabeEmail").val();
    var strasse = $("#eingabeStrasse").val();
    var hausnummer = $("#eingabeHausnummer").val();
    var plz = $("#eingabePlz").val();
    var ort = $("#eingabeOrt").val();
    var land = $("#eingabeLand").val();
    var zahlungsmethode = $("#eingabeZahlungsmethode").val();
    var coach = new Coach ("",empfaenger, betrag, quittung, anrede, titel, vorname, nachname, firma, firmenzusatz, email, strasse, hausnummer, plz, ort, land, zahlungsmethode);

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
        var route = "/coaches/";
        var daten= "coach";
        var identifikation = arrCoaches[index].id;
        //AENDERN
        console.log("\t Ã¤ndern mit " + index);

        // PUT-Request (jquery-extensions.js einbinden!)
        $.put(route + identifikation, daten, function(res) {
            console.log("Callbackfunktion des put-Requests (Ã¤ndern): \n"
                + JSON.stringify(res).toString());
            arrCoaches=res;

            coachesAnzeigen('coaches');
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
    $.delete("/coach/"+ arrCoaches[index].id, function(res) {
        console.log("Callbackfunktion des delete-Requests (lÃ¶schen): \n" + JSON.stringify(res).toString());
        arrCoaches=res;

        coachesAnzeigen('coaches');
    })
        .fail(function(xhr){
            console.log("/t Aufruf von delete.fail-Funktion mit Parameter err=" + xhr.responseText);
            errorAlert(xhr.responseText);
        });


}
