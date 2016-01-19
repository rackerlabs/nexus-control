
var $ = require('jquery');
var _ = require('lodash');

// tracking variables
var allArticles = null;
var itemsPerPage = 20;
var currentPage = 1;

// template for the pagination
var paginationTemplate = _.template('' +
  '<div class="pagination-container">' +
  '<hr />' +
  '<ul class="pagination">' +
  '<% _.forEach(_.range(1, pageCount + 1), function (item) { %>' +
  '<% if (item == currentPage) { %>' +
  '<li><a href="#" class="active" data-page="<%= item %>"><%= item %></a></li>' +
  '<% } else { %>' +
  '<li><a href="#" data-page="<%= item %>"><%= item %></a></li>' +
  '<% } %>' +
  '<% }); %>' +
  '<% if (currentPage != pageCount) { %>' +
  '<li><a href="#" data-page="next">next</a></li>' +
  '<% } %>' +
  '</ul>' +
  '</div>');

// show the next page of results
function nextPage() {
  showPage(currentPage + 1);
}

// show a specific page of results
function showPage(pageNumber) {
  currentPage = pageNumber;
  var startElement = ((currentPage - 1) * itemsPerPage);
  var endElement = (currentPage * itemsPerPage);

  allArticles.children('.article-entry').hide();
  allArticles.children('.article-entry').slice(startElement, endElement).show();

  $('.pagination-container').remove();
  setupPagination();
};

function setupPagination() {
  // add the pagination to the page
  var items = allArticles.children('.article-entry').size();
  var pageCount = Math.ceil(items / itemsPerPage);
  var pagination = paginationTemplate({currentPage: currentPage, pageCount: pageCount});
  allArticles.append(pagination);

  // wire up the links
  $('.pagination a').each(function (idx) {
    var el = $(this);

    if (el.attr('data-page') === 'next') {
      el.click(nextPage.bind(null));
    } else {
      el.click(showPage.bind(null, idx + 1));
    }
  });
};

function setup() {
  allArticles = $('.article-list');
  showPage(currentPage);
};

module.exports = setup;
