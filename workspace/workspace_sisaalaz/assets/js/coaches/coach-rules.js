/** Hier wird die Dialogbox in der Sicherheitsabfrage erstellt / Text der Dialogbox ist integriert***/
function zeigeSicherheitsabfrage(index) {

    $(function() {
        $("<div title ='Sicherheitsabfrage'> <p> <img class='alertbild' src='pics/aktion/907px-Simple_Alert.svg.png' /> </br> Sind Sie Sicher, dass Sie die Aktion mit dem Namen <span id='abfragename'>" + arrAktionen[index].aktionsname + " </span> wirklich lÃ¶schen wollen?</p> </div>").dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
                "LÃ¶schen": function() {
                    $(this).dialog("close");
                    coachLoeschen(index);
                    coachAnzeigen('coaches');


                },
                abbrechen: function() {
                    $(this).dialog("close");
                }
            }
        });
    });


}


/********************PrÃ¼fen ob Eingaben valide sind*******************/
function save() {
    if ($("#eingabe").valid()) {
        console.log("\t Eingabe ist gÃ¼ltig");





    } else {
        /********************Dialogbox wenn Eingaben nicht valide sind*******************/
        $(function() {
            $("<div title ='Eingabe fehlgeschlagen'> <p> <img class='alertbild' src='pics/aktion/907px-Simple_Alert.svg.png' /> </br> Ihre Eingaben sind nicht valide! Bitte tragen Sie an den gewÃ¼nschten Stellen Informationen ein. </p> </div>").dialog({
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
this.plz = plz;
function myRules() {
    console.log("Aufruf von Funktion myRules()");

    // das Inputfeld mit dem Namen Aktionsname wird selektiert */
    $("input[name='choachname']").rules("add", {

        required: true, // das Feld Muss ausgefÃ¼llt werden

        minlength: 2,

        // Fehlermeldungen bei Nichteinhalten der Regeln

        messages: {
            required: 'Bitte geben Sie einen vollstÃ¤ndingen Namen ein.',

            minlength: 'Bitte geben Sie einen vollstÃ¤ndigen Namen (mind. 2 Zeichen) ein.',
        }


    });




    $("input[name='datum']").rules("add", {

        required: true, // Das Feld muss ausgefÃ¼llt sein


        messages: {
            required: 'Bitte geben Sie das Datum ein.',


        }


    });




    $("input[name='veranstalter']").rules("add", {

        required: true, // Das Feld muss ausgefÃ¼llt sein
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







/*        /********************PrÃ¼fen ob LOGIN valide ist *******************/
function savelogin() {
    if ($("#validateForm").valid()) {
        console.log("\t Eingabe ist gÃ¼ltig");





    } else {

        /* Dialogbox wird angezeigt wenn die Logindaten falsch sind */
        console.log("\t Eingabe ist nicht valide");



    }
}

function myRuleslogin() {
    console.log("Aufruf von Funktion myRuleslogin()");

    // das Inputfeld mit dem Namen Aktionsname wird selektiert */
    $("input[name='benutzernameEingeben']").rules("add", {

        required: true, // das Feld Muss ausgefÃ¼llt werden

        minlength: 2,

        // Fehlermeldungen bei Nichteinhalten der Regeln

        messages: {
            required: 'Sie mÃ¼ssen ein Benutzernamen eingeben.',

            minlength: 'Bitte geben Sie ein Benutzername mit mind. 8 Zeichen ein.',
        }


    });

    $("input[name='passwortEingeben']").rules("add", {

        required: true, // Das Feld muss ausgefÃ¼llt sein
        minlength: 2,

        messages: {
            required: 'Sie mÃ¼ssen ein Passwort eingeben',

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
