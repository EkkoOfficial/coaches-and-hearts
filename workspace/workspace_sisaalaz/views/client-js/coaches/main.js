var env = window.env = {
    apiUrl: 'http://localhost:8080/api'
};

(function ($) {

    var api = {

        _request: {

            _get: function (url, extraOptions) {
                return this._ajax('GET', url, null, extraOptions)
            },

            _post: function (url, data, extraOptions = {}) {
                return this._ajax('POST', url, data, extraOptions);
            },

            _ajax: function (method, url, data, extraOptions) {

                var options = Object.assign({
                    method: method,
                    data: data,
                    dataType: 'json'
                }, extraOptions);

                return $.ajax(url, options)
                    .fail(function (error) {
                        console.log(error);
                    })
            }

        },

        login: function (credentials) {
            return this._request._post(env.apiUrl + '/login', credentials);
        },

        authenticate: function () {
            var request = this._request._get(env.apiUrl + '/auth', {async: false})
                .done(function (response) {
                    if (response.authenticated) {
                        window.user = response.user;
                    } else {
                        throw Error('Unauthorized');
                    }
                }).fail(function (error) {
                    console.log(error);
                    window.user = null;
                    $('#loginView').show();
                });

            return request.responseJSON.authenticated || false;
        },

        getCoaches: function () {
            return this._request._get(env.apiUrl + '/coaches');
        },
        deleteCoach(coachId) {

        },
        getCoach(coachId) {
            return this._request._get(env.apiUrl + '/coaches/' + coachId);
        }
    }

    /**
     * loginView
     */
    $('#loginView').on('show', function () {

        /**
         * loginForm
         */
        var $loginForm = $('#loginForm');

        $loginForm.submit(function (e) {
            e.preventDefault();
            var postData = {};
            $loginForm.serializeArray().forEach(function (field) {
                postData[field.name] = field.value;
            });

            api.login(postData).done(function (response) {
                console.log(response);
                if (response.authenticated) {
                    window.user = response.user;
                    $('#coachesListView').trigger('show');
                }
            });

        });
    });

    /**
     * coachesListView
     */
    $('#coachesListView').on('show', function () {
        if (!api.authenticate()) {
            return;
        }

        api.getCoaches().done(function (response) {
            renderCoachesList(response);
        })

        function renderCoachesList(coaches) {

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
            ];

            var $table = $('#coachesListTable');

            var $tr = $('<tr></tr>');

            tableColumns.forEach(function (col) {
                $tr.append($('<th></th>').text(col.label));
            });

            if (window.user.role === 'admin') {
                $tr.append($('<td></td>').text('Aktionen'));
            }

            $table.append($tr);

            coaches.forEach(function (coach) {

                $tr = $('<tr></tr>');

                tableColumns.forEach(function (col) {

                    if (col.data === 'zahlungsmethode') {
                        $tr.append($('<td></td>').text(coach[col.data.name]));
                    }

                    $tr.append($('<td></td>').text(coach[col.data]));


                });

                if (window.user.role === 'admin') {

                    var $td = $('<td></td>');

                    var $editButton = $('<button></button>')
                        .addClass('btn-green')
                        .attr('data-id', coach.id)
                        .append(
                            $('<img/>').attr('src', 'pics/icons/edit.png')
                        );

                    $editButton.click(function (e) {
                        var id = $(e.currentTarget).attr('data-id');
                        $('#coachesEditView').trigger('show', {
                            coachId: id
                        });
                    });

                    var $deleteButton = $('<button></button>')
                        .addClass('btn-green')
                        .attr('data-id', coach.id)
                        .append(
                            $('<img/>').attr('src', 'pics/icons/delete.png')
                        );

                    $deleteButton.click(function (e) {
                        var id = $(e.currentTarget).attr('data-id');
                        api.deleteCoach(id);
                    });

                    $td.append($editButton).append($deleteButton);
                    $tr.append($td);
                }

                $table.append($tr);

            });


        }

    });

    /**
     * coachesEditView
     */

    $('#coachesEditView').on('show', function (event, data) {
        console.log(data);
        api.getCoach(data.coachId).done(function (response) {

            console.log(response);

        });

    })


    $(document).ready(function () {
        /**
         * view management
         */

        var $views = $('#viewContent > .view');
        $views.on('show', function (event, data = {}) {

            console.log(event.currentTarget.id);

            $views.addClass('hidden');
            $(event.currentTarget).removeClass('hidden');

            data.view = event.currentTarget.id;
            window.history.replaceState(data, event.currentTarget.id, window.location.url);
        });

        $('#indexView').trigger('show');

        $('#logKnopf').click(function () {
            $('#loginView').trigger('show');
        });

    });

})(jQuery);
