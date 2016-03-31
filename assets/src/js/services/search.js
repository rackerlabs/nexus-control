var angular = require('angular');

var moduleName = 'drc.services.search';
module.exports = moduleName;

angular.module(moduleName, [])
.service('SearchService', ['$http', '$q', function ($http, $q) {
  return {
    search: function (options) {
      return $http({
        method: 'GET',
        url: '/_api/search/',
        params: {
          q: options.query
        }
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (err){
        return {
          total: 0,
          results: []
        };
      });
    }
  };
}]);
