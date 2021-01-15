(function ($) {
    $(document).ready(function () {


      function renderAnmeldenForm(){
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
            value: null
            options: ['GbR','KG', 'e.V', 'AG', 'GmbH', 'gGmbH', 'GmbH & Co. KG', 'KGaA', 'andere']
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
            required: false,
            className: '',
            value: null
          },
        ]

        var html = '';

        $.each(formular, function (index, formFiled) {



          var tag = '<input type="' + formField.type + '" name="' + formFiled.name + '" class="' + formFiled.streetclassName + '" required="' + formFiled.requ + '" ></input>';


        })

        fomr.submit =>

        formArray.forEach(function (value) {

        })

        $.post('', formArray, succes, error)
      }
    });
})(jQuery)
