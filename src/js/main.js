'use strict';

// Polyfills
import '../../dist/scripts/polyfills';
import '../utilities/functions/foreach';

// Elements

// Components

// Objects
import Navigation from '../objects/navigation/Navigation';
import Accordion from '../objects/accordion/Accordion';
import Overlay from '../objects/overlay/Overlay';
import AlertBanner from '../objects/alert-banner/AlertBanner';
import Animations from '../utilities/animations/Animations';
import Form from '../components/form/Form';
import StaticColumn from '../objects/static-column/staticColumn'
import Scroll from '../components/side-navigation/Scroll'
import LanguageSwitcher from '../components/language-switcher/LanguageSwitcher'
import Sticky from '../utilities/sticky/Sticky'
import FormEffect from '../utilities/form-effects/FormEffects'
import Reveal from '../utilities/reveal/Reveal'
import Newsletter from '../objects/newsletter/Newsletter'
import Share from '../components/share/Share'

// Utilities
import SectionHighlighter from '../utilities/section-highlighter/SectionHighlighter';

/**
 * NYCO Patterns Framework
 */
import Icons from '../../node_modules/@nycopportunity/patterns-framework/src/utilities/icons/icons';

/**
 * The Main module
 * @class
 */
class main {
  navigation(settings = false) {
    return (settings) ? new Navigation(settings) : new Navigation();
  }


	// offCanvas(settings = false) {
  //   return (settings) ? new Offcanvas(settings) : new Offcanvas();
  // }

	newsletter(settings = false) {
    return (settings) ? new Newsletter(settings) : new Newsletter();
  }

	formEffect(settings = false) {
    return (settings) ? new FormEffect(settings) : new FormEffect();
  }

  overlay() {
    return new Overlay();
  }

  sectionHighlighter() {
    return new SectionHighlighter();
  }

  accordion() {
    return new Accordion();
  }

  icons(path) {
    return new Icons(path);
  }

  accordion() {
    return new Accordion();
  }

	share() {
    return new Share();
  }

	reveal(elNumber) {
    return new Reveal(elNumber);
  }

	languageSwitcher() {
    return new LanguageSwitcher();
  }

	// offCanvas() {
  //   return new Offcanvas();
  // }

	// anotherJs() {
  //   return new AnotherJs();
  // }

  alertBanner(expirationDays) {
    return new AlertBanner(expirationDays);
  }

	staticColumn() {
    return new StaticColumn();
  }

	sticky() {
    return new Sticky();
  }

	scroll() {
    return new Scroll();
  }

	// shareFrom() {
  //   return new ShareForm();
  // }

  animations() {
    return new Animations();
  }

  form() {
    return new Form();
  }

}

export default main;
