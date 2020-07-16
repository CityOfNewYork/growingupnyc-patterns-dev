'use strict';

import forEach from 'lodash/forEach';

/**
 * The Animations module
 * @class
 */
class Animations {
  /**
   * @param  {object} settings This could be some configuration options.
   *                           for the pattern module.
   * @param  {object} data     This could be a set of data that is needed
   *                           for the pattern module to render.
   * @constructor
   */
  constructor() {

    this._settings = {
      selector: Animations.selector,
      controller: Animations.controller,
      speed: Animations.speed,
    };

    const rotating = document.querySelectorAll(this._settings.selector);
    var terms = [];

    forEach(rotating, function (term) {
      if (term.innerText.trim() !== '') {
        terms.push(term.innerText);
      }
    })

    Animations.rotateTerms(terms, this._settings.controller, this._settings.speed)
  }
}

/**
 * Rotates text and updates fade class on element
 * @param {*} terms 
 * @param {*} control 
 * @param {*} speed 
 */
Animations.rotateTerms = function (terms, control, speed) {
  const controller = document.querySelector(control)

  controller.innerText = terms[0].trim();
  Animations.fadeInOut(controller);

  var i = 1;
  setInterval(function () {
    if (i == terms.length) {
      i = 0;
    }
    controller.innerText = terms[i].trim();
    Animations.fadeInOut(controller);

    i++;
  }, 3000);
}

/**
 * Add fadeIn and fadeOut classes to element
 * @param {*} controller 
 */
Animations.fadeInOut = function(controller){
  controller.classList.add('fadeIn')

  setTimeout(function () {
    controller.classList.add('fadeOut')
    controller.classList.remove('fadeIn')
  }, 2000)

}
Animations.speed = 1500;

Animations.selector = '[data-js*="rotate-text"]';

Animations.controller = '[data-js*="rotate-controller"]';

export default Animations;