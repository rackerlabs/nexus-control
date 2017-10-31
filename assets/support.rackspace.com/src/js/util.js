'use strict';

var jQuery = require("jquery");
var _ = require('underscore');


function getCookie(cookieName) {
    var retVal = "";
    if (null != cookieName && cookieName != "") {
        var allCookies = document.cookie;

        // Get all the cookies pairs in an array
        var cookieArray = allCookies.split(';');

        // Now take key value pair out of this array
        for (var i = 0; i < cookieArray.length; i++) {
            var name = cookieArray[i].split('=')[0];
            if (null != name) {
                name = name.trim();
            }

            var value = cookieArray[i].split('=')[1];
            if (null != value) {
                value = value.trim();
            }
            if (cookieName == name) {
                retVal = value;
                break;
            }
        }
    }
    return retVal;
}

function onIE9() {
    var version = 0;
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9\{1,}[\.0-9]{0,})");

        if (re.exec(ua) != null)
            version = parseFloat(RegExp.$1);
    }
    return (version > 0 && version < 10);
}

function createJavascriptElement(scriptSrc, isInnerText, id) {
    var script = document.createElement('script');

    if (null != id && id != "") {
        script.id = id;
    }
    script.type = 'text/javascript';

    if (!isInnerText) {
        script.async = true;
        script.src = scriptSrc;
    } else {
        script.innerText = scriptSrc;
        script.innerHtml = scriptSrc;
    }
    return script;
}

function insertIntoDom(element) {
    var s0 = document.getElementsByTagName('script')[0];

    s0.parentNode.insertBefore(element, s0);
    document.getElementsByTagName('script')[0].innerHTML = document.getElementsByTagName('script')[0].innerText;
}

module.exports = {
    getCookie: getCookie,
    onIE9: onIE9,
    createJavascriptElement: createJavascriptElement,
    insertIntoDom: insertIntoDom
};
