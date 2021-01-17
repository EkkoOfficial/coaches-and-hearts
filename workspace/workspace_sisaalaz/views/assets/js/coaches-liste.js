(function ($) {
    function renderCoachesListe() {

        var coachesListe = [
            {
                empfaenger: '',
                betrag: '',
                quittung: '',
                anrede: '',
                titel: '',
                vorname: '',
                nachname: '',
                firma: '',
                firmenzusatz: '',
                email: '',
                strasse: '',
                hausnummer: '',
                plz: '',
                ort: '',
                land: '',
                zahlungsmethode: ''
            }
        ]


        /*


                    coach = {
                        vorname: ''
                    }

                    tableColumns.forEach(col => {
                        '<td>' + coach[col.data] + '</td>'
                    })

                });
        */
    }

    renderCoachesListe();

    $('#coachesListeView').on('show', function (event) {
        console.log(event);
        var url = env.apiUrl + '/coaches';
        $.get(url)
            .done(function (response) {
                console.log(response);
            })
            .fail(function (error) {
                console.log(error);
            })

    });
})(jQuery)
