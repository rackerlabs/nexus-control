(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define('markalytics', [], function () {
      return (root['markalytics'] = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['markalytics'] = factory();
  }
}(this, function () {

// Make it safe to do console.log() always.
(function(global) {
  'use strict';
  global.console = global.console || {};
  var con = global.console;
  var prop, method;
  var empty = {};
  var dummy = function() {};
  var properties = 'memory'.split(',');
  var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
     'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
  while (prop = properties.pop()) if (!con[prop]) con[prop] = empty;
  while (method = methods.pop()) if (!con[method]) con[method] = dummy;
})(typeof window === 'undefined' ? this : window);

var Markalytics = function () {
    var DOCUMENT_EVENTS = [
        'blur',
        'click',
        'focus',
        'mouseenter',
        'mouseleave',
        'scroll'
    ];

    this.options = {
        gaParent: window, // Google's default
        gaName: 'ga', // Google's default
        gaTrackerName: 't0', // Google's default
        eventThrottle: 100 // limit speed of multiple events on the same element
    };

    DOCUMENT_EVENTS.forEach((function (event, index, scope) {
        document.addEventListener(event, this.handleEvent.bind(this), true);
    }).bind(this));
};

Markalytics.prototype.configure = function (options) {
    for(var prop in options) {
        if(!options.hasOwnProperty(prop)) {
            return;
        }

        this.options[prop] = options[prop];
    }
};

Markalytics.prototype.handleEvent = function (event) {
    if(event.target instanceof HTMLElement === false) {
        return;
    }
    if(! event.target.hasAttribute('data-ga-' + event.type.toLowerCase())) {
        return;
    }

    if(event.target.hasAttribute &&
        new Date().getTime() - parseInt(event.target.getAttribute('data-throttle')) < this.options.eventThrottle
    ) {
        return;
    }

    this.sendHit(this.processAttributes(event));
    event.target.setAttribute('data-throttle', new Date().getTime());
};

Markalytics.prototype.processAttributes = function (event) {
    var hitType, hitCallback, hitData;

    if(event.target.hasAttribute('href') && event.type.toLowerCase() === 'click') {
        event.preventDefault();
        hitCallback = function () {
            // mimic the behavior that clicking the href would have had before
            // we stepped in.
            if(
                event.target.hasAttribute('data-follow-link') &&
                event.target.getAttribute('data-follow-link') === 'false'
            ) {
                return;
            }

            window.location = event.target.getAttribute('href');
        };
    }

    hitType = event.target.getAttribute('data-ga-' + event.type.toLowerCase());
    hitCallback = hitCallback || function () {};

    switch(hitType) {
        case 'event':
            hitData = {
                hitType: 'event',
                hitCallback: hitCallback,
                eventCategory: event.target.getAttribute('data-category'),
                eventLabel: event.target.getAttribute('data-label'),
                eventAction: event.target.getAttribute('data-action'),
                eventValue: event.target.getAttribute('data-value')
            };
        break;
        case 'pageview':
            hitData = {
                hitType: 'pageview',
                hitCallback: hitCallback,
                page: event.target.getAttribute('data-page')
            };
        break;
        default:
            hitData = {};
        break;
    }

    return hitData;
};

Markalytics.prototype.sendHit = function (data, callback) {
    callback = callback || function () {};
    data = data || {};

    if(!data.hitType) {
        throw 'data.hitType is required to send GA Beacons';
    }

    var ga = this.options.gaParent[this.options.gaName];
    var sendCommand = this.options.gaTrackerName + '.send';

    try {
        ga(sendCommand, data.hitType, data);

    }
    catch(e) {
        console.warn('[markalytics] Unable to send GA beacon. Has GA been loaded?');
    }

};

var markalytics = Object.create(Markalytics.prototype);

Markalytics.call(markalytics);

return markalytics;

}));
