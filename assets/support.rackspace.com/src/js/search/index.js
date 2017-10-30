var angular = require('angular');

var moduleName = 'src.search';

module.exports = moduleName;

angular.module(moduleName, [
  require('./services/search'),
  require('./components/search-box'),
  require('./components/search-paginator'),
  require('./components/search-results')
]);
