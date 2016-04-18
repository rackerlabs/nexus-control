module.exports = [
    'collapseSections',
    function (input) {
        var cheerio = require('cheerio');
        var $ = cheerio.load(input);

        var mainToctree = $('.toctree-wrapper').first();

        mainToctree.children('.section').each(function (index, element) {
          $(element).addClass('collapsible-section');
          $(element).children('h1,h2,h3').first().addClass('collapsible-section-title');

          if(index === 0) {
            $(element).addClass('open');
          }
        });

        return $.html();
    },
    false
];
