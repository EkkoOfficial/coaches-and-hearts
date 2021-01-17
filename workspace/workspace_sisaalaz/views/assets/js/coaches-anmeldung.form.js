(function ($) {
    $(document).ready(function () {

        function renderAnmeldenForm() {
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
                    options: ['Ja', 'Nein']
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
                    value: null,
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
                    label: 'Anmelden',
                    required: false,
                    className: '',
                    value: null
                },
            ]

            var $form = $('#anmeldungForm');

            $.each(formular, function (index, formField) {

                var $labelTag = $(document.createElement('label'));
                    $labelTag.text(formField.label + ':');
                    $labelTag.attr('for',  'anmeldenForm-' + formField.name);

                switch (formField.type) {
                    case 'submit':
                        var $inputTag = $(document.createElement('button'));
                        $inputTag.text(formField.label);
                        $inputTag.addClass('btn-blue');
                        $form.append($inputTag);
                        break;
                    case 'select':
                        var $inputTag = $(document.createElement('select'));
                        $inputTag.addClass('formInput');

                        var $opt = $(document.createElement('option'));
                        $opt.attr('selected', 'selected');
                        $opt.attr('disabled', 'disabled');
                        $opt.text('wählen');
                        $inputTag.append($opt);
                        formField.options.forEach(function (option) {
                            var $opt = $(document.createElement('option'));
                            $opt.attr('value', option);
                            $opt.text(option);
                            $inputTag.append($opt);
                        });
                        $form.append($labelTag);
                        $form.append($inputTag);
                        break;
                    case 'radio':
                    formField.options.forEach(function (option, index){
                        $labelTag = $(document.createElement('label'));
                        $labelTag.attr('for', 'anmeldenForm-' + formField.name + index);
                        $labelTag.text(option);

                        var $inputTag = $(document.createElement('input'));
                        $inputTag.attr('id', 'anmeldenForm-' + formField.name + index);
                        $inputTag.attr('name', formField.name);
                        $inputTag.attr('type', formField.type);
                        $form.append($labelTag);
                        $form.append($inputTag);
                    });
                        break;
                    default:
                        var $inputTag = $(document.createElement('input'));
                        $form.append($labelTag);
                        $inputTag.addClass('formInput');
                        $inputTag.attr('placeholder', formField.label + ' eingeben');
                        $inputTag.attr('id', 'anmeldenForm-' + formField.name);
                        $inputTag.attr('type', formField.type);
                        $inputTag.attr('required', formField.required);
                        $form.append($inputTag);
                }

            });


            /*        $.post('', formular, succes, error); */
        }

        renderAnmeldenForm();
    });
})(jQuery)
