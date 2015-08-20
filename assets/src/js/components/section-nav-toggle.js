var angular = require('angular');
var $ = require('jquery');

var moduleName = 'drc.components.section-nav-toggle';
module.exports = moduleName;

angular.module(moduleName, [])
.directive('drcSectionNavToggle', function () {
    return {
        restrict: 'A',
        link: function ($scope, $element, $attrs) {
            $element = $($element);

            var ACTIVE_CLASS = 'show-section-nav';
            var parentElement = $element.closest($attrs.parent);
            var isNavShown = false;

            var toggleNav = function () {
                if(isNavShown) {
                    parentElement.addClass(ACTIVE_CLASS);
                }
                else {
                    parentElement.removeClass(ACTIVE_CLASS);
                }
            };

            toggleNav();

            $element.on('click', '.section-nav-toggle', function (e) {
                isNavShown = !isNavShown;
                toggleNav();
            });
        }
    };
});
