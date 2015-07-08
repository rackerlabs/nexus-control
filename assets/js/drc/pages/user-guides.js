(function (window, document, $) {
    var matchHeight = function () {
        if($(window).innerWidth() < 768) {
            $('.narrow-sidebar .main').css({
                minHeight: ''
            });

            $('.narrow-sidebar .sidebar').css({
                height: ''
            });

            return;
        }

        var windowheight = $(window).innerHeight();
        var headerHeight = $('#header').outerHeight();
        var footerHeight = $('.basement').outerHeight();
        var titleHeight = $('.title-header').outerHeight();

        var minHeight = windowheight - headerHeight - footerHeight - titleHeight;

        $('.narrow-sidebar .main').get(0).style.minHeight = minHeight + 'px';

        setTimeout(function () {
            $('.narrow-sidebar .sidebar').css({
                height: $('.narrow-sidebar .main').outerHeight() + 'px'
            });
        }, 1);


    };

    $(document).ready(function () {
        if($('.narrow-sidebar .main').length === 0) {
            return;
        }

        matchHeight();

        $('#sidebar-toggle').on('click touchend', function (e) {
            e.preventDefault();
            $('body').toggleClass('show-narrow-sidebar');
        });

        $('.narrow-sidebar .sidebar a').each(function () {
            this.title = this.textContent;
            if(this.getAttribute('href').indexOf('#') !== -1) {
                $(this).closest('li').remove();
            }
        });

        $('.narrow-sidebar .sidebar ul').each(function () {
            if($(this).html().trim() === '') {
                $(this).remove();
            }
        });

        $('.narrow-sidebar .sidebar li').each(function () {
            if($(this).find('li').length === 0) {
                return;
            }



            // build a collapsible list
            $(this).addClass('expander');
            var link = $(this).children('a').first();
            var linkHtml = link.html();
            link.html('<span class="expand-toggle fa fa-plus-square-o"></span> ' + linkHtml);
        });

        $('.narrow-sidebar .sidebar a').each(function () {
            if(this.getAttribute('href') === window.location.pathname + window.location.hash) {
                var link = this;

                link.classList.add('active');
                $(this).parents('.expander').addClass('open');

                setTimeout(function () {
                    $('.narrow-sidebar .sidebar').get(0).scrollTop = $(link).position().top - 100;
                }, 100);
            }
        });

        $(document).on('click', '.narrow-sidebar .sidebar .expand-toggle', function (e) {
            e.stopPropagation();
            e.preventDefault();
            $(this).closest('.expander').toggleClass('open');

            matchHeight();
        });

        $(window).on('resize', matchHeight);

    });

})(window, document, jQuery);
