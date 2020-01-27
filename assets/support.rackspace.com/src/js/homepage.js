
var $ = require('jquery');

// Homepage list toggle controls
var tabs = {
  'getting-started': '#gs-ctrl, #gs-display',
  'cloud-hosting': '#cloud-ctrl, #cloud-display',
  'cloud-office': '#office-ctrl, #office-display',
  'private-cloud': '#rpc-ctrl, #rpc-display'
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
    setTabActive('getting-started', false);
  }

  // add onclick handlers to the tabs
  $("#gs-ctrl").click(setTabActive.bind(null, 'getting-started', true));
  $("#cloud-ctrl").click(setTabActive.bind(null, 'cloud-hosting', true));
  $("#office-ctrl").click(setTabActive.bind(null, 'cloud-office', true));
  $("#rpc-ctrl").click(setTabActive.bind(null, 'private-cloud', true));
};

module.exports = setup;
