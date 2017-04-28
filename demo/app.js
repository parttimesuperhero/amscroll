const amScroll = require('../dist/amscroll');

let scroller = new amScroll({
  includeHeight: true
});
window.addEventListener('scroll', scroller.scroller, false);
