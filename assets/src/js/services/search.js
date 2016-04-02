var angular = require('angular');
var EventEmitter = require('event-emitter');

var moduleName = 'drc.services.search';
module.exports = moduleName;

angular.module(moduleName, [])
.service('SearchService', ['$http', function ($http) {
  // This is our export value. Public interface is all through the event emitter
  var emitter = EventEmitter({});

  var defaultQuery = {
    query: '',
    pageNumber: 5
  };

  var emptyResults = {
    results: [],
    total: 0
  };

  // Centralized search state. Uses getters and setters for certain properties
  // to ensure that events are emitted when their values change.
  var state = Object.create(Object, {
    completedQuery: {
      enumerable: false,
      value: {},
      writable: true
    },
    _query: {
      enumerable: false,
      value: {},
      writable: true
    },
    _results: {
      enumerable: false,
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
        for (var prop in value) {
          if (value.hasOwnProperty(prop)) {
            this._query[prop] = value[prop];
          }
        }

        emitter.emit('queryChange', this._query);
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
  state.query = defaultQuery;

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
        q: state.query.query,
        pageNumber: state.query.pageNumber
      }
    })
    .then(function (response) {
      state.searchInProgress = false;
      state.results = response.data;

      // People type fast. If query state has changed since we finished this
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


  emitter.on('updateQuery', function (query) {
    state.query = query;
  });

  emitter.on('search', search);

  return emitter;
}]);
