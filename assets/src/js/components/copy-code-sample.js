// This is the bootstrap affix plugin, modified to be a requireJS-friendly
// Angular directive.

var $ = require('jquery');
var angular = require('angular');

var moduleName = 'drc.components.copy-code-sample';
module.exports = moduleName;

angular.module(moduleName, [])
.directive('drcCopyCodeSample', function () {
    return {
        link: function ($scope, $element, $attrs) {
            $element = $($element);

            $element.on('click', function (e) {
                e.preventDefault();
            });
        }
    };
});
