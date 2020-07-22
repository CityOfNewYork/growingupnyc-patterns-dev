'use strict';

/**
 * Smothh scroll
 */

var Scroll = function Scroll() {
  this.scrollTo();
};

Scroll.prototype.scrollTo = function scrollTo() {
  var links = document.querySelectorAll(Scroll.selector);
  links.forEach(function (each) {
    return each.onclick = Scroll.scrollAnchors;
  });
};

Scroll.scrollAnchors = function (e, respond) {
  if (respond === void 0) respond = null;

  var distanceToTop = function (el) {
    return Math.floor(el.getBoundingClientRect().top);
  };

  e.preventDefault();
  var targetID = respond ? respond.getAttribute('href') : this.getAttribute('href');
  var targetAnchor = document.querySelector(targetID);

  if (!targetAnchor) {
    return;
  }

  var originalTop = distanceToTop(targetAnchor);
  window.scrollBy({
    top: originalTop,
    left: 0,
    behavior: 'smooth'
  });
  var checkIfDone = setInterval(function () {
    var atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;

    if (distanceToTop(targetAnchor) === 0 || atBottom) {
      targetAnchor.tabIndex = '-1';
      targetAnchor.focus();
      window.history.pushState('', '', targetID);
      clearInterval(checkIfDone);
    }
  }, Scroll.duration);
}; // Adds smooth scroll to elements containing Scroll.selector class.


Scroll.selector = '.scroll';
Scroll.duration = 700;

module.exports = Scroll;
