var angular = require('angular');
var fs = require('fs');

var moduleName = 'drc.components.search-box';
module.exports = moduleName;

angular.module(moduleName, [])
.controller('SearchBoxCtrl', ['$sce', '$scope', '$timeout', 'SearchService', function ($sce, $scope, $timeout, SearchService) {
  if ($scope.loadInitial && window.location.search.match(/q=[^&]+/)) {
    this.query = window.location.search.match(/q=([^&]+)/)[1];
  } else {
    this.query = '';
  }

  this.searchInProgress = false;
  this.results = [];

  var lastQuerySearched = '';
  var noResultsTimer;

  var watchQuery = function () {
    return this.query;
  }.bind(this);

  var onQueryChange = function () {
    // Don't stack up search requests. One at a time!
    if (this.searchInProgress) {
      return;
    }

    // The old value and this one are the same. This typically happens right
    // when the scope is getting bootstrapped.
    if (!$scope.loadInitial && arguments[0] == arguments[1]) {
      return;
    }

    // Empty query == empty result set
    if (!this.query) {
      this.results = [];
      return;
    }

    // Don't search for single letters
    if (this.query.length < 2) {
      return;
    }

    // A search is about to begin
    this.searchInProgress = true;

    // Cancel the timeout to show a "no results" message
    $timeout.cancel(noResultsTimer);

    // keep track of the last search that was sent upstream.
    lastQuerySearched = this.query;

    SearchService.emit('search', {
      query: lastQuerySearched
    });
  }.bind(this);

  SearchService.on('results', function (results) {
    // The search is over!
    this.searchInProgress = false;

    // Don't commit an empty search right away, as the user may still be
    // typing. We want to wait until they've stopped typing to confirm that
    // the empty set is what they really wanted to search for. Timeout is
    // cancelled any time the query is updated.
    if (results.results.length === 0) {
      noResultsTimer = $timeout(function () {
        this.results = [];
      }.bind(this), 400);

      return;
    }

    this.results = results.results;

    // If the query has changed since we last dispatched a search call, search
    // again to get results for the latest query
    if (this.query != lastQuerySearched) {
      onQueryChange();
    }
    return;
  }.bind(this));

  $scope.$watch(watchQuery, onQueryChange);

}])
.directive('drcSearchBox', [function () {
  return {
    restrict: 'A',
    scope: {
      focus: '@',
      loadInitial: '@'
    },
    controller: 'SearchBoxCtrl',
    controllerAs: 'searchBox',
    link: function ($scope, $element, $attrs) {
      if ($scope.focus) {
        $element.find('input[type="search"]').focus();
      }
    },
    template: fs.readFileSync(__dirname + '/search-box.html', 'utf8')
  };
}]);
