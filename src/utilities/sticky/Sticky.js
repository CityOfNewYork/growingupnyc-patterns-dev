'use strict';

/**
 * Static column module
 * Similar to the general sticky module but used specifically when one column
 * of a two-column layout is meant to be sticky
 * @module modules/StickyVanilla
 * @see modules/stickyNav
 */

import forEach from 'lodash/forEach';
// import throttle from 'lodash/throttle';
// import debounce from 'lodash/debounce';

class StickyVanilla {
  constructor(mediaQuery) {
    let screen = mediaQuery || StickyVanilla.mediaQuery

    this._settings = {
        selector: StickyVanilla.selector,
        footer: StickyVanilla.footer,
        stickyContainer: StickyVanilla.stickyContainer
      };

    const stickyContent = document.querySelectorAll(`.${this._settings.selector}`);
    const footer = document.querySelector(`.${this._settings.footer}`);
    const stickyContainer = document.querySelector(`.${this._settings.stickyContainer}`);

    let isSticky = false; // Whether the sidebar is sticky at this exact moment in time

    let desktop = window.matchMedia(screen);
    let isDesk = desktop.matches;
    if (isDesk) {
      StickyVanilla.updateDimensions(stickyContainer, stickyContent);
    }

    window.onresize = function () {
			isDesk = desktop.matches;
			console.log("Sticky" + isDesk)
      if(isDesk) {
        StickyVanilla.updateDimensions(stickyContainer, stickyContent);
      } else {
        StickyVanilla.resetWidth(stickyContent)
      }
    };

      /**
       * Calculates the window position and sets the appropriate class on the element
       * @param {object} stickyContentElem - DOM node that should be stickied
       */
      this.assignStickyFeature(stickyContent, footer, isSticky);
      this.snapToFooter(footer, stickyContent);
      // StickyVanilla.resize(stickyContainer, stickyContent)
}

/**
 * Calles the function StickyVanilla.calcWindowPos and passes arguments to determin when to apply or remove sticky class
 * @param {elements} stickyContent elements with the class 'js-sticky'
 * @param {*} footer footer element with class name 'c-footer__reached'
 * @param {boolean} isSticky boolean
 */
assignStickyFeature(stickyContent, footer, isSticky) {
  if (stickyContent) {
    forEach(stickyContent, function(stickyContentElem) {
      StickyVanilla.calcWindowPos(stickyContentElem, isSticky);
      /**
      * Add event listener for 'scroll'.
      * @function
      * @param {object} event - The event object
      */
      window.addEventListener('scroll', function() {
        StickyVanilla.calcWindowPos(stickyContentElem, footer);
      }, false);

      /**
      * Add event listener for 'resize'.
      * @function
      * @param {object} event - The event object
      */
      window.addEventListener('resize', function() {
        StickyVanilla.calcWindowPos(stickyContentElem, footer);
      }, false);
    });
  }
}

/**
 * When footer is scrolled up tp the screen a 'stuck' class will be added to the sticky container and will be forced to stuck with the footer
 * @param {element} footer footer element
 * @param {element} stickyContent elements with the class 'js-sticky'
 */
snapToFooter(footer, stickyContent) {
    window.addEventListener('scroll', function() {
      var position = footer.getBoundingClientRect();

      // checking whether fully visible
      if(position.top >= 0 && position.bottom <= window.innerHeight) {
        // console.log('Element is fully visible in screen ');
        forEach(stickyContent, function(stickyContentElem) {
          stickyContentElem.classList.add(StickyVanilla.StuckClass);
        });
      }

      forEach(stickyContent, function(stickyContentElem) {
        var positionSticky = stickyContentElem.getBoundingClientRect();
        if (positionSticky.top >= 0) {
          stickyContentElem.classList.remove(StickyVanilla.StuckClass);
        };
      })
    });
  }
}

/**
 * On screen resize the sticky nav element width will be adjusted with the width of it's parent container
 * @param {element} stickyContainer
 * @param {element} stickyContent
 */
StickyVanilla.updateDimensions = function(stickyContainer, stickyContent) {
  let stickyContainerWidth = stickyContainer.clientWidth;

  forEach(stickyContent, function(stickyContentElem) {
    stickyContentElem.style.width = `${stickyContainerWidth}px`;
   })
}

/**
 * On mobile the sticky nav element width with be left to span though full width of the screen size
 * @param {*} stickyContent element with class name 'js-sticky'
 */
StickyVanilla.resetWidth = function(stickyContent) {
  forEach(stickyContent, function(stickyContentElem) {
    stickyContentElem.style.width = "";
   })
}

/**
 * When the sticky nav reaches the top of the screen stikcy class will be added
 * @param {element} stickyContentElem
 * @param {boolean} isSticky
 */

StickyVanilla.calcWindowPos = function(stickyContentElem, isSticky) {
  const articleContent = document.querySelector('.js-sticky-article');

  let elemTop = stickyContentElem.parentElement.getBoundingClientRect().top;

  // Sets element to position absolute if not scrolled to yet.
  // Absolutely positioning only when necessary and not by default prevents flickering
  // when removing the "is-bottom" class on Chrome
  if (elemTop > 0) {
    stickyContentElem.classList.remove(StickyVanilla.StickyClass);
    articleContent.classList.remove(StickyVanilla.AddLeftMargin);
  } else {
    isSticky = true;
    stickyContentElem.classList.add(StickyVanilla.StickyClass);
    articleContent.classList.add(StickyVanilla.AddLeftMargin);
  }
}


StickyVanilla.selector = 'js-sticky';
StickyVanilla.footer = 'c-footer__reached';
StickyVanilla.stickyContainer = 'o-article-sidebar';
StickyVanilla.StickyClass = 'is-sticky';
StickyVanilla.StuckClass = 'is-stuck';
StickyVanilla.AddLeftMargin = 'o-article--shift';
StickyVanilla.mediaQuery = '(min-width: 1024px)';


export default StickyVanilla;