# Off Canvas Mobile Navigation Pattern

This implementation follows unobtrusive javascript priciples. 
The Menu stays static on browsers that can not support the pattern or where javascript is disabled.

## Javascript

Use the 'mobileBreakPoint' variable set the width at when the offcanvas menu kicks in.
Setting 'mobileBreakPoint' to 'null' will force the offcanvas menu in all viewport sizes.

### jQuery version

This version has the capability to switch between mobile and desktop view as the browser resizes.
This uses throttleresize.js to acheive this, but is optional and gracefully degrades if it is not included.

### Non jQuery version

This version will not reconfigure the menu when the viewport resizes. It only configures on page load.
