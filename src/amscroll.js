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
      let fixAt = el.getBoundingClientRect().top > 0 ? el.getBoundingClientRect().top : el.getBoundingClientRect().top + scrollY;
      el.setAttribute('data-fix-at', fixAt);
    }
  }

  const init = () => {
    this.fixAt = 0;
    addElements()
  }

  const addElements = () => {
    this.elements = document.querySelectorAll(this.opts.selector);
    this.elLength = this.elements.length;
    this.fadeElements = document.querySelectorAll(this.opts.faderSelector);
    this.fadeElLength = this.fadeElements.length;
    setOffsets();
  }

  this.update = () => {
    let scrollY = window.scrollY;

    for (var e = 0; e < this.elLength; e++) {
      let el = this.elements[e];

      if (el.getBoundingClientRect().top < this.fixAt && this.fixedEls.indexOf(e) < 0) {
        this.fixedEls.push(e);
        el.setAttribute('data-stuck', true);
        if (this.opts.fixPosition) {
          el.style.top = `${this.fixAt}px`;
          el.style.position = "fixed";
          this.fixAt += el.clientHeight;
        }
      } else if (parseInt(el.getAttribute('data-fix-at'), 10) - scrollY > this.fixAt && this.fixedEls.indexOf(e) > -1) {
        this.fixedEls.splice(this.fixedEls.indexOf(e), 1);
        this.fixAt -= el.clientHeight;
        el.setAttribute('data-stuck', false);

        if (this.opts.fixPosition) {
          el.style.position = "relative";
          el.style.top = "0";
        }
      }
      document.body.style.paddingTop = `${this.fixAt}px`;
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
    scroller: requestScroll,
    addElements: addElements
  }
}

module.exports = amScroll;
