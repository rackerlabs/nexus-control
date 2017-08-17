var angular = require('angular');
var fs = require('fs');

var moduleName = 'support.search.components.search-results';
module.exports = moduleName;

angular.module(moduleName, [])
.controller('SearchResultsCtrl', ['$scope', '$timeout', 'SearchService', function ($scope, $timeout, SearchService) {
  this.query = '';
  this.results = {};
  this.searchInProgress = false;

  var noResultsTimer;

  SearchService.on('queryChange', function (query) {
    // Cancel the timeout to show a "no results" message
    if (query.query !== '') {
      $timeout.cancel(noResultsTimer);
    }

    this.query = query.query;
  }.bind(this));

  SearchService.on('results', function (results) {
    // Don't commit an empty search right away, as the user may still be
    // typing. We want to wait until they've stopped typing to confirm that
    // the empty set is what they really wanted to search for. Timeout is
    // cancelled any time the query is updated.
    if (results.results.length === 0) {
      noResultsTimer = $timeout(function () {
        this.results = results;
      }.bind(this), 500);

      return;
    }

    $timeout.cancel(noResultsTimer);
    this.results = results;
  }.bind(this));

  SearchService.on('searchStart', function () {
    this.searchInProgress = true;
  }.bind(this));

  SearchService.on('searchEnd', function () {
    this.searchInProgress = false;
  }.bind(this));
}])
.directive('supportSearchResults', [function () {
  return {
    restrict: 'A',
    scope: {},
    controller: 'SearchResultsCtrl',
    controllerAs: 'searchResults',
    template: fs.readFileSync(__dirname + '/search-results.html', 'utf8')
  };
}]);
