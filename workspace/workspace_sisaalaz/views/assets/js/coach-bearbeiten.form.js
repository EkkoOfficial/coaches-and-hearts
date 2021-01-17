(function ($) {
    $(document).ready(function () {

        function renderBearbeitenForm(coach) {
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

            var $form = $(document.createElement('form'));

            $.each(formular, function (index, formField) {

                var $divTag = $(document.createElement('div'));
                $divTag.attr('class', formField.className);
                $divTag.addClass('formGroup');

                var $labelTag = $(document.createElement('label'));
                $labelTag.text(formField.label + ':');
                $labelTag.attr('for',  'anmeldenForm-' + formField.name);

                switch (formField.type) {
                    case 'submit':
                        var $inputTag = $(document.createElement('button'));
                        $inputTag.text(formField.label);
                        $inputTag.addClass('btn-grey');
                        $divTag.append($inputTag);
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
                        $divTag.append($labelTag);
                        $divTag.append($inputTag);
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
                            $divTag.append($labelTag);
                            $divTag.append($inputTag);
                        });
                        break;
                    default:
                        var $inputTag = $(document.createElement('input'));
                        $divTag.append($labelTag);
                        $inputTag.addClass('formInput');
                        $inputTag.attr('placeholder', formField.label + ' eingeben');
                        $inputTag.attr('id', 'anmeldenForm-' + formField.name);
                        $inputTag.attr('type', formField.type);
                        $inputTag.attr('required', formField.required);
                        $divTag.append($inputTag);
                }

                $form.append($divTag);
            })

            $('#anmeldungView').append($form);

            /*        $.post('', formular, succes, error); */
        }

        renderBearbeitenForm();
    });
})(jQuery)
