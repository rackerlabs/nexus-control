var _ = require('lodash');
var angular = require('angular');

var moduleName = 'drc.components.collapsible-nav';
module.exports = moduleName;

angular.module(moduleName, [])
.directive('drcCollapsibleNav', [function () {
    return {
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

        }],
        link: function ($scope, $element, $attrs) {
            var element = $element[0];
            var createCollapseTarget = function () {
                var target = document.createElement('div');
                target.className = 'fa fa-caret-right collapse-target';

                target.addEventListener('click', function (e) {
                    var targetParent = e.target.parentNode;

                    if (targetParent.classList.contains('open')) {
                        targetParent.classList.remove('open');
                    } else {
                        targetParent.classList.add('open');
                    }
                });

                return target;
            }

            // Loop through all the <li> tags we can find
            var listItems = element.querySelectorAll('li');
            _.forEach(listItems, function (element, index, array) {
                if (element.querySelector('ul') === null) {
                    return;
                }

                // If the <li> has a child <ul>, it is a parent and needs to
                // handle collapsing/de-collapsing
                element.insertBefore(createCollapseTarget(), element.children[0]);

            });
        }
    };
}]);
