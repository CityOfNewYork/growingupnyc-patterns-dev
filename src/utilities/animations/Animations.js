'use strict';

import forEach from 'lodash/forEach';

class Animations {
  
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