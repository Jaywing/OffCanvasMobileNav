/*
 * Off-canvas pattern for navigation.
 *
 * Dependancies:
 *   jQuery
 *   throttledresize.js - https://github.com/louisremi/jquery-smartresize
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
 * OPTIONS
 *   Set *mobileBreakPoint* to *null* to show the offcanvas menu in all viewport sizes
 *
 */

(function (win, doc, $) {
    'use strict';

    if (!doc.querySelector || !win.addEventListener) {
        console.log('This browser don\'t cut the Mustard - Exiting off-canvas nav');
        return;
    }

    var menuActivated = false, // so skiplink event is only applied once
        configureMenu = function () {

          var toggleclass        = 'slid',
              $page             = $('.js-container'),
              $primary          = $('.nav-global-primary'),
              $skiplink         = $('.skip-to-nav'),
              $newnav           = $(doc.createElement('div')),
              $body             = $('body'),
              mobileBreakPoint  = 623,
              togglePage = function(e) {
                  e.preventDefault();
                  $page.toggleClass(toggleclass);
              };

          if ($body.width() < mobileBreakPoint) {
              // If the viewport is small enough, use the off-canvas pattern for navigation
              if (!$page || !$primary || !$skiplink) {
                  return;
              }
              if(!menuActivated) {
                $skiplink.click(togglePage);
                menuActivated = true;
              }
              $newnav.append($primary);
              $newnav.addClass('js-offcanvas');
              $skiplink.addClass('persist');
              $body.append($newnav);
          } else {
              // If the viewport is large enough, reset the off-canvas navigation
              $skiplink.after($primary).removeClass('persist');
              $page.removeClass(toggleclass);
          }
        };

    if(!$.event.special.throttledresize) {
        console.log('throttledresize is missing - Nav will not reconfigure on resize');
    } else {
        // reconfigure menu when viewport is resized
        $(window).on("throttledresize", function () {
          configureMenu();
        });
    }

    configureMenu();

}(this, this.document, jQuery));
