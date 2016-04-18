module.exports = [
    'addScrollIndicators',
    function (input) {
        var cheerio = require('cheerio');

        var $ = cheerio.load(input);
        $('li').each(function () {
            $(this).attr('data-drc-scroll-indicator', $('a', this).attr('href').replace('#',''));
            $(this).attr('data-use-attribute', 'id');
        });

        return $.html();
    },
    false
];
