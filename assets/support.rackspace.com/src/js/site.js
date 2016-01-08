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

  // To-top link 

  // Homepage list toggle controls

  $("#cloud-ctrl").click(function(){
    $(this).removeClass( "inactive" ).addClass( "active" );
    $("#office-ctrl, #get-start-ctrl, #sdks-ctrl").removeClass("active").addClass("inactive");
    $("#cloud-display").removeClass( "inactive" ).addClass( "active" );
    $("#office-display, #get-start-display, #sdks-display").removeClass("active").addClass("inactive");
  });

  $("#office-ctrl").click(function(){
    $(this).removeClass( "inactive" ).addClass( "active" );
    $("#cloud-ctrl, #get-start-ctrl, #sdks-ctrl").removeClass("active").addClass("inactive");
    $("#office-display").removeClass( "inactive" ).addClass( "active" );
    $("#cloud-display, #get-start-display, #sdks-display").removeClass("active").addClass("inactive");
  });

  $("#get-start-ctrl").click(function(){
    $(this).removeClass( "inactive" ).addClass( "active" );
    $("#office-ctrl, #cloud-ctrl, #sdks-ctrl").removeClass("active").addClass("inactive");
    $("#get-start-display").removeClass( "inactive" ).addClass( "active" );
    $("#office-display, #cloud-display, #sdks-display").removeClass("active").addClass("inactive");

  });

  $("#sdks-ctrl").click(function(){
    $(this).removeClass( "inactive" ).addClass( "active" );
    $("#office-ctrl, #get-start-ctrl, #cloud-ctrl").removeClass("active").addClass("inactive");
    $("#sdks-display").removeClass( "inactive" ).addClass( "active" );
    $("#office-display, #get-start-display, #cloud-display").removeClass("active").addClass("inactive");
  });
  

  /* // Sentence Casing h2 elements for demo purposes

  var words = $('h2').text().split(' ');
  var html = '';
  $.each(words, function() {
    html += '<span style="text-transform:lowercase">'+this.substring(0,1)+'</span>'+this.substring(1) + ' ';
  });
  $('h2').html(html);
  
  */

});





