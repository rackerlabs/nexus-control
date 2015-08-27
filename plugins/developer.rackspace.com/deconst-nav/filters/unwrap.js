module.exports = [
    'unwrap',
    function (input, selector) {
        selector = selector || 'div';
        var cheerio = require('../lib/cheerio');
        var $ = cheerio.load(input);

        return $(selector).html().toString();
    },
    false
];
