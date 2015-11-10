var angular = require('angular');

var moduleName = 'carina.docs.docs-list';
module.exports = moduleName;

angular.module(moduleName, [])
.controller('DocsListCtrl', ['$scope', function ($scope) {
  this.showCollection =  'getting-started';

  if(['#getting-started', '#tutorials', '#best-practices'].indexOf(window.location.hash) !== -1) {
    this.showCollection = window.location.hash.replace('#','');
  }

  $scope.$watch(function () {
    return this.showCollection;
  }.bind(this), function (newVal, oldVal) {
    if(oldVal === newVal) {
      return;
    }

    window.location.hash = '#' + newVal;
  });
}]);
