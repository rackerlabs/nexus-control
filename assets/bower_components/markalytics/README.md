# Markalytics

Markup-driven analytics.

<a href="https://travis-ci.org/markalytics/markalytics"><img src="https://travis-ci.org/markalytics/markalytics.svg" alt="Travis build status"/></a>

Markalytics provides a declarative way to configure your Google Analytics events. With Markalytics, your _markup_ defines your events instead of having to maintain an unwieldy set of JavaScript event listeners or GTM tags.

Markalytics lets you just do this:

```html
<a href="/buy-now" data-ga-click="event" data-category="conversion-buy-now" data-label="homepage-button" data-action="click">Buy Now</a>
```

Instead of _also_ having to do all this:

```javascript
$('#cumbersome-id-attribute').on('click', function (e) {
  e.preventDefault();

  ga('send', 'event', {
    eventCategory: 'conversion-buy-now',
    eventLabel: 'homepage-button',
    eventAction: 'click',
    hitCallback: function () {
      window.location = e.target.href;
    }
  });
}
```

In short, it lets you record events like crazy without having to do lots of work. It’s pretty great!

## Installation

The easiest way to add Markalytics to your website is to use [Bower](http://bower.io).

```bash
$ bower install --save markalytics
```

If you're using Markalytics with [Browserify](http://browserify.org/), you'll want to install it with NPM instead:

```bash
$ npm install --save-dev markalytics
```

Markalytics works well in a variety of environments, including CommonJS/AMD:

### Old school

```html
<script src="bower_components/markalytics/dist/markalytics.min.js"></script>
<!-- Markalytics has now added all of its hooks. You can still customize it, though  -->
<script>
markalytics.customize({'...'});
</script>
```

### RequireJS

```js
define([
  'markalytics'
], function (markalytics) {
  // Markalytics has now added all of its hooks. You can still customize it, though
  markalytics.customize({'...'});
});
```

### Browserify

```js
var markalytics = require('markalytics');

// Markalytics has now added all of its hooks. You can still customize it, though
markalytics.customize({'...'});
```

## Usage

Markalytics events are triggered on elements that have an attribute like `data-ga-{eventType}`. For example, `data-ga-click="event"` is commonly used to send events when a visitor clicks an element.

The following JavaScript events can be tracked:

* blur
* click
* focus
* mouseover
* mouseout

```html
<!-- Send an event when a vistor focuses the element -->
<input type="text" name="email" data-ga-focus="event" data-category="interaction-form" data-label="signup-form-email" data-ga-action="focus"/>

<!-- Send an event when a vistor un-focuses the element -->
<input type="text" name="email" data-ga-blur="event" data-category="interaction-form" data-label="signup-form-email" data-ga-action="blur"/>

<!-- Send an event when a visitor clicks the element -->
<a href="/buy-now" data-ga-click="event" data-category="conversion-buy-now" data-label="homepage-button" data-action="click">Buy Now</a>

<!-- Send a virtual pageview when a vistor clicks the element -->
<a href="#" data-ga-click="pageview" data-page="/slideshow/slides/2">Next Slide</a>
```

Google Analytics imposes a few requirements when sending events:

* When sending events, `category`, `label`, and `action` are all required fields.
* When sending virtual pageviews, `page` is a required field.

Besides that, that you can organize and name your event fields however you want.

## Customization

Customize Markalytics by calling `markalytics.configure`:

```js
markalytics.configure({
  gaParent: window, // Where Google attaches the `ga` function by default.
  gaName: 'ga', // The name of the tracker function by default.
  gaTrackerName: 't0', // The default name of the tracker. Could be different if you use named trackers or GTM.
  eventThrottle: 100 // If multiple events are fired in fewer than this many milliseconds, additional GA hits will not be sent.
});
```

When a visitor clicks links with an `href` attribute, Markalytics will send an event to Google Analytics first, and then follow the link when the GA request finishes. If this is not the desired behavior (e.g: you want the equivalent of `preventDefault()`), set the `data-follow-link` attribute to the string `'false'`:

```html
<a href="#" data-ga-click="pageview" data-page="/slides/slide-2" data-follow-link="false">
```

## Additional Reading

* [Analytics.js Field Reference](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference)
