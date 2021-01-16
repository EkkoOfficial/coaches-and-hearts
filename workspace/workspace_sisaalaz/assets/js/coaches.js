var env = window.env = {
    apiUrl: 'http://localhost:8080/api'
};

(function ($) {

    $(document).ready(function () {
        /**
         * view management
         */
        var views = {
            _views: [
                $('#indexView'),
                $('#loginView'),
                $('#anmeldungView'),
                $('#coachesListeView'),
                $('#coachBearbeitenView'),
            ],
            current: null,
            show: function (viewName) {
                this._views.map(function (view, index, arr) {
                    if (!view.length) {
                        console.error('view selector error at index:' + index, arr[index]);
                    }
                    if ($(view).attr('id') === viewName) {
                        this.current = $(view);
                        this.current.removeClass('view-hidden');
                    } else {
                        $(view).addClass('view-hidden');
                    }
                });
                window.sessionStorage.setItem('view', viewName);
            },
            init: function () {
                if (window.sessionStorage.getItem('view')) {
                    views.show(window.sessionStorage.getItem('view'));
                } else {
                    views.show('indexView');
                }
            }
        };
        views.init();

        $('#logKnopf').click(function () {
            views.show('loginView');
        });

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

            var url = env.apiUrl + '/auth/login';

            $.post(url, postData)
                .done(function (response) {
                    console.log(response);

                })
                .fail(function (error) {
                    console.log(error);
                });

        });

    });

})(jQuery);
