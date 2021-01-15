(function ($) {

    $(document).ready(function () {

        var views = {
            _views: [
                $('#indexView'),
                $('#loginView'),
                $('#anmeldungView'),
                $('#coachListeView'),
                $('#coachBearbeitenView'),
            ],
            current: null,
            show: function (viewName = 'indexView') {
                this._views.map(function (view) {
                    if ($(view).attr('id') === viewName) {
                        $(view).removeClass('view-hidden');
                    } else {
                        $(view).addClass('view-hidden');
                    }
                });

                /*if (this.$_views.hasOwnProperty(viewName)) {
                    this.$current = this.$_views[viewName];
                } else {
                    console.error('Error', 'view' + viewName + ' does not exist, switching to index');
                    this.$current = this.$_views.index;
                }*/

                /*console.log();*/
            }
        };

        views.show('loginView');

        $('#logKnopf').click(function () {


        });

    });

})(jQuery);
