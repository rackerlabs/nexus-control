
var $ = require('jquery');
var _ = require('lodash');

var options = ['note', 'note:', 'warning', 'warning:', 'important', 'important:', 'tip', 'tip:'];

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

    if (type.search(/^note/) != -1) {
      $(para).addClass('callout-note');
    } else if (type.search(/^warning/) != -1) {
      $(para).addClass('callout-warning');
    } else if (type.search(/^important/) != -1) {
      $(para).addClass('callout-important');
    } else if (type.search(/^tip/) != -1) {
      $(para).addClass('callout-tip');
    }
  });
};

module.exports = setup;
