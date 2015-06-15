(function (window, document, $) {
    var matchHeight = function (objects) {
        var tallest = 0;
        for(var i = 0; i < objects.length; i++) {
            tallest = Math.max(objects[i].getBoundingClientRect().height, tallest);
        }

        $(objects).css({minHeight: tallest + 'px'});
    };

    $('.narrow-sidebar .toctree-wrapper').each(function () {
        var sidebar = $('.narrow-sidebar .sidebar');
        $(this).appendTo(sidebar);
    });


    $(document).ready(
        matchHeight($('.narrow-sidebar .sidebar, .narrow-sidebar .main'))
    );

    $(window).on('resize', matchHeight($('.narrow-sidebar .sidebar, .narrow-sidebar .main')));


})(window, document, jQuery);
