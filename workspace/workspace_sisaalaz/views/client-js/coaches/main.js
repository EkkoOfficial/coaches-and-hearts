var env = window.env = {
    apiUrl: 'http://localhost:8080/api'
};

function formArrayToObject(arr) {
    var obj = {};
    arr.forEach(function (field) {
        obj[field.name] = field.value;
    });
    return obj;
}

(function ($) {

    var api = {

        _request: {

            _get: function (url, extraOptions) {
                return this._ajax('GET', url, null, extraOptions)
            },

            _post: function (url, data, extraOptions = {}) {
                return this._ajax('POST', url, data, extraOptions);
            },

            _delete(url, extraOptions) {
                return this._ajax('DELETE', url, null, extraOptions);
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
            },
            _put(url, data, extraOptions) {
                return this._ajax('PUT', url, data, extraOptions);
            }
        },

        login: function (credentials) {
            return this._request._post(env.apiUrl + '/login', credentials)
                .done(function (response) {
                    if (response.authenticated) {
                        window.user = response.user;
                    } else {
                        window.user = null;
                    }
                })
                .fail(function (error) {
                    alert(error.responseJSON.message);
                });
        },

        logout: function () {
            return this._request._post(env.apiUrl + '/logout')
                .done(function (response) {
                    window.user = null;
                    $('#indexView').trigger('show');
                });
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
            return this._request._delete(env.apiUrl + '/coaches/' + coachId);
        },
        getCoach(coachId) {
            return this._request._get(env.apiUrl + '/coaches/' + coachId);
        },
        updateCoach(coachId, data) {
            return this._request._put(env.apiUrl + '/coaches/' + coachId, data);
        },
        createCoach(data) {
            return this._request._post(env.apiUrl + '/coaches', data);
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
            var postData = formArrayToObject($loginForm.serializeArray());
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

            var $table = $('#coachesListTable').html('');

            var $tr = $('<tr></tr>');

            tableColumns.forEach(function (col) {
                $tr.append($('<th></th>').text(col.label));
            });

            if (window.user.role === 'admin') {
                $tr.append($('<td></td>').text('Aktionen'));
            }

            $table.append($tr);

            if (coaches.length === 0) {

                $table.append(
                    $('<tr></tr>').append(
                        $('<td></td>')
                            .text('keine Einträge vorhanden')
                            .attr('colspan', tableColumns.length)
                    )
                );

            }

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
                        api.deleteCoach(id).done(function (response) {
                            $('#coachesListView').trigger('show');
                        });
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
        if (!api.authenticate()) {
            return;
        }

        function renderCoachesEditForm(coach) {

            var formular = [
                {
                    label: 'Empfänger',
                    name: 'empfaenger',
                    type: 'text',
                    required: false,
                    className: '',
                    value: null
                },
                {
                    label: 'Betrag',
                    name: 'betrag',
                    type: 'text',
                    required: false,
                    className: '',
                    value: null
                },
                {
                    label: 'Soll eine Quittung erstellt werden?',
                    name: 'quittung',
                    type: 'select',
                    required: false,
                    className: '',
                    value: null,
                    options: {
                        'true': 'Ja',
                        'false': 'Nein'
                    }
                },
                {
                    label: 'Anrede',
                    name: 'anrede',
                    type: 'select',
                    required: false,
                    className: '',
                    value: null,
                    options: ['Herr', 'Frau']
                },
                {
                    label: 'Titel',
                    name: 'titel',
                    type: 'text',
                    required: false,
                    className: '',
                    value: null
                },
                {
                    label: 'Vorname',
                    name: 'vorname',
                    type: 'text',
                    required: false,
                    className: '',
                    value: null
                },
                {
                    label: 'Nachname',
                    name: 'nachname',
                    type: 'text',
                    required: false,
                    className: '',
                    value: null
                },
                {
                    label: 'Firma',
                    name: 'firma',
                    type: 'text',
                    required: false,
                    className: '',
                    value: null
                },
                {
                    label: 'Firmenzusatz',
                    name: 'firmenzusatz',
                    type: 'select',
                    required: false,
                    className: '',
                    value: 'GbR',
                    options: ['GbR', 'KG', 'e.V', 'AG', 'GmbH', 'gGmbH', 'GmbH & Co. KG', 'KGaA', 'andere']
                },
                {
                    label: 'Email',
                    name: 'email',
                    type: 'text',
                    required: false,
                    className: '',
                    value: null
                },
                {
                    label: 'Straße',
                    name: 'strasse',
                    type: 'text',
                    required: false,
                    className: '',
                    value: null
                },
                {
                    label: 'Hausnummer',
                    name: 'hausnummer',
                    type: 'text',
                    required: false,
                    className: '',
                    value: null
                },
                {
                    label: 'Postleitzahl',
                    name: 'plz',
                    type: 'text',
                    required: false,
                    className: '',
                    value: null
                },
                {
                    label: 'Ort',
                    name: 'ort',
                    type: 'text',
                    required: false,
                    className: '',
                    value: null
                },
                {
                    label: 'Land',
                    name: 'land',
                    type: 'text',
                    required: false,
                    className: '',
                    value: null
                },
                {
                    label: 'Zahlungsmethode',
                    name: 'zahlungsmethode',
                    type: 'radio',
                    required: false,
                    className: '',
                    value: null,
                    options: ['PayPal', 'Lastschrift', 'Kreditkarte']
                },
                {
                    name: 'anmelden',
                    type: 'submit',
                    label: 'Speichern',
                    required: false,
                    className: '',
                    value: null
                },
            ];

            var $form = $('#coachesEditForm');

            $.each(formular, function (index, formField) {

                var $label, $input, $select, $div;

                $div = $('<div></div>')
                    .attr('class', formField.className)
                    .addClass('formGroup');

                if (formField.type === 'text') {

                    $label = $('<label></label>')
                        .text(formField.label + ':')
                        .attr('for', 'coachEditForm' + formField.name);

                    $input = $('<input/>')
                        .addClass('formInput')
                        .attr('name', formField.name)
                        .attr('placeholder', formField.label + ' eingeben')
                        .attr('id', 'coachEditForm' + formField.name)
                        .attr('type', formField.type)
                        .attr('required', formField.required)
                        .attr('value', coach[formField.name]);

                    $div
                        .append($label)
                        .append($input);
                }

                if (formField.type === 'select') {

                    $label = $('<label></label>')
                        .text(formField.label + ':')
                        .attr('for', 'coachEditForm' + formField.name);

                    $select = $('<select></select>')
                        .addClass('formInput')
                        .attr('id', 'coachEditForm' + formField.name)
                        .attr('name', formField.name)
                        .attr('required', formField.required)
                    ;


                    $.each(formField.options, function (value, name) {
                        $option = $('<option></option>');

                        if (formField.options.length > 0) {
                            value = name;
                        }

                        $option.attr('value', value);
                        $option.text(name);

                        if (value === coach[formField.name]) {
                            $option.attr('selected', 'selected')
                        }

                        $select.append($option);
                    });

                    $div.append($label).append($select);

                }

                if (formField.type === 'submit') {
                    $input = $('<button></button>')
                        .addClass('btn-grey')
                        .text(formField.label);
                    $div.append($input);
                }

                if (formField.type === 'radio') {

                    $.each(formField.options, function (value, name) {

                        if (formField.options.length > 0) {
                            value = name;
                        }

                        $label = $('<label></label>')
                            .attr('for', 'coachEditForm' + formField.name + value)
                            .text(name);

                        $input = $('<input />')
                            .attr('id', 'coachEditForm' + formField.name + value)
                            .attr('name', formField.name)
                            .attr('type', formField.type)
                            .attr('value', coach[formField.name]);

                        if (value === coach[formField.name]) {
                            $input.attr('selected', 'selected');
                        }

                        $div.append($label).append($input);
                    });
                }


                $form.append($div);
            });

            $form.submit(function (e) {
                e.preventDefault();
                var data = formArrayToObject($form.serializeArray());
                api.updateCoach(coach.id, data).done(function (response) {
                    $('#coachesListView').trigger('show');
                });
            });

        }


        api.getCoach(data.coachId).done(function (response) {
            renderCoachesEditForm(response);
        });

    })

    /**
     * indeView
     */
    $('#indexView').on('show', function () {

        $('#indexViewAnmeldenButton').click(function () {
            $('#coachesAnmeldungView').trigger('show');
        });

    });

    /**
     * coachesAnemldenView
     */
    $('#coachesAnmeldungView').on('show', function () {

        function renderCoachesAnmeldungForm() {

            var formular = [
                {
                    label: 'Empfänger',
                    name: 'empfaenger',
                    type: 'text',
                    required: false,
                    className: '',
                    value: null
                },
                {
                    label: 'Betrag',
                    name: 'betrag',
                    type: 'text',
                    required: false,
                    className: '',
                    value: null
                },
                {
                    label: 'Soll eine Quittung erstellt werden?',
                    name: 'quittung',
                    type: 'select',
                    required: false,
                    className: '',
                    value: null,
                    options: {
                        'true': 'Ja',
                        'false': 'Nein'
                    }
                },
                {
                    label: 'Anrede',
                    name: 'anrede',
                    type: 'select',
                    required: false,
                    className: '',
                    value: null,
                    options: ['Herr', 'Frau']
                },
                {
                    label: 'Titel',
                    name: 'titel',
                    type: 'text',
                    required: false,
                    className: '',
                    value: null
                },
                {
                    label: 'Vorname',
                    name: 'vorname',
                    type: 'text',
                    required: false,
                    className: '',
                    value: null
                },
                {
                    label: 'Nachname',
                    name: 'nachname',
                    type: 'text',
                    required: false,
                    className: '',
                    value: null
                },
                {
                    label: 'Firma',
                    name: 'firma',
                    type: 'text',
                    required: false,
                    className: '',
                    value: null
                },
                {
                    label: 'Firmenzusatz',
                    name: 'firmenzusatz',
                    type: 'select',
                    required: false,
                    className: '',
                    value: 'GbR',
                    options: ['GbR', 'KG', 'e.V', 'AG', 'GmbH', 'gGmbH', 'GmbH & Co. KG', 'KGaA', 'andere']
                },
                {
                    label: 'Email',
                    name: 'email',
                    type: 'text',
                    required: false,
                    className: '',
                    value: null
                },
                {
                    label: 'Straße',
                    name: 'strasse',
                    type: 'text',
                    required: false,
                    className: '',
                    value: null
                },
                {
                    label: 'Hausnummer',
                    name: 'hausnummer',
                    type: 'text',
                    required: false,
                    className: '',
                    value: null
                },
                {
                    label: 'Postleitzahl',
                    name: 'plz',
                    type: 'text',
                    required: false,
                    className: '',
                    value: null
                },
                {
                    label: 'Ort',
                    name: 'ort',
                    type: 'text',
                    required: false,
                    className: '',
                    value: null
                },
                {
                    label: 'Land',
                    name: 'land',
                    type: 'text',
                    required: false,
                    className: '',
                    value: null
                },
                {
                    label: 'Zahlungsmethode',
                    name: 'zahlungsmethode',
                    type: 'radio',
                    required: false,
                    className: '',
                    value: null,
                    options: ['PayPal', 'Lastschrift', 'Kreditkarte']
                },
                {
                    name: 'anmelden',
                    type: 'submit',
                    label: 'Speichern',
                    required: false,
                    className: '',
                    value: null
                },
            ];

            var $form = $('#coachesAnmeldungForm');

            $.each(formular, function (index, formField) {

                var $label, $input, $select, $div;

                $div = $('<div></div>')
                    .attr('class', formField.className)
                    .addClass('formGroup');

                if (formField.type === 'text') {

                    $label = $('<label></label>')
                        .text(formField.label + ':')
                        .attr('for', 'coachAnmeldungForm' + formField.name);

                    $input = $('<input/>')
                        .addClass('formInput')
                        .attr('name', formField.name)
                        .attr('placeholder', formField.label + ' eingeben')
                        .attr('id', 'coachAnmeldungForm' + formField.name)
                        .attr('type', formField.type)
                        .attr('required', formField.required);

                    $div
                        .append($label)
                        .append($input);
                }

                if (formField.type === 'select') {

                    $label = $('<label></label>')
                        .text(formField.label + ':')
                        .attr('for', 'coachAnmeldungForm' + formField.name);

                    $select = $('<select></select>')
                        .addClass('formInput')
                        .attr('id', 'coachAnmeldungForm' + formField.name)
                        .attr('name', formField.name)
                        .attr('required', formField.required)
                    ;


                    $.each(formField.options, function (value, name) {
                        $option = $('<option></option>');

                        if (formField.options.length > 0) {
                            value = name;
                        }

                        $option.attr('value', value);
                        $option.text(name);


                        $select.append($option);
                    });

                    $div.append($label).append($select);

                }

                if (formField.type === 'submit') {
                    $input = $('<button></button>')
                        .addClass('btn-grey')
                        .text(formField.label);
                    $div.append($input);
                }

                if (formField.type === 'radio') {

                    $.each(formField.options, function (value, name) {

                        if (formField.options.length > 0) {
                            value = name;
                        }

                        $label = $('<label></label>')
                            .attr('for', 'coachAnmeldungForm' + formField.name + value)
                            .text(name);

                        $input = $('<input />')
                            .attr('id', 'coachAnmeldungForm' + formField.name + value)
                            .attr('name', formField.name)
                            .attr('type', formField.type);


                        $div.append($label).append($input);
                    });
                }


                $form.append($div);
            });

            $form.submit(function (e) {
                e.preventDefault();
                var data = formArrayToObject($form.serializeArray());
                api.createCoach(data).done(function (response) {
                    $('#indexView').trigger('show');
                });
            });
        }

        renderCoachesAnmeldungForm();
    });

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
            renderLogKnopf();
        });

        $('#indexView').trigger('show');

        function renderLogKnopf() {

            $('#logKnopf').click(function () {
                if (!window.user) {
                    $('#loginView').trigger('show');
                } else {
                    api.logout();

                }
            });

            if (!window.user) {
                $('#logKnopf').text('Einloggen');
            } else {
                $('#logKnopf').text('Ausloggen');
            }
        }

    });

})(jQuery);
