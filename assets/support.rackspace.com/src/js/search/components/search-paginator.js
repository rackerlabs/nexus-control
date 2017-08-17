var angular = require('angular');
var fs = require('fs');
var _ = require('lodash');

var moduleName = 'support.search.components.search-paginator';
module.exports = moduleName;

angular.module(moduleName, [])
.controller('SearchPaginatorCtrl', ['$scope', 'SearchService', function ($scope, SearchService) {
  this.query = {};
  this.results = {};
  this.range = [];

  this.goToPage = function (pageNumber) {
    SearchService.emit('updateQuery', {
      pageNumber: pageNumber
    });

    // scroll the window back to the top, which is presumably a good place to
    // observe the results of the updated query.
    window.scrollTo(0,0);
  };

  var updateRange = function (query, results) {
    if (!results.pages) {
      return [];
    }

    var range = [];
    // start with a range of +/- 10 from the current page
    for (var i = query.pageNumber - 10; i <= query.pageNumber + 10; i++) {
      range.push({
        pageNumber: i,
        currentPage: (i === query.pageNumber)
      });
    }

    // remove negative pages and pages beyond the actual page count
    range = _.filter(range, function (item) {
      return item.pageNumber > 0 && item.pageNumber <= results.pages;
    });

    while (range.length > 10) {
      // if the current page is very close to 1, just trim from the top
      if (query.pageNumber <= 5) {
        range.splice(-1,1);
        continue;
      }

      // if the current page is very close to the total number of pages, just
      // trim from the bottom
      if (query.pageNumber >= results.pages - 5) {
        range.splice(0, 1);
        continue;
      }

      // otherwise, alternate trimming from the bottom and top
      if (range.length % 2 === 0) {
        range.splice(-1, 1);
      } else {
        range.splice(0, 1);
      }
    }

    return range;
  }.bind(this);

  SearchService.on('queryChange', function (newQuery) {
    this.query = newQuery;
    this.range = updateRange(this.query, this.results);
  }.bind(this));

  SearchService.on('results', function (newResults) {
    this.results = newResults;
    this.range = updateRange(this.query, this.results);
  }.bind(this));
}])
.directive('carinaSearchPaginator', [function () {
  return {
    restrict: 'A',
    scope: {},
    controller: 'SearchPaginatorCtrl',
    controllerAs: 'paginator',
    template: fs.readFileSync(__dirname + '/search-paginator.html', 'utf8')
  };
}]);
