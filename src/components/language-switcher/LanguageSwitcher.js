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



    const switcher = document.querySelector(`.${this._settings.selector}`)
    const languagesDiv = document.querySelector(`.${this._settings.target}`)
    const currentLanguage = document.querySelector(`.${this._settings.currentLanguage}`)
    const languageSwitcherWrapper = document.querySelector(`.${this._settings.languageSwitcherWrapper}`);
    const logoWrapper = document.querySelector(`.${this._settings.logoWrapper}`);

    // console.log("npm-debug")
    if (languagesDiv) {
      languagesDiv.classList.add("desktop:w-11/12");
    }
    if(!languageSwitcherWrapper) {
      logoWrapper.style.marginTop = "2rem";
    }

    // Add Pick a language title on moble
    const liTag = document.createElement("li");
    if (document.querySelector("[data-js='pick-a-language']")) {
      liTag.classList.add("pick-a-language", "wpml-ls-item");
      const hiddenSpan = document.querySelector("[data-js='pick-a-language']")
      const hiddenSpanContent = hiddenSpan.textContent;

      const title = document.createTextNode(hiddenSpanContent);
      liTag.appendChild(title);

    } else {
      liTag.classList.add("pick-a-language", "wpml-ls-item");
      const title = document.createTextNode("Pick a language");
      liTag.appendChild(title);
    }

    const closeIconLi = document.createElement("li");
    closeIconLi.classList.add("close-language-switcher", "wpml-ls-item");
    const CloseIconATag = document.createElement("a")
    CloseIconATag.classList.add("wpml-ls-link", "ls-close-link");



    // CloseIconATag.textContent = "Close";

    closeIconLi.appendChild(CloseIconATag)
    console.log(closeIconLi)

    // Media Query
    let isMobile = LanguageSwitcher.checkScreenSize();
    // On mobile add Pick a language title and close buttonn to langage switcher
    LanguageSwitcher.addCloseIconTitle(liTag, closeIconLi, isMobile)


    // On mobile on on screen resize add Pick a language title and close buttonn to langage switcher
    window.onresize = function () {
      console.log("resize")
      isMobile = LanguageSwitcher.checkScreenSize();
      LanguageSwitcher.addCloseIconTitle(liTag, closeIconLi, isMobile);

      // On mobile and if the translate button is clicked add overflowe-hidden class to the body element
      if (languageSwitcherWrapper.classList.contains("mobile-languages-switcher")) {
        LanguageSwitcher.addOverflowHidden(isMobile, body);
      }

      // On desktop remove the overflow-hidden class from body element
      LanguageSwitcher.removeOverflowHidden(isMobile, body);
    }


    //Span element with the title "Translate"
    const span = document.createElement("span");
    if (document.querySelector("[data-js='translate']")) {
      span.classList.add("wpml-ls-native");
      const hiddenSpan = document.querySelector("[data-js='translate']")
      const hiddenSpanConten = hiddenSpan.textContent;
      const title = document.createTextNode(hiddenSpanConten);
      span.appendChild(title);
    } else {
      span.classList.add("wpml-ls-native");
      const title = document.createTextNode("Translate");
      span.appendChild(title);
    }


    const aTag = document.createElement("a")
    aTag.classList.add("wpml-ls-link", "title-tag");
    aTag.appendChild(span)

    const li = document.createElement("li");
    li.classList.add("wpml-ls-item-button")
    li.appendChild(aTag)

    if (document.querySelector(".wpml-ls-legacy-list-horizontal")) {
      let ul = document.querySelector(".wpml-ls-legacy-list-horizontal").getElementsByTagName("ul");
      ul[0].appendChild(li);
    }

    // Hide all languages
    const allLanguages = document.querySelectorAll(".wpml-ls-item");
    this._hideAllLanguages(allLanguages);

    // Body element
    let body = document.querySelector("body");
    console.log(body)


    // On click reveal language list
    aTag.addEventListener('click', (e) => {
      this._toggle(allLanguages, currentLanguage);
      li.style.display = "none";
      languageSwitcherWrapper.classList.toggle("mobile-languages-switcher");
      logoWrapper.classList.add("ls-logo");

      LanguageSwitcher.addOverflowHidden(isMobile, body);
      // window.onresize = function () {
      //   isMobile = LanguageSwitcher.checkScreenSize();
      //   LanguageSwitcher.toggleOverflowHidden(isMobile, body)
      // }
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

  _toggle(allLanguages, currentLanguage) {
    allLanguages.forEach(item => {
      item.style.display = ""
    })
  }

  _hideAllLanguages(allLanguages) {
    allLanguages.forEach(item => {
      if (!item.classList.contains('wpml-ls-current-language')) {
        item.style.display = "none"
      }
    });
  }
}

LanguageSwitcher.checkScreenSize = function() {
  return window.matchMedia("(max-width: 700px)");
}

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

LanguageSwitcher.addOverflowHidden = function(isMobile, body) {
  if (isMobile.matches) {
    body.classList.add("overflow-hidden")
  }
}

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