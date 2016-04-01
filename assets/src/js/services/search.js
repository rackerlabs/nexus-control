var angular = require('angular');
var EventEmitter = require('event-emitter');

var moduleName = 'drc.services.search';
module.exports = moduleName;

angular.module(moduleName, [])
.service('SearchService', ['$http', '$q', function ($http, $q) {
  var emitter = EventEmitter({});

  var state = Object.create(Object, {
    _results: {
      enumerable: false,
      writable: true
    },
    results: {
      enumerable: true,
      get: function () {
        return this._state;
      },
      set: function (value) {
        this._state = value;
        emitter.emit('results', this._state);
      }
    }
  });

  state.results = {
    results: [],
    total: 0
  };

  var search = function (options) {
    return $http({
      method: 'GET',
      url: '/_api/search/',
      params: {
        q: options.query
      }
    })
    .then(function (response) {
      state.results = response.data;
    })
    .catch(function (err){
      state.results = {
        results: [],
        total: 0
      };
    });
  };

  emitter.on('search', search);

  return emitter;
}]);
