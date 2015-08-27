module.exports = [
    'removeAnchors',
    function (input) {
        var cheerio = require('../lib/cheerio');
        var $ = cheerio.load(input);

        $('a').each(function () {
            if($(this).attr('href').indexOf('#') !== -1) {
                $(this).closest('li').remove();
            }
        });

        $('ul').each(function () {
            if($(this).html().trim() === '') {
                $(this).remove();
            }
        });

        return $.html();
    },
    false
];
