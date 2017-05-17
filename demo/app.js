const amScroll = require('../dist/amscroll');

var scroller = new amScroll({
  faderSelector: '.fader'
});
window.addEventListener('scroll', scroller.scroller, false);

