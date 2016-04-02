var angular = require('angular');
var fs = require('fs');
var _ = require('lodash');

var moduleName = 'drc.components.search-paginator';
module.exports = moduleName;

angular.module(moduleName, [])
.controller('SearchPaginatorCtrl', ['$scope', 'SearchService', function ($scope, SearchService) {
  this.range = [];

  var query = {};
  var results = {};

  var updateRange = function () {
    var range = _.range(query.pageNumber - 10, query.pageNumber + 10);
    range = _.filter(range, function (item) {
      return item > 0;
    });

    console.log(range);

    this.range = range;
  }.bind(this);

  SearchService.on('queryChange', function (newQuery) {
    query = newQuery;
    updateRange();
  });

  SearchService.on('results', function (newResults) {
    results = newResults;
    updateRange();
  });
}])
.directive('drcSearchPaginator', [function () {
  return {
    restrict: 'A',
    scope: {},
    controller: 'SearchPaginatorCtrl',
    controllerAs: 'paginator',
    template: fs.readFileSync(__dirname + '/search-paginator.html', 'utf8')
  };
}]);
