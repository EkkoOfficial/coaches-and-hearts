(function ($) {
    $(document).ready(function () {

        function renderCoachesListe() {

            var coachesListe = [
                {
                    empfaenger: 'test-empfaenger',
                    betrag: 'test-betrag',
                    quittung: 'test-quittung',
                    anrede: 'test-anrede',
                    titel: 'test-titel',
                    vorname: 'test-vorname',
                    nachname: 'test-nachname',
                    firma: 'test-firma',
                    firmenzusatz: 'test-firmenzusatz',
                    email: 'test-email',
                    strasse: 'test-strasse',
                    hausnummer: 'test-hausnummer',
                    plz: 'test-plz',
                    ort: 'test-ort',
                    land: 'test-land',
                    zahlungsmethode: 'test-zahlungsmethode'
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
    });
})(jQuery)
