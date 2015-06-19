(function (window, document, $) {
    var matchHeight = function () {
        var windowheight = $(window).innerHeight();
        var headerHeight = $('#header').outerHeight();
        var footerHeight = $('.basement').outerHeight();
        var titleHeight = $('.title-header').outerHeight();

        var minHeight = windowheight - headerHeight - footerHeight - titleHeight;

        $('.narrow-sidebar .main').get(0).style.minHeight = minHeight + 'px';

        setTimeout(function () {
            $('.narrow-sidebar .sidebar').css({
                height: $('.narrow-sidebar .main').outerHeight()
            });
        }, 1);


    };

    $(document).ready(function () {
        if($('.narrow-sidebar .main').length === 0) {
            return;
        }

        matchHeight();

        $('.narrow-sidebar .sidebar a').each(function () {
            if(this.getAttribute('href') === window.location.pathname + window.location.hash) {
                var link = this;

                link.classList.add('active');

                setTimeout(function () {
                    $('.narrow-sidebar .sidebar').get(0).scrollTop = $(link).position().top - 100;
                }, 100);
            }
        });

        $(window).on('resize', matchHeight);
    });

})(window, document, jQuery);
