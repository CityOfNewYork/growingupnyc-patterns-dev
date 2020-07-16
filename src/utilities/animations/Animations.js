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

    const controller = document.querySelector(this._settings.controller)
    controller.innerHTML = `<span class="animated fadeIn fadeOut">${terms[0].trim()}</span>`;
    const aTag = document.querySelector(".animated");


    setTimeout(function(){
      aTag.classList.remove("fadeIn");
    }, 2700)
    Animations.rotateTerms(terms, controller, this._settings.speed)
  }
}

/**
 * Rotates strings
 * @param {*} terms
 * @param {*} control
 * @param {*} speed
 */

 Animations.rotateTerms = function(terms, controller, speed) {


  var i = 1;
  setInterval(function () {
    if (i == terms.length) {
      i = 0;
    }
    controller.innerHTML = `<span class="animated fadeIn fadeOut">${terms[i].trim()}</span>`;
    let aTag = document.querySelector(".animated")


    setTimeout(function(){
      aTag.classList.remove("fadeIn");
    }, 2700)


    i++;
  }, speed);
}

/**
 * Fades out element
 * Reference: https://stackoverflow.com/questions/28662893/fade-in-and-fade-out-in-pure-javascript-without-jquery
 * @param {*} elem the element
 * @param {*} speed the speed of the interval
 */
// Animations.fadeOut = function(elem, speed) {
//   if (!elem.style.opacity) {
//     elem.style.opacity = 1;
//   }

//   var outInterval = setInterval(function () {
//     elem.style.opacity -= 0.02;
//     if (elem.style.opacity <= 0) {
//       clearInterval(outInterval);
//     }
//   }, speed / 50);
// }

// /**
//  * Fades in element
//  * Reference: https://stackoverflow.com/questions/28662893/fade-in-and-fade-out-in-pure-javascript-without-jquery
//  * @param {*} elem the element
//  * @param {*} speed the speed of the interval
//  */
// Animations.fadeIn = function (elem, speed) {
//   if (!elem.style.opacity) {
//     elem.style.opacity = 0;
//   }

//   var inInterval = setInterval(function () {
//     elem.style.opacity = Number(elem.style.opacity) + 0.02;
//     if (elem.style.opacity >= 1)
//       clearInterval(inInterval);
//   }, speed / 50);
// }

// /**
//  * Fades in and out element
//  * @param {*} elem the element
//  * @param {*} speed the speed of the interval
//  */
// Animations.fadeInOut = function (elem, speed) {
//   if (!elem.style.opacity) {
//     elem.style.opacity = 0;
//   }

//   var inInterval = setInterval(function () {
//     elem.style.opacity = Number(elem.style.opacity) + 0.02;
//     if (elem.style.opacity >= 1){
//       clearInterval(inInterval);
//       var outInterval = setInterval(function () {
//         elem.style.opacity -= 0.02;
//         if (elem.style.opacity <= 0) {
//           clearInterval(outInterval);
//         }
//       }, speed / 50);
//     }
//   }, speed / 50);
// }

Animations.speed = 3000;

Animations.selector = '[data-js*="rotate-text"]';

Animations.controller = '[data-js*="rotate-controller"]';

export default Animations;