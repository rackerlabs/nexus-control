var $ = require('jquery');
window.$ = window.jQuery = $;

var angular = require('angular');
var markalytics = require('markalytics');

angular.module('carina', [
  require('angular-cookies'),
  require('./beta-alert/beta-alert'),
  require('./docs/docs-list'),
  require('./signup/signup'),
]);

angular.bootstrap(document, ['carina']);
