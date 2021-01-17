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


        var tableColumns = [
            {
                label: 'Empfänger',
                data: 'empfaenger'
            },
            {
                label: 'Betrag',
                data: 'betrag'
            },
            {
                label: 'Quittung',
                data: 'quittung'
            },
            {
                label: 'Anrede',
                data: 'anrede'
            },
            {
                label: 'Titel',
                data: 'titel'
            },
            {
                label: 'Vorname',
                data: 'vorname'
            },
            {
                label: 'Nachname',
                data: 'nachname'
            },
            {
                label: 'Firma',
                data: 'firma'
            },
            {
                label: 'Firmenzusatz',
                data: 'firmenzusatz'
            },
            {
                label: 'Email',
                data: 'email'
            },
            {
                label: 'Strasse',
                data: 'strasse'
            },
            {
                label: 'Hausnummer',
                data: 'hausnummer'
            },
            {
                label: 'PLZ',
                data: 'plz'
            },
            {
                label: 'Ort',
                data: 'ort'
            },
            {
                label: 'Vorname',
                data: 'vorname'
            },
            {
                label: 'Nachname',
                data: 'nachname'
            },
            {
                label: 'Land',
                data: 'land'
            },
            {
                label: 'Zahlungsmethode',
                data: 'zahlungsmethode'
            }
        ]

        var html = '';
        html += '<table>' +
            '<thead>' +
            '<tr>';

        tableColumns.forEach(function (col) {
            html += '<th>' + col.label + '</th>';
        });

        html += '</tr>' +
            '</thead>' +
            '<tbody>';

        coachesListe.forEach(function (coach) {
            html += '<tr>'

            tableColumns.forEach(function (col) {
                html += '<td>' + coach[col.data] + '</td>';
            });

            html += '</tr>'
        });

        $('#coachesListeView').html(html);
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
