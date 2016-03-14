var angular = require('angular');

var moduleName = 'rcs.components.recaptcha'; module.exports = moduleName;

angular.module(moduleName, [])
  .directive('rsRecaptcha', [ function () {
    return {
      restrict: 'A',
      require: ['ngModel', '^form'],
      scope: {
        ngModel: '=',
        name: '@'
      },
      controller: ['$scope', '$element', function ($scope, $element) {
        $scope.loadRecaptchaAPI = function () {
          // Register a global callback that recaptcha can use, JSONP style.
          // Use the scope ID in the callback name to allow multiple recaptcha
          // invocations on one page.
          var loadCallback = 'recaptchaLoad' + $scope.$id;
          window[loadCallback] = function () {
            $scope.recaptchaID = window.grecaptcha.render(
              $element.get(0),
              {
                sitekey: '6LfTsRoTAAAAACPNcZRKYGSMI0pOzn_W0H4ikKLR',
                callback: function (response) {
                  $scope.setModel(response);
                },
                'expired-callback': function () {
                  $scope.setModel('');
                }
              }
            );
          };

          // Load the recaptcha API, injecting our callback name.
          // Creates global variable `grecaptcha`.
          var recaptchaScript = document.createElement('script');
          recaptchaScript.addEventListener('load', window.recaptchaScriptLoad);
          recaptchaScript.src = 'https://www.google.com/recaptcha/api.js?onload=' + loadCallback + '&render=explicit';
          document.body.appendChild(recaptchaScript);
        };

        $scope.loadRecaptchaAPI();
      }],
      link: function ($scope, $element, $attrs, controllers) {
        var ngModelController = controllers[0];

        // Sets the value of the recaptcha response. This is called from
        // recaptcha callbacks, so we need to use $scope.$apply
        $scope.setModel = function (value) {
          $scope.$apply(function () {
            ngModelController.$setViewValue(value);
          });
        };

        // All we can assume client-side is that any non-empty response is valid.
        ngModelController.$validators.recaptcha = function (modelValue, viewValue) {
          return typeof modelValue !== 'undefined' && modelValue !== '';
        };
      }
    };
  }]);
