var angular = require('angular');

var moduleName = 'src.search';

module.exports = moduleName;

angular.module(moduleName, [
  require('./components/search-box'),
  require('./components/search-paginator'),
  require('./components/search-results'),
  require('./services/search')
]);
