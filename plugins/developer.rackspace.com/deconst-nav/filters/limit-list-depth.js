module.exports = [
    'limitListDepth',
    function (input, limit) {
        limit = limit || 2;
        var cheerio = require('../lib/cheerio');
        var $ = cheerio.load(input);
        var selector = [];

        for(var i = 0; i < limit + 1; i++) {
            selector.push('li');
        }

        selector = selector.join(' ');

        $(selector).each(function () {
            $(this).remove();
        });

        return $.html();
    },
    false
];
