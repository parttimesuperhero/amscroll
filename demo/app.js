const amScroll = require('../dist/amscroll');

let scroller = new amScroll();
window.addEventListener('scroll', scroller.scroller, false);
