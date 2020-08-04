'use strict';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var js_cookie = createCommonjsModule(function (module, exports) {
(function (factory) {
	var registeredInModuleLoader;
	{
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var arguments$1 = arguments;

		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments$1[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function decode (s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}

	function init (converter) {
		function api() {}

		function set (key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			attributes = extend({
				path: '/'
			}, api.defaults, attributes);

			if (typeof attributes.expires === 'number') {
				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
			}

			// We're using "expires" because "max-age" is not supported by IE
			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

			try {
				var result = JSON.stringify(value);
				if (/^[\{\[]/.test(result)) {
					value = result;
				}
			} catch (e) {}

			value = converter.write ?
				converter.write(value, key) :
				encodeURIComponent(String(value))
					.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

			key = encodeURIComponent(String(key))
				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
				.replace(/[\(\)]/g, escape);

			var stringifiedAttributes = '';
			for (var attributeName in attributes) {
				if (!attributes[attributeName]) {
					continue;
				}
				stringifiedAttributes += '; ' + attributeName;
				if (attributes[attributeName] === true) {
					continue;
				}

				// Considers RFC 6265 section 5.2:
				// ...
				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
				//     character:
				// Consume the characters of the unparsed-attributes up to,
				// not including, the first %x3B (";") character.
				// ...
				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
			}

			return (document.cookie = key + '=' + value + stringifiedAttributes);
		}

		function get (key, json) {
			if (typeof document === 'undefined') {
				return;
			}

			var jar = {};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) ||
						decode(cookie);

					if (json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e$1) {}
			}

			return key ? jar[key] : jar;
		}

		api.set = set;
		api.get = function (key) {
			return get(key, false /* read as raw */);
		};
		api.getJSON = function (key) {
			return get(key, true /* read as json */);
		};
		api.remove = function (key, attributes) {
			set(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));
});

var AlertBanner = function AlertBanner(expirationDaysParam) {
  var this$1 = this;
  var expirationDays = expirationDaysParam || AlertBanner.expiration;
  this._settings = {
    selector: AlertBanner.selector,
    controller: AlertBanner.controller,
    inactiveClass: AlertBanner.inactiveClass,
    activeClass: AlertBanner.activeClass,
    expiration: expirationDays,
    remover: AlertBanner.remover,
    cookieName: AlertBanner.cookieName
  };
  var el = document.querySelector(this._settings.selector);
  var control = document.querySelector(this._settings.controller);

  if (control != null) {
    control.addEventListener('click', function (event) {
      this$1.assignCookie(el);
    });
    this.checkAlertCookie(el);
  } else {
    return;
  }
};
/**
 * Checks if cookie exists
 * @param {element} element
 */


AlertBanner.prototype.checkAlertCookie = function checkAlertCookie(element) {
  if (js_cookie.get(element.dataset.alert)) {
    if (element.classList.contains(this._settings.activeClass)) {
      element.classList.toggle(this._settings.activeClass);
    }
  } else {
    element.classList.toggle(this._settings.inactiveClass);
    element.classList.toggle(this._settings.activeClass);
  }
};
/**
 * Sets cookie and applies class to the element
 * @param {element} element
 */


AlertBanner.prototype.assignCookie = function assignCookie(element) {
  if (element.classList.contains(this._settings.activeClass)) {
    element.classList.toggle(this._settings.inactiveClass);
    element.classList.toggle(this._settings.activeClass);
    js_cookie.set(element.dataset.alert, 'dismissed', {
      expires: this._settings.expiration
    });
  }
};
/**
 * On click removed cookie, used in the patterns library for demo purposes
 * @param {string} cookieName
 */


AlertBanner.prototype.removeCookie = function removeCookie(cookieName) {
  var cookieRemoverButton = document.getElementById(AlertBanner.remover);
  cookieRemoverButton.addEventListener('click', function (event) {
    js_cookie.remove('notification');
    location.reload();
  });
};

AlertBanner.selector = '[data-js*="alert-banner"]';
AlertBanner.controller = '[data-js*="alert-controller"]';
AlertBanner.inactiveClass = 'hidden';
AlertBanner.activeClass = 'active';
AlertBanner.expiration = 360;
AlertBanner.remover = 'cookie-remover-button';

module.exports = AlertBanner;
