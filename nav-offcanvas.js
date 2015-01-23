/*
 * Off-canvas pattern for navigation.
 *
 * Dependancies:
 *
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

(function (win, doc) {
    'use strict';

    if (!doc.querySelector || !win.addEventListener) {
        console.log('This browser don\'t cut the Mustard - Exiting off-canvas nav');
        return;
    }

    var menuActivated = false, // so skiplink event is only applied once
        configureMenu = function () {

          var toggleclass       = 'slid',
              reg               = new RegExp('(\\s|^)' + toggleclass + '(\\s|$)'),
              page              = doc.querySelector('.js-container'),
              primary           = doc.querySelector('.nav-global-primary'),
              skiplink          = doc.querySelector('.skip-to-nav'),
              newnav            = doc.createElement('div'),
              mobileBreakPoint  = 623,
              togglePage = function(e) {
                  e.preventDefault();
                  if (!page.className.match(reg)) {
                      page.className += ' ' + toggleclass;
                  } else {
                      page.className = page.className.replace(reg, '');
                  }
              };

          if (doc.documentElement.clientWidth < mobileBreakPoint || mobileBreakPoint === null) {
              // If the viewport is small enough, use the off-canvas pattern for navigation
              if (!page || !primary || !skiplink) {
                  return;
              }
              if(!menuActivated) {
                skiplink.addEventListener('click', togglePage, false);;
                menuActivated = true;
              }
              newnav.appendChild(primary);
              newnav.className = 'js-offcanvas';
              skiplink.className = skiplink.className + ' persist';
              doc.body.appendChild(newnav);
          }
        };

    configureMenu();

}(this, this.document));
