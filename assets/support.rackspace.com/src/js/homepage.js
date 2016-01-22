
var $ = require('jquery');

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

function setup() {
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

module.exports = setup;
