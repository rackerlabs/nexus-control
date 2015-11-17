var $ = require('jquery');
var angular = require('angular');

module.exports = angular.module('drc.components.collapsible-section', [])
.directive('collapsibleSection', ['$rootScope', '$sce', function ($rootScope, $sce) {
    return {
        scope: true,
        restrict: 'C',
        controller: ['$scope', '$element', '$attrs', '$compile', function ($scope, $element, $attrs, $compile) {

          // Compile a toggle element and add it before the section
          $scope.init = function () {
            var toggleTemplate = '<div class="collapsible-section-toggle" data-ng-click="toggle()" data-ng-class="{\'show\': !isOpen()}"><a class="toggle" href="">collapse section</a> <h2 data-ng-bind-html="title"></h2></div>';
            var output = $compile(toggleTemplate)($scope);

            $element.before(output);
          };
        }],
        link: function ($scope, $element, $attrs) {
          $scope.title = $sce.trustAsHtml(
            $element.find('.collapsible-section-title').html()
          );

          if(window.location.hash == '#' + $element.attr('id')) {
            $element.addClass('open');

            setTimeout(function () {
              $rootScope.$emit('$drcFlexHeight.flexHeight');
              window.scrollTo(0, $element.offset().top);
            }, 20);

          }

          $scope.toggle = function () {
            $element.toggleClass('open');

            // Give the browser a little time to paint so the flexHeight
            // calculations are correct.
            setTimeout(function () {
              $rootScope.$emit('$drcFlexHeight.flexHeight');
            }, 20);
          };

          $scope.isOpen = function () {
            return $element.hasClass('open');
          };

          $scope.init();
        }
    };
}]).name;
