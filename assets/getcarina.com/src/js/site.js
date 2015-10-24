var $ = require('jquery');
window.$ = window.jQuery = $;

var angular = require('angular');

angular.module('carina', [
  require('./signup/signup'),
  require('./docs/docs-list')
]);

angular.bootstrap(document, ['carina']);
