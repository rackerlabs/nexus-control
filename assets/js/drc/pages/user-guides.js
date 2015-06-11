(function (window, document, $) {
    $('.narrow-sidebar .toctree-wrapper').each(function () {
        var sidebar = $('.narrow-sidebar .side');
        $(this).appendTo(sidebar);
    });
})(window, document, jQuery);
