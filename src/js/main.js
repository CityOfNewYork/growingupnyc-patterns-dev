'use strict';
// Utilities

// Elements

// Components


// Objects
import Navigation from '../objects/navigation/Navigation';
import Accordion from '../objects/accordion/Accordion';
// import Overlay from '../objects/overlay/Overlay';
import Icons from '../../node_modules/@nycopportunity/patterns-framework/src/utilities/icons/icons';
import Toggle from '../utilities/toggle/Toggle';
import Sticky from '../utilities/sticky/Sticky';
import AlertBanner from '../objects/alert-banner/AlertBanner';
import Animations from '../utilities/animations/Animations';
import Form from '../components/form/Form';
/** import components here as they are written. */

/**
 * The Main module
 * @class
 */
class main {
  navigation(settings = false) {
    return (settings) ? new Navigation(settings) : new Navigation();
  }

  // overlay() {
  //   return new Overlay();
  // }

  toggle() {
    return new Toggle();
  }

  icons(path) {
    return new Icons(path);
  }

  accordion() {
    return new Accordion();
  }
  
  sticky() {
    Sticky();
  }

  alertBanner() {
    return new AlertBanner();
  }

  animations() {
    return new Animations();
  }

  form() {
    return new Form();
  }

}

export default main;
