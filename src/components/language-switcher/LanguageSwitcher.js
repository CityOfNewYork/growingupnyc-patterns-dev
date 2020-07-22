'use strict';


class LanguageSwitcher {
  /**
   * @constructor
   */
  constructor() {
    this._settings = {
      selector: LanguageSwitcher.Selector,
      target: LanguageSwitcher.Target,
      currentLanguage: LanguageSwitcher.currentLanguage,
      languageSwitcherWrapper: LanguageSwitcher.LanguageSwitcherWrapper,
      logoWrapper: LanguageSwitcher.logoWrapper
    };

    const languagesDiv = document.querySelector(`.${this._settings.target}`)
    const languageSwitcherWrapper = document.querySelector(`.${this._settings.languageSwitcherWrapper}`);
    const logoWrapper = document.querySelector(`.${this._settings.logoWrapper}`);

    if (languagesDiv) {
      languagesDiv.classList.add("desktop:w-11/12");
    }

    // On mobile and language swithcer is open and 2rem marginTop to logo wrapper to stay inline
    if(!languageSwitcherWrapper) {
      logoWrapper.style.marginTop = "2rem";
    }

    // Add Pick a language title on moble
    const liTag = document.createElement("li");
    if (document.querySelector("[data-js='pick-a-language']")) {
      liTag.classList.add("pick-a-language", "wpml-ls-item");

      // Grab a hidden span elements with text contentContent 'Pick a language'
      const hiddenSpan = document.querySelector("[data-js='pick-a-language']")

      // WPML string translation exposed title 'Pick a language'
      const hiddenSpanContent = hiddenSpan.textContent;

			// Create text node containg the 'Pick a language' textContetn and append it to a li element
      const title = document.createTextNode(hiddenSpanContent);
      liTag.appendChild(title);

    } else {

			// If no hidden span with WPML exposed textContetn crate a textNode with textContetn "Pick a language" and append to an li element
      liTag.classList.add("pick-a-language", "wpml-ls-item");
      const title = document.createTextNode("Pick a language");
      liTag.appendChild(title);
    }

		// Create li and a elements, and append the a to the li
    const closeIconLi = document.createElement("li");
    closeIconLi.classList.add("close-language-switcher", "wpml-ls-item");
    const CloseIconATag = document.createElement("a")
    CloseIconATag.classList.add("wpml-ls-link", "ls-close-link");

    // Append close icon
    closeIconLi.appendChild(CloseIconATag)

    // Media Query
    let isMobile = LanguageSwitcher.checkScreenSize();
    // On mobile add Pick a language title and close buttonn to langage switcher

		/**
	 * On screen resize if the screen size i sless that 700px append the li element with text content 'Pick a language' and the li containing close icon
	 * @param {} liTag- li element with textContetn 'Pick a language'
	 * @param {} closeIconLi- li element with close icon
	 * @param {} isMobile- boolon value that checks if screen size is less tha 700px
	 */
    LanguageSwitcher.addCloseIconTitle(liTag, closeIconLi, isMobile)

    // On mobile on on screen resize add Pick a language title and close buttonn to langage switcher
    window.onresize = function () {
      isMobile = LanguageSwitcher.checkScreenSize();

      /**
     * On screen resize if the screen size i sless that 700px append the li element with text content 'Pick a language' and the li containing close icon
     * @param {} liTag- li element with textContetn 'Pick a language'
     * @param {} closeIconLi- li element with close icon
     * @param {} isMobile- boolon value that checks if screen size is less tha 700px
     */
      LanguageSwitcher.addCloseIconTitle(liTag, closeIconLi, isMobile);

      // On mobile and if the translate button is clicked add overflowe-hidden class to the body element
      if (languageSwitcherWrapper.classList.contains("mobile-languages-switcher")) {

     /**
     * On screen size less that 700px added overflow hidden class the body element
     * @param {} body- body element
     * @param {} isMobile- boolon value that checks if screen size is less tha 700px
     */
        LanguageSwitcher.addOverflowHidden(isMobile, body);
      }

      /**
     * On desktop remove the overflow-hidden class from body element
     * @param {} isMobile- Check screensize
     * @param {} body- Body element
     */
      LanguageSwitcher.removeOverflowHidden(isMobile, body);
    }

    // Span element
    const span = document.createElement("span");
    if (document.querySelector("[data-js='translate']")) {
      span.classList.add("wpml-ls-native");

      // Hidden span with textContent "tanslate" which is exposed to WPML string translation
      const hiddenSpan = document.querySelector("[data-js='translate']")

      // HiddenSpan textContent
      const hiddenSpanConten = hiddenSpan.textContent;
      const title = document.createTextNode(hiddenSpanConten);

      // Appendn the WPML exposed textContent in to a span
      span.appendChild(title);
    } else {
      span.classList.add("wpml-ls-native");

      // WPML unexposed textContetn "Translate"
      const title = document.createTextNode("Translate");

      // Append the textContent to a span
      span.appendChild(title);
    }

    const aTag = document.createElement("a")
    aTag.classList.add("wpml-ls-link", "title-tag");

    // Append span with textContetn "Tanslate" to an anchor element
    aTag.appendChild(span)

    const li = document.createElement("li");
    li.classList.add("wpml-ls-item-button")

    // Append the a tag with WMPL exposed textContent into a li element
    li.appendChild(aTag)

    // Append the li into ul element containing list of languages generated by WPML
    if (document.querySelector(".wpml-ls-legacy-list-horizontal")) {
      let ul = document.querySelector(".wpml-ls-legacy-list-horizontal").getElementsByTagName("ul");
      ul[0].appendChild(li);
    }

    // Hide all languages
    const allLanguages = document.querySelectorAll(".wpml-ls-item");
    this._hideAllLanguages(allLanguages);

    // Body element
    let body = document.querySelector("body");

    // On click reveal language list
    aTag.addEventListener('click', (e) => {
      this._toggle(allLanguages);
      li.style.display = "none";
      languageSwitcherWrapper.classList.toggle("mobile-languages-switcher");
      logoWrapper.classList.add("ls-logo");

      LanguageSwitcher.addOverflowHidden(isMobile, body);

    })

    // On mobile On click close language switcher
    CloseIconATag.addEventListener('click', (e) => {
      this._hideAllLanguages(allLanguages);
      languageSwitcherWrapper.classList.remove("mobile-languages-switcher");
      li.style.display = "";
      logoWrapper.classList.remove("ls-logo");

      body.classList.remove("overflow-hidden");
    })
}

  // Unhide language list
  _toggle(allLanguages) {
    allLanguages.forEach(item => {
      item.style.display = ""
    })
  }

  // Hide language list
  _hideAllLanguages(allLanguages) {
    allLanguages.forEach(item => {
      if (!item.classList.contains('wpml-ls-current-language')) {
        item.style.display = "none"
      }
    });
  }
}

// Media query
LanguageSwitcher.checkScreenSize = function() {
  return window.matchMedia("(max-width: 700px)");
}

// On screensize less that 700px added li elements in to UL elemetn passed from WPML
LanguageSwitcher.addCloseIconTitle = function(liTag, closeIconLi, isMobile) {
  if (isMobile.matches) {
    let ul = document.querySelector(".wpml-ls-legacy-list-horizontal").getElementsByTagName("ul");
    ul[0].prepend(closeIconLi);
    ul[0].prepend(liTag);
  } else {
    let ul = document.querySelector(".wpml-ls-legacy-list-horizontal").getElementsByTagName("ul");
    if (ul[0].contains(liTag)) {
      ul[0].removeChild(liTag);
    }
  }
}

// On screesize less that 700px add onverflow hidden on body element
LanguageSwitcher.addOverflowHidden = function(isMobile, body) {
  if (isMobile.matches) {
    body.classList.add("overflow-hidden")
  }
}

// On screenSize above 700px remove overflowHidden class from body element
LanguageSwitcher.removeOverflowHidden = function(isMobile, body) {
  if (!isMobile.matches) {
    body.classList.remove("overflow-hidden")
  }
}


LanguageSwitcher.Selector = "rounded"
LanguageSwitcher.Target = "wpml-ls-legacy-list-horizontal"
LanguageSwitcher.currentLanguage = "wpml-ls-current-language"
LanguageSwitcher.LanguageSwitcherWrapper = "c-language-switcher-wrapper"
LanguageSwitcher.logoWrapper = "o-navigation__logo-wrapper"


export default LanguageSwitcher;