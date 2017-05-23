const amScroll = require('../dist/amscroll');

var scroller = new amScroll({
  faderSelector: '.fader',
  fixPosition: true
});

window.addEventListener('scroll', scroller.scroller, false);

const insertPoint = document.getElementById('testAddAnchorPoint');
const testDiv = document.createElement('div');
testDiv.setAttribute('data-amScroll', true);
testDiv.setAttribute('class', 'additional-el');
testDiv.innerHTML = "<h2>Helloo, I should be fixed</h2>";
insertPoint.appendChild(testDiv);
scroller.addElements()
