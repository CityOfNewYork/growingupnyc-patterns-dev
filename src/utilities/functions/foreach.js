'use strict';

/**
 * Polyfill for NodeList.prototype.forEach()
 * https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill
 */

if(window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}
if(window.HTMLCollection && !HTMLCollection.prototype.forEach) {
  HTMLCollection.prototype.forEach = Array.prototype.forEach;
}