var angular = require('angular');

var moduleName = 'drc.services.active-language';
module.exports = moduleName;

var LANGUAGE_KEY = 'drc.preferredLanguage';
var LANGUAGE_CHANGE_EVENT = 'drcLanguageChange';

angular.module(moduleName, [])
.factory('activeLanguage', function ($rootScope) {
    if(! localStorage.getItem(LANGUAGE_KEY)) {
        localStorage.setItem(LANGUAGE_KEY, 'cli');
    }

    return {
        set: function (value) {
            localStorage.setItem(LANGUAGE_KEY, value);
            $rootScope.$broadcast(LANGUAGE_CHANGE_EVENT, value);
        },
        get: function () {
            return localStorage.getItem(LANGUAGE_KEY);
        },
        changeEventName: LANGUAGE_CHANGE_EVENT
    };
});
