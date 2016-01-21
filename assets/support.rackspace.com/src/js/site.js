var $ = require('jquery');
window.$ = window.jQuery = $;

var setupHomepage = require('./homepage');
var setupAllArticles = require('./all-articles');
var setupAdmonish = require('./admonish');

// kick things off

$(document).ready(function(){

  // FAQs toggle content
  $("div.faq h4").nextUntil("h4, h3, hr").hide();

  $("div.faq h4").click(function() {
    $(this).nextUntil("h4, h3, hr").slideToggle("fast");
    $(this).toggleClass("active", 1000);
  });

  // Tags toggle
  $("#list-tags").click(function() {
    $(".tags-list").toggle();
  });

  // setup the homepage stuff
  if (window.location.pathname.match(/how-to\/$/)) {
    setupHomepage();
  }

  if (window.location.pathname.match(/-all-articles\/$/)) {
    setupAllArticles();
  }

  setupAdmonish();
  
  // remove announcement banner from KC

  $(".banner-gs-container").remove();
  
});
