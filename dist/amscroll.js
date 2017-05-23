'use strict';function amScroll(opt){var _this=this;this.opts=opt||{};this.opts.selector=this.opts.selector||'[data-amScroll]';this.opts.faderSelector=this.opts.faderSelector||'[data-fadeonscroll]';this.opts.stuckClass=this.opts.stuckClass||'stuck';this.opts.name=this.opts.name||'amScroll'+new Date().getTime();this.opts.includeHeight=this.opts.includeHeight||false;this.opts.fixPosition=this.opts.fixPosition||false;this.scrolling=false;this.fixedEls=[];var requestScroll=function requestScroll(){if(!_this.scrolling){window.requestAnimationFrame(_this.update);_this.scrolling=true}};var setOffsets=function setOffsets(){for(var e=0;e<_this.elLength;e++){var el=_this.elements[e];var fixAt=el.getBoundingClientRect().top>0?el.getBoundingClientRect().top:el.getBoundingClientRect().top+scrollY;el.setAttribute('data-fix-at',fixAt)}};var init=function init(){_this.fixAt=0;addElements()};var addElements=function addElements(){_this.elements=document.querySelectorAll(_this.opts.selector);_this.elLength=_this.elements.length;_this.fadeElements=document.querySelectorAll(_this.opts.faderSelector);_this.fadeElLength=_this.fadeElements.length;setOffsets()};this.update=function(){var scrollY=window.scrollY;for(var e=0;e<_this.elLength;e++){var el=_this.elements[e];if(el.getBoundingClientRect().top<_this.fixAt&&_this.fixedEls.indexOf(e)<0){_this.fixedEls.push(e);el.classList.add(_this.opts.stuckClass);if(_this.opts.fixPosition){el.style.top=_this.fixAt+'px';el.style.position='fixed';_this.fixAt+=el.clientHeight}}else if(parseInt(el.getAttribute('data-fix-at'),10)-scrollY>_this.fixAt&&_this.fixedEls.indexOf(e)>-1){_this.fixedEls.splice(_this.fixedEls.indexOf(e),1);_this.fixAt-=el.clientHeight;el.classList.remove(_this.opts.stuckClass);if(_this.opts.fixPosition){el.style.position='relative';el.style.top='0'}}document.body.style.paddingTop=_this.fixAt+'px'}for(var e=0;e<_this.fadeElLength;e++){var _el=_this.fadeElements[e];var offTop=_el.offsetTop;var elHeight=_el.offsetHeight;var opacity=((offTop-scrollY+elHeight)/elHeight).toFixed(3);if(offTop-scrollY<0&&opacity>=0){_el.setAttribute('style','opacity:'+opacity)}}_this.scrolling=false};init();return{scroller:requestScroll,addElements:addElements}}module.exports=amScroll;