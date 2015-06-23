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
            if(this.getAttribute('href').indexOf('#') !== -1) {
                $(this).closest('li').remove();
            }
        });

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

        $('.narrow-sidebar .sidebar').on('mouseenter mouseleave', 'a', function (e) {
            if(e.type === 'mouseleave') {
                if(!e.toElement || e.toElement.classList.contains('sidebar-link-tooltip') === false) {
                    $('.sidebar-link-tooltip').remove();
                    return;
                }
            }

            if(this.scrollWidth <= $(this).outerWidth()) {
                return;
            }

            var tooltip = document.createElement('a');
            tooltip.className = 'sidebar-link-tooltip';
            tooltip.href = this.href;
            tooltip.textContent = this.textContent;

            $(tooltip).css({
                position: 'fixed',
                top: this.getBoundingClientRect().top,
                left: this.getBoundingClientRect().left
            });

            $(tooltip).on('mouseleave', function () {
                $(tooltip).remove();
            });

            document.body.appendChild(tooltip);
        });

        $(window).on('scroll', function () {
            $('.sidebar-link-tooltip').remove();
        });
    });

})(window, document, jQuery);
