var $ = require('jquery');
var angular = require('angular');

var moduleName = 'drc.components.scroll-indicator';
module.exports = moduleName;

var INDICATOR_CHANGE_EVENT = 'drcScrollIndicatorChange';

angular.module(moduleName, [])
.factory('scrollIndicator', ['$rootScope', function ($rootScope) {
    var listenersAdded = false;
    var options = {},
        milestones = [],
        activeMilestone = '';

    return {
        init: function (initOptions) {
            options = initOptions;
            var milestoneSelector = '[' + options.attribute + '="' + options.id +'"]';
            milestones.push($(milestoneSelector)[0]);

            activeMilestone = $('[data-drc-scroll-indicator]').first().attr('data-drc-scroll-indicator');
            $rootScope.$broadcast(INDICATOR_CHANGE_EVENT, activeMilestone);

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
            var viewThreshold = parseInt($(window).height() * 0.6);
            closestMilestone = {
                position: -Infinity,
                element: null
            };

            for(var i = 0; i < milestones.length; i++) {
                var index = i;
                var element = milestones[i];
                var fromThreshold = element.getBoundingClientRect().top - viewThreshold;

                if(fromThreshold < 0 && fromThreshold > closestMilestone.position) {
                    closestMilestone.position = fromThreshold;
                    closestMilestone.element = element;
                }
            }

            if(!closestMilestone.element) {
                return;
            }

            if(
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
            $element = $($element);

            $rootScope.$on(INDICATOR_CHANGE_EVENT, function (event, data) {
                window.requestAnimationFrame(function () {
                    if(data === $attrs.drcScrollIndicator) {
                        $element.addClass('active');
                        $element.parents('li').addClass('active');
                    }
                    else {
                        $element.removeClass('active');
                    }
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
}]);
