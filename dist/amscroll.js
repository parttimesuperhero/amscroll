'use strict';

function amScroll(opt) {
  var _this = this;

  this.opts = opt || {};
  this.opts.selector = this.opts.selector || '[data-amScroll]';
  this.opts.faderSelector = this.opts.faderSelector || '[data-fadeonscroll]';
  this.opts.stuckClass = this.opts.stuckClass || 'stuck';
  this.opts.name = this.opts.name || 'amScroll' + new Date().getTime();
  this.opts.includeHeight = this.opts.includeHeight || false;
  this.opts.fixPosition = this.opts.fixPosition || false;

  this.scrolling = false;
  this.fixedEls = [];

  var requestScroll = function requestScroll() {
    if (!_this.scrolling) {
      window.requestAnimationFrame(_this.update);
      _this.scrolling = true;
    }
  };

  var setOffsets = function setOffsets() {
    for (var e = 0; e < _this.elLength; e++) {
      var el = _this.elements[e];
      var i = e;
      var fixPos = 0;
      var tmpEl = void 0;
      var fixAt = el.offsetTop;

      while (tmpEl = _this.elements[i - 1]) {
        var elStyles = getComputedStyle(tmpEl);
        var borderTop = 0;
        var borderBottom = 0;
        var addBorder = elStyles.getPropertyValue('box-sizing') !== 'border-box';

        if (addBorder) {
          borderTop = elStyles.getPropertyValue('border-top-width').replace("px", "");
          borderBottom = elStyles.getPropertyValue('border-bottom-width').replace("px", "");
        }

        fixPos += tmpEl.offsetHeight + borderTop + borderBottom;
        i--;
      }

      el.setAttribute('data-fix-at', fixAt);
      el.setAttribute('data-fix-pos', fixPos);
      el.setAttribute('data-pad-top', fixPos + el.offsetHeight);
    }
  };

  var init = function init() {
    _this.elements = document.querySelectorAll(_this.opts.selector);
    _this.elLength = _this.elements.length;
    _this.fadeElements = document.querySelectorAll(_this.opts.faderSelector);
    _this.fadeElLength = _this.fadeElements.length;
    setOffsets();
  };

  this.update = function () {
    var scrollY = window.scrollY;

    for (var e = 0; e < _this.elLength; e++) {
      var el = _this.elements[e],
          fixAt = parseInt(el.getAttribute('data-fix-at'), 10),
          fixPos = parseInt(el.getAttribute('data-fix-pos'), 10),
          padTop = parseInt(el.getAttribute('data-pad-top'), 10),
          offSet = _this.opts.includeHeight ? el.offsetHeight : 0;

      fixAt += _this.opts.includeHeight ? el.offsetHeight : 0;

      if (scrollY > fixAt - fixPos && _this.fixedEls.indexOf(e) < 0) {
        _this.fixedEls.push(e);
        el.classList.toggle(_this.opts.stuckClass, true);
        if (_this.opts.fixPosition) {
          document.body.style.paddingTop = padTop + 'px';
          el.style.top = fixPos + 'px';
          el.style.position = "fixed";
        }
      } else if (scrollY < fixAt - fixPos - offSet || scrollY <= 0) {
        _this.fixedEls.splice(_this.fixedEls.indexOf(e), 1);
        el.classList.remove(_this.opts.stuckClass);
        if (_this.opts.fixPosition) {
          el.style.position = "relative";
          el.style.top = "0";
          document.body.style.paddingTop = _this.elements[e - 1] ? _this.elements[e - 1].getAttribute('data-pad-top') : 0;
        }
      }
    }

    for (var e = 0; e < _this.fadeElLength; e++) {
      var _el = _this.fadeElements[e];
      var offTop = _el.offsetTop;
      var elHeight = _el.offsetHeight;
      var opacity = ((offTop - scrollY + elHeight) / elHeight).toFixed(3);

      if (offTop - scrollY < 0 && opacity >= 0) {
        _el.setAttribute('style', 'opacity:' + opacity);
      }
    }
    _this.scrolling = false;
  };

  init();

  return {
    scroller: requestScroll
  };
}

module.exports = amScroll;