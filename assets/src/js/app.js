var angular = require('angular');

var moduleName = 'drc.app';
module.exports = moduleName;

angular.module(moduleName, [
    require('./components/code-sample'),
    require('./components/copy-code-sample'),
    require('./components/dropdown-toggle'),
    require('./components/flex-height'),
    require('./components/language-selector'),
    require('./components/scroll-indicator'),
    require('./components/section-nav-toggle'),
    require('./components/sticky'),
    require('./controllers/blog-sidebar'),
    require('./controllers/docs-home-services'),
    require('./controllers/docs-home-sidebar'),
    require('./services/active-language'),
    require('./services/filter'),
]);

angular.bootstrap(document, [moduleName]);
