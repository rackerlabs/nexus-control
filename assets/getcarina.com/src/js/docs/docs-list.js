var angular = require('angular');

var moduleName = 'carina.docs.docs-list';
module.exports = moduleName;

angular.module(moduleName, [])
.controller('DocsListCtrl', [function () {
  this.showCollection =  'getting-started';
}]);
