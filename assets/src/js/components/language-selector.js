var $ = require('jquery');
var angular = require('angular');

var moduleName = 'drc.components.language-selector';
module.exports = moduleName;

angular.module(moduleName, [])
.directive('drcLanguageSelector', function ($rootScope, activeLanguage) {
    return {
        scope: {},
        controller: function ($scope, $element, $attrs) {
            $element = $($element);

            $scope.isActiveLanguage = function () {
                return activeLanguage.get() === $attrs.drcLanguageSelector;
            };

            $scope.setActiveClass = function () {
                if($scope.isActiveLanguage()) {
                    $element.addClass('active');
                }
                else {
                    $element.removeClass('active');
                }
            };

            $rootScope.$on(activeLanguage.changeEventName, $scope.setActiveClass);
        },
        link: function ($scope, $element, $attrs) {
            $scope.setActiveClass();
            $element.on('click', function () {
                activeLanguage.set($attrs.drcLanguageSelector);
            });
        }
    };
});
