var angular = require('angular');

var moduleName = 'carina.beta-alert.beta-alert';
module.exports = moduleName;

var COOKIE_NAME = 'carina.dismissBetaAlert';

angular.module(moduleName, [])
.directive('carinaBetaAlert', [function () {
  return {
    restrict: 'A',
    controller: ['$scope','$element','$attrs', '$cookies', function ($scope, $element, $attrs, $cookies) {
      if($cookies.get(COOKIE_NAME)) {
        $element.remove();
      }

      this.dismiss = function () {
        var expiry = new Date();
        expiry.setYear(expiry.getUTCFullYear() + 1);

        $cookies.put(COOKIE_NAME, 1, {
          expires: expiry
        });

        $element.remove();
      };
    }],
    controllerAs: 'betaAlert'
  };
}]);
