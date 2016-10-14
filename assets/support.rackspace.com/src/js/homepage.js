
var $ = require('jquery');

// Homepage list toggle controls
var tabs = {
  'cloud-hosting': '#cloud-ctrl, #cloud-display',
  'cloud-office': '#office-ctrl, #office-display',
  'dedicated-hosting': '#hosting-ctrl, #hosting-display'
};

// set the specified tab as active
function setTabActive(tab, setHash) {
  $(".filter-product-type a").removeClass('active').addClass('inactive');
  $(".product-type").removeClass('active').addClass('inactive');
  $(tabs[tab]).removeClass('inactive').addClass('active');

  if (setHash) {
    window.location.hash = "#" + tab;
  }
};

function setup() {
  // if the window has a hash location, and it's not blank
  var loc = window.location.hash.replace(/#/, '');

  if (loc !== '' && tabs[loc] !== undefined) {
    setTabActive(loc, true);
  } else {
    setTabActive('cloud-hosting', false);
  }

  // add onclick handlers to the tabs
  $("#cloud-ctrl").click(setTabActive.bind(null, 'cloud-hosting', true));
  $("#office-ctrl").click(setTabActive.bind(null, 'cloud-office', true));
  $("#hosting-ctrl").click(setTabActive.bind(null, 'dedicated-hosting', true));
};

module.exports = setup;
