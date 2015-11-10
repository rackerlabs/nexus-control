var $ = require('jquery');
window.$ = window.jQuery = $;

var angular = require('angular');
var markalytics = require('markalytics');

angular.module('carina', [
  require('angular-cookies'),
  require('./beta-alert/beta-alert'),
  require('./docs/docs-list'),
  require('./signup/signup'),
])
.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}]);

angular.bootstrap(document, ['carina']);
