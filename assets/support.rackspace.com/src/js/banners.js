
var jQuery = require("jquery");
var _ = require('underscore');

var util = require('./util.js');


var BANNER_KEY = 'haasDismissedBanner';

/**
*  dismissMessage dismisses the message and ensures it's not displayed again.
*/

function dismissMessage(messageId) {
    jQuery("#banner-announcement-container").slideUp('fast');
    document.cookie = BANNER_KEY + "=" + messageId + ";domain=rackspace.com;expires=Fri, 31 Dec 9999 23:59:59 GMT";
}

/**
*  displayMessage renders the message as HTML
*/

function displayMessage(messageId, htmlSnippet) {
    jQuery("#banner-announcement-container").css("display", "");
    jQuery("#banner-announcement-content-text").append(htmlSnippet);
    jQuery("#banner-announcement-close").on('click', _.partial(dismissMessage, messageId));
}

/*
*  postMessage displays the message to the user if they haven't dismissed it
*  already
*/

function postMessage(messageId, htmlSnippet) {
    var bannerValue = util.getCookie(BANNER_KEY);

    if (bannerValue && bannerValue === messageId) {
        return;
    }

    displayMessage(messageId, htmlSnippet);
}

module.exports = {
    postMessage: postMessage,
};
