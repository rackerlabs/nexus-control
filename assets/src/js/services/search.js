var angular = require('angular');
var EventEmitter = require('event-emitter');

var moduleName = 'drc.services.search';
module.exports = moduleName;

angular.module(moduleName, [])
.service('SearchService', ['$http', '$q', function ($http, $q) {
  // This is our export value. Public interface is all through
  var emitter = EventEmitter({});

  var emptyResults = {
    results: [],
    total: 0
  };

  var state = Object.create(Object, {
    completedQuery: {
      enumerable: false, //change to false
      value: {},
      writable: true
    },
    _query: {
      enumerable: false, //change to false
      value: {},
      writable: true
    },
    _results: {
      enumerable: false, //change to false
      value: {},
      writable: true
    },
    _searchInProgress: {
      enumerable: false,
      value: false,
      writable: true
    },
    query: {
      enumerable: true,
      get: function () {
        return this._query;
      },
      set: function (value) {
        this._query.query = value.query;

        emitter.emit('search');
      }
    },
    results: {
      enumerable: true,
      get: function () {
        return this._results;
      },
      set: function (value) {
        this._results = value;
        emitter.emit('results', this._results);
      }
    },
    searchInProgress: {
      enumerable: true,
      get: function () {
        return this._searchInProgress;
      },
      set: function (value) {
        this._searchInProgress = value;

        if (value === true) {
          emitter.emit('searchStart');
        }

        if (value === false) {
          emitter.emit('searchEnd');
        }
      }
    }
  });

  state.results = emptyResults;

  var search = function () {
    // Don't stack up search requests. One at a time!
    if (state.searchInProgress) {
      return;
    }

    // Empty query == empty result set
    if (!state.query.query) {
      state.results = emptyResults;
      return;
    }

    // Don't search for single letters
    if (state.query.query.length < 2) {
      return;
    }

    state.searchInProgress = true;
    state.completedQuery.query = state.query.query;

    return $http({
      method: 'GET',
      url: '/_api/search/',
      params: {
        q: state.query.query
      }
    })
    .then(function (response) {
      state.searchInProgress = false;
      state.results = response.data;

      // People type fast. If query state has changed since we finished _this_
      // query, emit the search event again to search with the latest state.
      if (state.completedQuery.query !== state.query.query) {
        emitter.emit('search');
      }
    })
    .catch(function (err){
      state.results = emptyResults;

      // People type fast. If query state has changed since we finished _this_
      // query, emit the search event again to search with the latest state.
      if (state.completedQuery.query !== state.query.query) {
        emitter.emit('search');
      }
    });
  };

  emitter.on('search', search);
  emitter.on('updateQuery', function (query) {
    state.query = query;
  });

  return emitter;
}]);
