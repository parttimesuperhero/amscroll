function amScroll (opt) {
  // optional params
  this.opts = opt || {}
  this.opts.selector = this.opts.selector || '[data-amScroll]'
  this.opts.faderSelector = this.opts.faderSelector || '[data-fadeonscroll]'
  this.opts.stuckClass = this.opts.stuckClass || 'stuck'
  this.opts.name = this.opts.name || 'amScroll' + new Date().getTime()
  this.opts.includeHeight = this.opts.includeHeight || false
  this.opts.fixPosition = this.opts.fixPosition || false

  // private data
  this.scrolling = false
  this.fixedEls = [];


  // private functions
  const requestScroll = () => {
    if(!this.scrolling) {
      window.requestAnimationFrame(this.update);
      this.scrolling = true;
    }
  }

  const setOffsets = () => {
    for (var e = 0; e < this.elLength; e++) {
      let el = this.elements[e];
      let i = e;
      let fixPos = 0;
      let tmpEl;
      let fixAt = el.offsetTop;

      while (tmpEl = this.elements[i - 1]) {
        let elStyles  = getComputedStyle(tmpEl);
        let borderTop  = 0;
        let borderBottom  = 0;
        let addBorder = elStyles.getPropertyValue('box-sizing') !== 'border-box';

        if( addBorder ) {
          borderTop = elStyles.getPropertyValue('border-top-width')
                        .replace("px", "")
          borderBottom = elStyles.getPropertyValue('border-bottom-width')
                          .replace("px", "")
        }

        fixPos += tmpEl.offsetHeight + borderTop + borderBottom;
        i--;
      }

      el.setAttribute('data-fix-at', fixAt);
      el.setAttribute('data-fix-pos', fixPos);
      el.setAttribute('data-pad-top', fixPos + el.offsetHeight);
    }
  }

  const init = () => {
    this.elements = document.querySelectorAll(this.opts.selector);
    this.elLength = this.elements.length;
    this.fadeElements = document.querySelectorAll(this.opts.faderSelector);
    this.fadeElLength = this.fadeElements.length;
    setOffsets();
  }

  this.update = () => {
    let scrollY = window.scrollY;

    for (var e = 0; e < this.elLength; e++) {
      let el = this.elements[e],
        fixAt = parseInt(el.getAttribute('data-fix-at'), 10),
        fixPos = parseInt(el.getAttribute('data-fix-pos'), 10),
        padTop = parseInt(el.getAttribute('data-pad-top'), 10),
        offSet = this.opts.includeHeight ? el.offsetHeight : 0

      fixAt += this.opts.includeHeight ? el.offsetHeight : 0;

      if (scrollY > fixAt - fixPos && this.fixedEls.indexOf(e) < 0) {
        this.fixedEls.push(e);
        el.classList.toggle(this.opts.stuckClass, true);
        if (this.opts.fixPosition) {
          document.body.style.paddingTop = `${padTop}px`;
          el.style.top = `${fixPos}px`;
          el.style.position = "fixed";
        }
      } else if (scrollY < fixAt - fixPos - offSet || scrollY <= 0) {
        this.fixedEls.splice(this.fixedEls.indexOf(e), 1);
        el.classList.remove(this.opts.stuckClass);
        if (this.opts.fixPosition) {
          el.style.position = "relative";
          el.style.top = "0";
          document.body.style.paddingTop = this.elements[e - 1] ? this.elements[e - 1].getAttribute('data-pad-top') : 0;
        }
      }
    }

    // Scroll Faders
    for (var e = 0; e < this.fadeElLength; e++) {
      let el = this.fadeElements[e];
      let offTop = el.offsetTop;
      let elHeight = el.offsetHeight;
      let opacity = (((offTop - scrollY) + elHeight ) / elHeight).toFixed(3);

      if (offTop - scrollY < 0 && opacity >= 0) {
        el.setAttribute('style', `opacity:${opacity}`);
      }
    }
    this.scrolling = false;
  }

  init()

  // API/data for end-user
  return {
    scroller: requestScroll
  }
}

module.exports = amScroll;
