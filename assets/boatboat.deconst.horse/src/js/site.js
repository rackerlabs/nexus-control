var $ = require('jquery');
window.$ = window.jQuery = $;

var angular = require('angular');

angular.module('carina', [
  require('./signup/signup')
]);

angular.bootstrap(document, ['carina']);
