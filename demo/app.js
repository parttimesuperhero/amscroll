const amScroll = require('../dist/amscroll');

var scroller = new amScroll({
});
window.addEventListener('scroll', scroller.scroller, false);

