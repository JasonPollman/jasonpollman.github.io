/**
 * @file   - actions.js
 * @author - Jason Pollman, Kris Tyte, Kevin VanEmmerick, & Charles Heiser
 * @date   - 5/5/2014
 *
 * This file contains the jQuery actions for animation for the page.
 * Additionally the script is invoked when the DOM is "ready" and makes
 * the necessary calls to visualizations.js to construct the visualizations
 * using D3.
 */


/**
 * Opens the respect social URL with the document's URL as the post page.
 * @param url - The social link
 */
function openSocial(url) {
  (url == "git") ?
  window.open('https://github.com/PuffNStuff/obesity', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes') :
  window.open(url + document.URL, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
}

Array.prototype.exists = function (e) {
  return (this.indexOf(e) <= -1) ? false : true;
};
  

/**
 * Get width of hidden (i.e. "display: none") elements.
 * jQuery Function
 */
$.fn.hiddenWidth = function() {
  var clone = this.clone().css("visibility","hidden").css("display", "block").appendTo("#vis-wrapper")
  var width = clone.width();
  clone.remove();
  return width;
};


/**
 * Get height of hidden (i.e. "display: none") elements.
 * jQuery Function
 */
$.fn.hiddenHeight = function() {
  var clone = this.clone().css("visibility","hidden").css("display", "block").appendTo("#vis-wrapper")
  var height = clone.height();
  clone.remove();
  return height;
};


/**
 * Capitalize First Letter of String
 */
String.prototype.ucFirst = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};


// Anon. Immediately Run Function
// ...Where the magic begins...
(function($) {

  // Document.ready()
  $(function() {

    // We have a Chrome Browser here...
    var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    var isChrome = !!window.chrome && !isOpera;
    if(!isChrome) {
      alert("For the best viewing experience, please consider using Google Chrome.");
    }

    // The width of the window.
    var windowWidth = $(window).outerWidth();

    // Resize the following elements on window resize...
    $(window).resize(function() {
      // Update windowWide on browser resize
      windowWidth = $(window).outerWidth();
    });


    // When the user clicks the "See For Yourself" button the following
    // jQuery actions are triggered.
    $('.see-button').click(function() {

      // One every click flop visShowing so we know if the
      // vis is showing or not.
      visShowing = !visShowing;

      // Show the visualizations below
      $("#vis-wrapper *").show();
      window.scrollTo(0, 0);

      // Slide the landing page left
      $('#landing-wrapper').animate({ left: - (windowWidth - 29), }, 1500, 'easeOutExpo', function() {        

        // Hide all text that could potentially "poke out" into sidebar gutter.
        $('#landing-wrapper p, #landing-wrapper #footer').hide();

        // Since the landing page is in a fixed position, we need this.
        $(this).css('position', 'fixed');

        // Fade in the social buttons, and the "Show Introduction" link.
        $('.show-landing, #social-wrapper').fadeIn(700);

      }); // End slide landing page left

      // ----------------------------------- INITIALIZE D3 STUFF ------------------------------------- //
      
      // Only append the bars and pies if this is the first run,
      // as the user can click "Show Introduction"/"See for Yourself" many times.
      if(firstRunRan == false) firstRun();
      firstRunRan = true;

    }); // End .see-button.click()


    // When the user clicks the "Show Introduction" link the following
    // jQuery actions are triggered
    $('.show-landing').click(function() {

      visShowing = !visShowing;

      // Hide the "Show Landing" link and social buttons
      $('.show-landing, #social-wrapper').hide();
      $("#landing-wrapper").css('position', 'absolute');

      // Replace any text we hid before
      $('#landing-wrapper p, #landing-wrapper #footer').show();

      // Slide the landing page right
      $('#landing-wrapper').css('width', '100%').animate({ left: 0, }, 2000, 'easeOutExpo', function() { 
        // Hide the visualizations
        $("#vis-wrapper *").hide();
      });

      // Scroll to the top of the page.
      $('html, body').animate({ scrollTop:0 }, 0);

    }); // End .show-landing.click()


    // Social button "on click" handlers. Each calls the openSocial() function with the respective
    // social link as its argument.
    $('.social-button.facebook').click(function() { openSocial('https://www.facebook.com/sharer/sharer.php?u=') });
    $('.social-button.twitter').click(function() { openSocial('https://twitter.com/home?status=') });
    $('.social-button.google').click(function() { openSocial('https://plus.google.com/share?url=') });
    $('.social-button.git').click(function() { openSocial("git") });

    // To close the sources box
    $('.close-sources').click(function() {
      $('#data-sources-div').fadeOut("slow");
    });

    // To toggle the sources box
    $('#data-sources').click(function() {
      $('#data-sources-div').fadeToggle("slow");
    });


    // Initialize the Visualization. 
    // I.E. Grab the data and instantiate the data variables, etc.
    init();

  }); // End Document.ready()

})(jQuery); // End AIRF