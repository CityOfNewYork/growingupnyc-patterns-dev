'use strict';

class Offcanvas {

  constructor(settings) {

    this._settings = {
      sideSelector: (settings.sideSelector) ? settings.sideSelector : Offcanvas.side,
      nav: (settings.nav) ? settings.nav : Offcanvas.nav,
      mainOff: (settings.mainOff) ? settings.mainOff : Offcanvas.mainOff,
      offCanvas: (settings.offCanvas) ? settings.offCanvas : Offcanvas.offCanvas
    };

    const nav = document.querySelector(this._settings.nav)
    const mainOff = document.querySelector(this._settings.mainOff)
    // const footer = document.querySelector('.c-footer')
    const offcanvasParent = document.querySelector(this._settings.offCanvas)
    const offCanvas = document.querySelectorAll(this._settings.offCanvas);

    // Depending on the argument passed toggle element class
    mainOff.classList.toggle(`o-offcanvas__main-${this._settings.sideSelector}`)

    // Offcanvas element
    if (offCanvas) {
      offCanvas.forEach((offCanvasElem) => {
        const offCanvasSide = offCanvasElem.querySelector(this._settings.nav);

        /**
        * Add event listener for 'changeOpenState'.
        * The value of event.detail indicates whether the open state is true
        * (i.e. the offcanvas content is visible).
        * @function
        * @param {object} event - The event object
        */
        offCanvasElem.addEventListener('changeOpenState', function (event) {

          if (event.detail) {
            if (!(/^(?:a|select|input|button|textarea)$/i.test(offCanvasSide.tagName))) {
              offCanvasSide.tabIndex = -1;
            }
            offCanvasSide.focus();
          }
        }, false);
      });
    }

    // Offcanvas.toggle(openClass, nav, mainOff, footer, offcanvasParent);
    Offcanvas.toggle(this._settings.sideSelector, nav, mainOff, offcanvasParent);
  }
}

// Offcanvas.toggle = function (openClass, nav, mainOff, footer, offcanvasParent){
Offcanvas.toggle = function (dir, nav, mainOff, offcanvasParent){
  const openClass = `is-open-${dir}`;
  const linkActiveClass = 'is-active';
  const toggleElems = document.querySelectorAll('[data-js]');

  if (!toggleElems) return;

  /**
  * For each toggle element, get its target from the data-toggle attribute.
  * Bind an event handler to toggle the openClass on/off on the target element
  * when the toggle element is clicked.
  */
  toggleElems.forEach((toggleElem) => {
    const targetElemSelector = Offcanvas.dataset(toggleElem, 'js');

    if (!targetElemSelector) return;

    const targetElem = document.getElementById(targetElemSelector);

    if (!targetElem) return;

    toggleElem.addEventListener('click', function (event) {
      let toggleEvent;
      let toggleClass = (toggleElem.dataset.toggleClass) ?
        toggleElem.dataset.toggleClass : openClass;

      event.preventDefault();

      // Toggle the element's active class
      toggleElem.classList.toggle(linkActiveClass);
      nav.classList.toggle(`o-offcanvas__side-${dir}`)
      

      // Toggle custom class if it is set
      if (toggleClass !== openClass)
        targetElem.classList.toggle(toggleClass);
      // Toggle the default open class
      targetElem.classList.toggle(openClass);

      // Toggle the appropriate aria hidden attribute
      targetElem.setAttribute('aria-hidden',
        !(targetElem.classList.contains(toggleClass))
      );

      // Fire the custom open state event to trigger open functions
      if (typeof window.CustomEvent === 'function') {
        toggleEvent = new CustomEvent('changeOpenState', {
          detail: targetElem.classList.contains(openClass)
        });
      } else {
        toggleEvent = document.createEvent('CustomEvent');
        toggleEvent.initCustomEvent('changeOpenState', true, true, {
          detail: targetElem.classList.contains(openClass)
        });
      }

      targetElem.dispatchEvent(toggleEvent);
    });
  });
}

Offcanvas.updateDimension = function (nav, mainOff, offcanvasParent) {
  let navHeight = nav.clientHeight;
  let classes = offcanvasParent.classList;
  let openDown = classes.contains('is-open-down')

  if (openDown) {
    mainOff.style.top = 0;
  } else {
    mainOff.style.top = `${navHeight}px`;
  }
}

Offcanvas.dataset = function (elem, attr) {
  if (typeof elem.dataset === 'undefined') {
    return elem.getAttribute('data-' + attr);
  }
  return elem.dataset[attr];
}

/**
 * Defaults
 */
// starting location
Offcanvas.side = "right";

// the side nav
Offcanvas.nav = ".js-offcanvas__side";

// the main contnet
Offcanvas.mainOff = ".js-offcanvas__main";

// the offcanvas trigger
Offcanvas.offCanvas = ".js-offcanvas";

export default Offcanvas;