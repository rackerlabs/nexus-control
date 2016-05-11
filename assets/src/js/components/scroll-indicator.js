var $ = require('jquery');
var angular = require('angular');
var _ = require('lodash');

var INDICATOR_CHANGE_EVENT = 'drcScrollIndicatorChange';

module.exports = angular.module('drc.components.scroll-indicator', [])
.factory('scrollIndicator', ['$rootScope', function ($rootScope) {
    var listenersAdded = false;
    var options = {},
        anchorLinks = null,
        milestones = null,
        activeMilestone = '';

    return {
        init: function (initOptions) {
            if(window.innerWidth < 768) {
              return;
            }

            options = initOptions;
            this.addListeners();
        },
        addListeners: function () {
            if(listenersAdded) {
                return;
            }

            $(window).on('scroll.scrollIndicator resize.scrollIndicator', this.scrollListener.bind(this));

            listenersAdded = true;
        },
        scrollListener: function (e) {
            anchorLinks = options.element.find('a[href^="#"]');
            milestones = $('[' + options.attribute + ']');
            milestones = _.filter(milestones, function (milestone) {
              var match = _.find(anchorLinks, function (link) {
                return link.getAttribute('href').replace('#','') == milestone.getAttribute(options.attribute);
              });

              return match;
            });

            var viewThreshold = parseInt($(window).height() * 0.6);
            closestMilestone = {
                position: -Infinity,
                element: null
            };

            for (var i = 0; i < milestones.length; i++) {
                var index = i;
                var element = milestones[i];

                if(!element) {
                  continue;
                }

                // This weird edge case happens on some milestones that aren't on the page
                if(element.getBoundingClientRect().top === 0 && element.getBoundingClientRect().bottom === 0) {
                  continue;
                }

                var fromThreshold = element.getBoundingClientRect().top - viewThreshold;

                if(fromThreshold < 0 && fromThreshold > closestMilestone.position) {
                    closestMilestone.position = fromThreshold;
                    closestMilestone.element = element;
                }
            }

            if (!closestMilestone.element) {
                return;
            }

            if (
                closestMilestone.element.getAttribute(options.attribute) !==
                activeMilestone
            ) {
                activeMilestone = closestMilestone.element.getAttribute(options.attribute);
                $rootScope.$broadcast(INDICATOR_CHANGE_EVENT, activeMilestone);
            }

        }
    };
}])
.directive('drcScrollIndicator', ['$rootScope', 'scrollIndicator', function ($rootScope, scrollIndicator) {
    return {
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
            $rootScope.$on(INDICATOR_CHANGE_EVENT, function (event, data) {
              var indicatorLink = $element.find('[href="#' + data +'"]');
                window.requestAnimationFrame(function () {
                  $element.find('a[href]').removeClass('active');
                  indicatorLink.addClass('active');
                });
            });
        }],
        link: function ($scope, $element, $attrs) {
            scrollIndicator.init({
                element: $element,
                id: $attrs.drcScrollIndicator,
                attribute: $attrs.useAttribute || 'data-drc-scroll-milestone'
            });
        }
    };
}]).name;
