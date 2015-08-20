// This is the bootstrap affix plugin, modified to be a requireJS-friendly
// Angular directive.

var $ = require('jquery');
var angular = require('angular');


var moduleName = 'drc.components.flex-height';
module.exports = moduleName;

angular.module(moduleName, [])
.directive('drcFlexHeight', function () {
    return {
        link: function ($scope, $element, $attrs) {
            $element = $($element);

            var flexHeight = function () {
                var rect = $element[0].getBoundingClientRect();
                var bottomDistance = (($(window).scrollTop() + $(window).height() - $(document.body).height()) * -1);
                bottomClip = Math.max(parseFloat($attrs.flexBottom) - bottomDistance, 0);

                var flexHeight = Math.min($(window).height() - Math.abs(rect.top) - bottomClip, $(window).height());

                requestAnimationFrame(function () {
                    $element.css({
                        maxHeight: flexHeight + 'px'
                    });
                });
            };

            $(window).on('scroll resize', flexHeight.bind(this));

            flexHeight();
        }
    };
});
