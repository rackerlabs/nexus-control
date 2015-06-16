(function (window, document, $) {
  var app = window.devsite;
  $.extend(app, {
    // TODO move to some kind of utils object or something
    getParameter: (function () {
      var cache = {};
      return function (name) {
        if ('getParameter' in window.location && typeof(window.location.getParameter) === 'function') {
          return window.location.getParameter(name);
        }

        var query = window.location.search.substring(1);
        if (cache[query]) {
          return cache[query][name];
        }

        var kvp = query.split('&'), values = {};
        for (var i = 0; i < kvp.length; i++) {
          var kv = kvp[i].split('=');
          values[kv[0]] = decodeURIComponent(kv[1] || '').replace(/\+/g, ' ');
        }

        cache[query] = values;
        return cache[query][name];
      };
    }())
  });

  $(document).on('ready', function() {

    app.routes = {
      '/community/': app.pages.sponsorship,
      '/docs/': app.pages.docs,
      '/devtrial/': app.pages.devtrial,
      '/signup/': app.pages.signup,
      '/': app.pages.home
    };

    Object.keys(app.routes).forEach(function(route) {
      if (window.location.pathname.indexOf(route) === 0) {
        app.routes[route]();
      }
    });
  });

}(window, document, jQuery));
