function amScroll (opt) {
  // optional params
  this.opts = opt || {}
  this.opts.selector = this.opts.selector || '[data-amScroll]'
  this.opts.stuckClass = this.opts.stuckClass || 'stuck'
  this.opts.name = this.opts.name || 'amScroll' + new Date().getTime()
  this.opts.includeHeight = this.opts.includeHeight || false

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
    setOffsets();
  }

  this.update = () => {
    for (var e = 0; e < this.elLength; e++) {
      let el = this.elements[e],
        fixAt = parseInt(el.getAttribute('data-fix-at'), 10),
        fixPos = parseInt(el.getAttribute('data-fix-pos'), 10),
        padTop = parseInt(el.getAttribute('data-pad-top'), 10),
        offSet = this.opts.includeHeight ? el.offsetHeight : 0

      fixAt += this.opts.includeHeight ? el.offsetHeight : 0;

      if (window.scrollY > fixAt - fixPos && this.fixedEls.indexOf(e) < 0) {
        this.fixedEls.push(e);
        document.body.style.paddingTop = `${padTop}px`;
        el.classList.toggle(this.opts.stuckClass, true);
        el.style.top = `${fixPos}px`;
        el.style.position = "fixed";
      } else if (window.scrollY < fixAt - fixPos - offSet || window.scrollY <= 0) {
        el.classList.remove(this.opts.stuckClass)
        el.style.position = "relative";
        el.style.top = "0";
        this.fixedEls.splice(this.fixedEls.indexOf(e), 1);
        document.body.style.paddingTop = this.elements[e - 1] ? this.elements[e - 1].getAttribute('data-pad-top') : 0;
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
