
// ********* FUNKTIONEN ZUM LOGIN UND LOGOUT **********
function checkeBerechtigungen() {
    console.log("Funktion checkeBerechtigungen")
    //Alle KnÃ¶pfe auf unsichtbar setzen
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

                /*** Teammitglied und aushilfe wurden als Rollen hinzugefÃ¼gt **/
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

        //Falls User eingeloggt ist, dann werden Sichtbarkeiten in AbhÃ¤ngigkeit von den Rollen gesetzt
        if (data === true) {
            //Benutzer ist eingeloggt
            console.log("\t eingeloggt");
            setLoginButton("ausloggen");
            //Berechtigungen werden erfragt und bei erfolgreichem Lesen wird whatToDo ausgefÃ¼hrt
            $.get("/service_rollenAbfrage", function(roles){
                func(roles);
            })}
        else {
            //Benutzer ist nicht eingeloggt
            console.log("\t nicht eingeloggt");
            setLogoutButton("zeigeLoginmaske");


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
        coachesAnzeigen("coaches");
    })
        .fail(function(xhr){
            console.log("\t GET: logout failure");
            //xhr steht fÃ¼r XML-HTTP-Request, also das HTTP-Objekt
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
