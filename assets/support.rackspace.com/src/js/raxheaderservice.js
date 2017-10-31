'use strict';

var jQuery = require('jquery');
var _ = require('underscore');

var banners = require('./banners.js')

var util = require('./util.js');

var divElements = {
    "how-to": "#raxhs-how-to",
    "api": "#raxhs-api",
    "community": "#raxhs-community",
    "support": "#raxhs-support",
    "whitepapers": "#raxhs-whitepapers"
};

function checkApiDocsHref() {
    var hostName = location.hostname;
    if (hostName.substring(0, 5) === "docs-") {
        var newHref = location.origin;
        jQuery('#raxhs-api').attr('href', newHref);
    }
}

//
// Application Entry Point
//
module.exports = function(team, headerDivId, footerDivId, contentDivId, message) {
    jQuery(document).ready(function() {
        // expose the ability for customers to post messages
        window.haasPostMessage = banners.postMessage;
    });
};
