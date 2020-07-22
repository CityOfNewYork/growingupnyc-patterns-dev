'use strict';

/**
 * Smothh scroll
 */

class Scroll {
  constructor() {

  this.scrollTo()
}

  scrollTo() {
    const links = document.querySelectorAll(Scroll.selector);
    links.forEach(each => (each.onclick = Scroll.scrollAnchors));
  }
}

Scroll.scrollAnchors = function(e, respond = null) {
  const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
  e.preventDefault();
  var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
  const targetAnchor = document.querySelector(targetID);
  if (!targetAnchor) return;
  const originalTop = distanceToTop(targetAnchor);
  window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
  const checkIfDone = setInterval(function() {
    const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
    if (distanceToTop(targetAnchor) === 0 || atBottom) {
      targetAnchor.tabIndex = '-1';
      targetAnchor.focus();
      window.history.pushState('', '', targetID);
      clearInterval(checkIfDone);
    }
  }, Scroll.duration);
}

// Adds smooth scroll to elements containing Scroll.selector class.
Scroll.selector = '.scroll';
Scroll.duration = 700;

export default Scroll;
