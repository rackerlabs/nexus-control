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

  // Homepage list toggle controls
  var tabs = {
    'cloud-hosting': '#cloud-ctrl, #cloud-display',
    'cloud-office': '#office-ctrl, #office-display',
    'core-user-guide': '#get-start-ctrl, #get-start-display'
  };

  // set the specified tab as active
  function setTabActive(tab) {
    $(".filter-product-type a").removeClass('active').addClass('inactive');
    $(".product-type").removeClass('active').addClass('inactive');
    $(tabs[tab]).removeClass('inactive').addClass('active');
    window.location.hash = "#" + tab;
  };

  function wireUpStuff() {
    // if the window has a hash location, and it's not blank
    var loc = window.location.hash.replace(/#/, '');

    if (loc !== '' && tabs[loc] !== undefined) {
      setTabActive(loc);
    } else {
      setTabActive('cloud-hosting');
    }

    // add onclick handlers to the tabs
    $("#cloud-ctrl").click(setTabActive.bind(null, 'cloud-hosting'));
    $("#office-ctrl").click(setTabActive.bind(null, 'cloud-office'));
    $("#get-start-ctrl").click(setTabActive.bind(null, 'core-user-guide'));
  };

  if (window.location.pathname.match(/how-to\/$/)) {
    wireUpStuff();
  }
});
