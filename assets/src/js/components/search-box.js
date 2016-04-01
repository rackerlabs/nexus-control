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

  var watchQuery = function () {
    return this.query;
  }.bind(this);

  var onQueryChange = function (newVal, oldVal) {
    // The old value and this one are the same. This typically happens right
    // when the scope is getting bootstrapped.
    if (!$scope.loadInitial && arguments[0] == arguments[1]) {
      return;
    }

    SearchService.emit('updateQuery', {
      query: newVal
    });
  };

  SearchService.on('results', function (results) {
    this.results = results.results;
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
