var env = window.env = {
    apiUrl: 'http://localhost:8080/api'
};

(function ($) {

    $(document).ready(function () {
        /**
         * view management
         */

        var $views = $('#viewContent > .view');
        $views.on('show', function (event) {
            console.info('view', event.target.id);
            $views.each(function (index, view) {
                if (event.target === view) {
                    $(view).removeClass('hidden');
                    $(view).addClass('active');
                    window.sessionStorage.setItem('view', view.id);
                } else {
                    $(view).addClass('hidden');
                    $(view).removeClass('active');
                }
            })
        });

        var storedView = window.sessionStorage.getItem('view');
        if (storedView) {
            $('#' + storedView).trigger('show');
        } else {
            $views.first().trigger('show');
        }

        $('#logKnopf').click(function () {
            $('#loginView').trigger('show');
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
                    if (response.authenticated) {
                        window.sessionStorage.setItem('user', JSON.stringify(response.user));
                        window.user = response.user;
                        $('#coachesListeView').trigger('show');
                    }
                })
                .fail(function (error) {

                });
        });

    });

})(jQuery);
