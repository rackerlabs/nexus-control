
var $ = require('jquery');
var _ = require('lodash');

var options = ['note', 'warning'];

function setup() {
  // grab all of the candidate admonishments
  var elements = document.getElementsByTagName('p');

  var candidates = _.select(elements, function (para) {
    var isValid = true;
    isValid = (isValid && para.firstChild !== null);
    isValid = (isValid && para.firstChild.nodeName.toLowerCase() === 'strong');
    isValid = (isValid && _.includes(options, para.firstChild.textContent.toLowerCase()));
    return isValid;
  });

  _.each(candidates, function (para) {
    var type = para.firstChild.textContent.toLowerCase();

    if (type === 'note') {
      $(para).addClass('information');
    } else if (type === 'warning') {
      $(para).addClass('admonition');
    }
  });
};

module.exports = setup;
