/*
 * Off-canvas pattern for navigation.
 *
 * Dependancies:
 *   jQuery
 *   throttledresize.js (optional) - https://github.com/louisremi/jquery-smartresize
 *
 * Author:
 *   James Taylor
 *
 * Date:
 *   23/01/2015
 *
 * HTML Pattern:
   <div class="js-container">

     <p class="skip-to-nav"><a href="#global-nav">Menu</a></p>

     <nav id="global-nav" class="nav-global-primary">
       ... navigation html ...
     </nav>

   </div>
 *
 */

(function (win, doc, $) {
    'use strict';

    if (!doc.querySelector || !win.addEventListener) {
        console.log('This browser don\'t cut the Mustard - Exiting off-canvas nav');
        return;
    }

    var menuActivated = false, // so skiplink event is only applied once
        mobileBreakPoint  = 623, // set to null if you want a permanent off canvas menu
        configureMenu = function () {

          var toggleclass        = 'slid',
              $page             = $('.js-container'),
              $primary          = $('.nav-global-primary'),
              $skiplink         = $('.skip-to-nav'),
              $newnav           = $(doc.createElement('div')),
              $body             = $('body'),
              togglePage = function(e) {
                  e.preventDefault();
                  $page.toggleClass(toggleclass);
              };

          if ($body.width() < mobileBreakPoint || mobileBreakPoint === null) {
              // If the viewport is small enough, use the off-canvas pattern for navigation
              if (!$page || !$primary || !$skiplink) {
                  return;
              }
              if (!menuActivated) {
                $skiplink.click(togglePage);
                menuActivated = true;
              }
              if ($('.js-offcanvas').length < 1) { // if off-canvas menu does not exist
                $newnav.append($primary);
                $newnav.addClass('js-offcanvas');
                $body.append($newnav); // create it and append to body
              } else {
                $('.js-offcanvas').append($primary); // append primary to off canvas menu
              }
              $skiplink.addClass('persist');

          } else {
              // If the viewport is large enough, reset the off-canvas navigation
              $skiplink.after($primary).removeClass('persist');
              $page.removeClass(toggleclass);
          }
        };

    if (mobileBreakPoint !== null) {
       if (!$.event.special.throttledresize) {
           console.log('throttledresize function is missing - Navigation will not change when the viewport resizes');
       } else {
           // reconfigure menu when viewport is resized
           $(window).on("throttledresize", function () {
             configureMenu();
           });
       }
    }

    configureMenu();

}(this, this.document, jQuery));
