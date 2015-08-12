var $ = require('jquery');
var angular = require('angular');

var moduleName = 'drc.components.scroll-indicator';
module.exports = moduleName;

var INDICATOR_CHANGE_EVENT = 'drcScrollIndicatorChange';

angular.module(moduleName, [])
.factory('scrollIndicator', function ($rootScope) {
    var listenersAdded = false;
    var options, indicators, milestones, activeMilestone;


    return {
        init: function (initOptions) {
            options = initOptions;
            indicators = $('[data-drc-scroll-indicator]');
            potentialMilestones = $('['+ options.attribute +']');

            milestones = [];

            potentialMilestones.each(function () {
                if($('[data-drc-scroll-indicator="' + this.getAttribute(options.attribute) + '"]').length !== 0) {
                    milestones.push(this);
                }
            });

            milestones = $(milestones);

            activeMilestone = indicators[0].getAttribute('data-drc-scroll-indicator');
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

            milestones.each((function (index, element) {
                var fromThreshold = element.getBoundingClientRect().top - viewThreshold;

                if(fromThreshold < 0 && fromThreshold > closestMilestone.position) {
                    closestMilestone.position = fromThreshold;
                    closestMilestone.element = element;
                }
            }).bind(this));

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
})
.directive('drcScrollIndicator', function ($rootScope, scrollIndicator) {
    return {
        controller: function ($scope, $element, $attrs) {
            $element = $($element);

            $rootScope.$on('drcScrollIndicatorChange', function (event, data) {
                if(data === $attrs.drcScrollIndicator) {
                    $element.addClass('active');
                    $element.parents('li').addClass('active');

                    window.history.pushState({}, '', $element.href);
                }
                else {
                    $element.removeClass('active');
                }
            });
        },
        link: function ($scope, $element, $attrs) {
            scrollIndicator.init({
                attribute: $attrs.useAttribute || 'data-drc-scroll-milestone'
            });
        }
    };
});
