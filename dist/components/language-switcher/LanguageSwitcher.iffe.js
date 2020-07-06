var LanguageSwitcher = (function () {
  'use strict';

  var LanguageSwitcher = function LanguageSwitcher() {
    var this$1 = this;
    this._settings = {
      selector: LanguageSwitcher.Selector,
      target: LanguageSwitcher.Target,
      currentLanguage: LanguageSwitcher.currentLanguage,
      languageSwitcherWrapper: LanguageSwitcher.LanguageSwitcherWrapper,
      logoWrapper: LanguageSwitcher.logoWrapper
    };
    var switcher = document.querySelector("." + this._settings.selector);
    var languagesDiv = document.querySelector("." + this._settings.target);
    var currentLanguage = document.querySelector("." + this._settings.currentLanguage);
    var languageSwitcherWrapper = document.querySelector("." + this._settings.languageSwitcherWrapper);
    var logoWrapper = document.querySelector("." + this._settings.logoWrapper);
    console.dir(this);

    if (languagesDiv) {
      languagesDiv.classList.add("desktop:w-11/12");
    }

    if (!languageSwitcherWrapper) {
      logoWrapper.style.marginTop = "2rem";
    } // Add Pick a language title on moble


    var liTag = document.createElement("li");

    if (document.querySelector("[data-js='pick-a-language']")) {
      liTag.classList.add("pick-a-language", "wpml-ls-item");
      var hiddenSpan = document.querySelector("[data-js='pick-a-language']");
      var hiddenSpanContent = hiddenSpan.textContent;
      var title = document.createTextNode(hiddenSpanContent);
      liTag.appendChild(title);
    } else {
      liTag.classList.add("pick-a-language", "wpml-ls-item");
      var title$1 = document.createTextNode("Pick a language");
      liTag.appendChild(title$1);
    }

    var closeIconLi = document.createElement("li");
    closeIconLi.classList.add("close-language-switcher", "wpml-ls-item");
    var CloseIconATag = document.createElement("a");
    CloseIconATag.classList.add("wpml-ls-link", "ls-close-link"); // CloseIconATag.textContent = "Close";

    closeIconLi.appendChild(CloseIconATag);
    console.log(closeIconLi); // Media Query
    // let isMobile = window.matchMedia("(max-width: 700px)");

    var isMobile = LanguageSwitcher.checkScreenSize();

    window.onresize = function () {
      console.log("resize");
      isMobile = LanguageSwitcher.checkScreenSize(); // if (isMobile.matches) {

      LanguageSwitcher.addCloseIconTitle(liTag, closeIconLi, isMobile); // let ul = document.querySelector(".wpml-ls-legacy-list-horizontal").getElementsByTagName("ul");
      // ul[0].prepend(closeIconLi);
      // ul[0].prepend(liTag);
      // }
    }; // if (isMobile.matches) {


    LanguageSwitcher.addCloseIconTitle(liTag, closeIconLi, isMobile); // let ul = document.querySelector(".wpml-ls-legacy-list-horizontal").getElementsByTagName("ul");
    // ul[0].prepend(closeIconLi);
    // ul[0].prepend(liTag);
    // }
    // console.log(isMobile.matches)
    //Span elemetn with the title "Translate"

    var span = document.createElement("span");

    if (document.querySelector("[data-js='translate']")) {
      span.classList.add("wpml-ls-native");
      var hiddenSpan$1 = document.querySelector("[data-js='translate']");
      var hiddenSpanConten = hiddenSpan$1.textContent;
      var title$2 = document.createTextNode(hiddenSpanConten);
      span.appendChild(title$2);
    } else {
      span.classList.add("wpml-ls-native");
      var title$3 = document.createTextNode("Translate");
      span.appendChild(title$3);
    }

    var aTag = document.createElement("a");
    aTag.classList.add("wpml-ls-link", "title-tag");
    aTag.appendChild(span);
    var li = document.createElement("li");
    li.classList.add("wpml-ls-item-button");
    li.appendChild(aTag);

    if (document.querySelector(".wpml-ls-legacy-list-horizontal")) {
      var ul = document.querySelector(".wpml-ls-legacy-list-horizontal").getElementsByTagName("ul");
      ul[0].appendChild(li);
    }

    var allLanguages = document.querySelectorAll(".wpml-ls-item");

    this._hideAllLanguages(allLanguages); // allLanguages.forEach(item => {
    // if (!item.classList.contains('wpml-ls-current-language')) {
    //   item.style.display = "none"
    // }
    // });


    console.log(logoWrapper);
    aTag.addEventListener('click', function (e) {
      this$1._toggle(allLanguages, currentLanguage);

      li.style.display = "none";
      languageSwitcherWrapper.classList.toggle("mobile-languages-switcher");
      logoWrapper.classList.add("ls-logo");
    });
    CloseIconATag.addEventListener('click', function (e) {
      this$1._hideAllLanguages(allLanguages);

      languageSwitcherWrapper.classList.remove("mobile-languages-switcher");
      li.style.display = "";
      logoWrapper.classList.remove("ls-logo");
    });
  }; // _checkScreenSize() {
  // 	return window.matchMedia("(max-width: 700px)");
  // }


  LanguageSwitcher.prototype._toggle = function _toggle(allLanguages, currentLanguage) {
    allLanguages.forEach(function (item) {
      item.style.display = "";
    });
  };

  LanguageSwitcher.prototype._hideAllLanguages = function _hideAllLanguages(allLanguages) {
    allLanguages.forEach(function (item) {
      if (!item.classList.contains('wpml-ls-current-language')) {
        item.style.display = "none";
      }
    });
  };

  LanguageSwitcher.checkScreenSize = function () {
    return window.matchMedia("(max-width: 700px)");
  };

  LanguageSwitcher.addCloseIconTitle = function (liTag, closeIconLi, isMobile) {
    if (isMobile.matches) {
      var ul = document.querySelector(".wpml-ls-legacy-list-horizontal").getElementsByTagName("ul");
      ul[0].prepend(closeIconLi);
      ul[0].prepend(liTag);
    } else {
      var ul$1 = document.querySelector(".wpml-ls-legacy-list-horizontal").getElementsByTagName("ul");

      if (ul$1[0].contains(liTag)) {
        ul$1[0].removeChild(liTag);
      }
    }
  };

  LanguageSwitcher.Selector = "rounded";
  LanguageSwitcher.Target = "wpml-ls-legacy-list-horizontal";
  LanguageSwitcher.currentLanguage = "wpml-ls-current-language";
  LanguageSwitcher.LanguageSwitcherWrapper = "c-language-switcher-wrapper";
  LanguageSwitcher.logoWrapper = "o-navigation__logo-wrapper";

  return LanguageSwitcher;

}());
