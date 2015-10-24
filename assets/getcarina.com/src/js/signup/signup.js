var angular = require('angular');

var moduleName = 'carina.signup';
module.exports = moduleName;

angular.module(moduleName, [
  require('./signup-form')
]);
