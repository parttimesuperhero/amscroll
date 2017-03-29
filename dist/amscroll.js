'use strict';function amScroll(opt){var _this=this;this.opts=opt||{};this.opts.selector=this.opts.selector||'[data-amScroll]';this.opts.name=this.opts.name||'amScroll'+new Date().getTime();this.scrolling=false;var requestScroll=function requestScroll(){if(!_this.scrolling){window.requestAnimationFrame(_this.update);_this.scrolling=true}};var setOffsets=function setOffsets(){for(var e=0;e<_this.elLength;e++){var el=_this.elements[e];var i=e;var fixPos=0;var tmpEl=void 0;while(tmpEl=_this.elements[i-1]){var elStyles=getComputedStyle(tmpEl);var borderTop=0;var borderBottom=0;var addBorder=elStyles.getPropertyValue('box-sizing')!=='border-box';if(addBorder){borderTop=elStyles.getPropertyValue('border-top-width').replace('px','');borderBottom=elStyles.getPropertyValue('border-bottom-width').replace('px','')}fixPos+=tmpEl.offsetHeight+borderTop+borderBottom;i--}el.setAttribute('data-fix-at',el.offsetTop);el.setAttribute('data-fix-pos',fixPos);el.setAttribute('data-pad-top',fixPos+el.offsetHeight)}};var init=function init(){_this.elements=document.querySelectorAll(_this.opts.selector);_this.elLength=_this.elements.length;setOffsets()};this.update=function(){for(var e=0;e<_this.elLength;e++){var el=_this.elements[e],fixAt=parseInt(el.getAttribute('data-fix-at'),10),fixPos=parseInt(el.getAttribute('data-fix-pos'),10),padTop=parseInt(el.getAttribute('data-pad-top'),10);if(window.scrollY>=fixAt-fixPos){document.documentElement.style.paddingTop=padTop+'px';el.style.top=fixPos+'px';el.style.position='fixed'}else if(window.scrollY<fixAt){document.documentElement.style.paddingTop=_this.elements[e-1]?_this.elements[e].getAttribute('data-pad-top'):0;el.style.position='relative';el.style.top='0'}}_this.scrolling=false};init();return{scroller:requestScroll}}module.exports=amScroll;