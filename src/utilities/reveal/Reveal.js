'use strict';

class Reveal {

  constructor(elNumber) {
		this._settings = {
			target: Reveal.target,
			trigger: Reveal.trigger
		};

    const numElements = isNaN(elNumber) ? 1 : elNumber;
    const content = document.querySelector(this._settings.target);
    const trigger = document.querySelector(this._settings.trigger);

    window.onresize = function () {
      if (trigger.style.display !== 'none') {
        Reveal.updateHeight(content, trigger, numElements);
      }
    }

		// If the number of child elemets and the argument passed is the same hide the 'See more age guides' buttom
    if(numElements === content.children.length) {
      trigger.style.display = 'none';
    }

		// On click set the height of the container to auto, change the overlow to visible and hide the 'See more age guides' buttom
    trigger.addEventListener('click', function(e) {
      trigger.style.display = 'none';
      content.style.overflow = 'visible';
      content.style.height = 'auto';
    })

    Reveal.updateHeight(content, trigger, numElements);
  }
}

/**
 *Updates the hight of the container tobe the height of a child element multipleid but the argument elNumber
 * @param {element} content div containing the
 * @param {element} trigger Buttom element that reveals all child elements
 * @param {number} elNumber Initially tHe number of child elements on display
 */
Reveal.updateHeight = function(content, trigger, elNumber) {

  if (content.childElementCount < 2) {
    trigger.style.display = 'none';
  } else {
    var newHeight = 0;
    for (let i = 0; i < elNumber; i++) {
      newHeight += content.children[i].offsetHeight;
    }

		content.style.height = newHeight + 'px';
    content.style.overflow = 'hidden';
  }
}

Reveal.target = '[data-js*=reveal-content]';
Reveal.trigger = '[data-js*=reveal-trigger]';

export default Reveal;