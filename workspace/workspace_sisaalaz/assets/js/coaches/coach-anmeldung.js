    //Aufbau einer Anmeldung
    function coach(empfaenger ,betrag, quittung, anrede, titel, vorname, nachname, firma, firmenzusatz, email, strasse, hausnummer, plz, ort, land, zahlungsmethode) {
    console.log("Funktion Aktion mit " +id+ empfaenger + betrag + quittung + anrede + titel + vorname + nachname + firma + firmenzusatz + email + strasse + hausnummer + plz + ort + land + zahlungsmethode)
    this.id ="";
    this.empfaenger = empfaenger;
    this.betrag = betrag;
    this.quittung = quittung;
    this.anrede = anrede;
    this.titel = titel;
    this.vorname = vorname;
    this.nachname = nachname;
    this.firma = firma;
    this.firmenzusatz = firmenzusatz;
    this.email = email;
    this.strasse = strasse;
    this.plz = plz;
    this.hausnummer = hausnummer;
    this.plz = plz;
    this.ort = ort;
    this.land = land;
    this.zahlungsmethode = zahlungsmethode;



    }

    //Dieses Array dient der Speicherung aller Aktionen

    var arrCoaches = new Array();

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


            // verschiedene Ãœberschriften werden angezeigt mit show und hide
            $("#CoachAnlegenUeberschrift").show();
            $("#CoachAnlegenUeberschrift").hide();

            //Eingabemaske initialisieren
            $("#eingabe input").val("");
            $("#eingabeAktionsinfo").val("");
            $("#eingabe input[type='submit']").val("Speichern");
            $("#eingabe").attr("action", "javascript:coachBearbeiten('')");
        } else {
            console.log("\ t Ã¤ndern");

            // verschiedene Ãœberschriften werden angezeigt mit show und hide
            $("#CoachAnlegenUeberschrift").hide();
            $("#CoachAnlegenUeberschrift").show();
            //Eingabemaske initialisieren
            $("#eingabe input").val("");
            $("#eingabe input[type='submit']").val("Speichern");
            $(".CoachAnlegenUeberschrift").append(" <b>bearbeiten</b>");

            //Daten in die Eingabemaske eintragen
            $("#eingabeEmpfaenger").val(arrCoaches[index].empfaenger);
            $("#eingabeBetrag").val(arrCoaches[index].betrag);
            $("#eingabeQuittung").val(arrCoaches[index].quittung);
            $("#eingabeAnrede").val(arrCoaches[index].anrede);
            $("#eingabeTitel").val(arrCoaches[index].titel);
            $("#eingabeVorname").val(arrCoaches[index].vorname);
            $("#eingabeFirma").val(arrCoaches[index].firma);
            $("#eingabeFirmenzusatz").val(arrCoaches[index].firmenzusatz);
            $("#eingabeEmail").val(arrCoaches[index].email);
            $("#eingabeStrasse").val(arrCoaches[index].strasse);
            $("#eingabePlz").val(arrCoaches[index].plz);
            $("#eingabeOrt").val(arrCoaches[index].ort);
            $("#eingabeLand").val(arrCoaches[index].land);
            $("#eingabeZahlungsmethode").val(arrCoaches[index].zahlungsmethode);


            $("#eingabe").attr("action", "javascript:coachBearbeiten('" + index + "')");



        }

    }
