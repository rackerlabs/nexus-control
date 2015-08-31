module.exports = [
    'pruneRoot',
    function (input, depth) {
        depth = depth || 1;
        var cheerio = require('cheerio');
        var $ = cheerio.load(input);

        var listBase = $('ol:not(li > ol), ul:not(li > ul)');
        var newBase = $('<ul></ul>');
        newBase.html($(listBase).find(' > li > ul').html());

        return newBase.toString();
    },
    false
];
