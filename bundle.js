/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hyperapp = __webpack_require__(1);

var HeaderSection = function HeaderSection(_ref) {
    var state = _ref.state;

    return (0, _hyperapp.h)(
        "nav",
        null,
        state.content.map(function (page) {
            return (0, _hyperapp.h)(
                "a",
                {
                    href: page.link,
                    "class": "nav-item " + page.title + " " + page.title.toLowerCase() + " "
                },
                (0, _hyperapp.h)(
                    "div",
                    { "class": "hover-tool" },
                    page.title
                )
            );
        })
    );
};

var MainApp = function MainApp(_ref2) {
    var state = _ref2.state;

    console.log("state", state);
    return (0, _hyperapp.h)(
        "div",
        { "class": "container wrapper" },
        (0, _hyperapp.h)(HeaderSection, { state: state }),
        (0, _hyperapp.h)(
            "main",
            null,
            (0, _hyperapp.h)(
                "section",
                { "class": "card home", id: "Home" },
                (0, _hyperapp.h)(
                    "div",
                    { "class": "intro" },
                    (0, _hyperapp.h)(
                        "div",
                        { "class": "title" },
                        (0, _hyperapp.h)(
                            "h1",
                            null,
                            "Garrett Weinert"
                        )
                    ),
                    (0, _hyperapp.h)(
                        "div",
                        { "class": "sub-title" },
                        (0, _hyperapp.h)(
                            "h3",
                            null,
                            "Front End Developer"
                        )
                    )
                ),
                (0, _hyperapp.h)(
                    "div",
                    { "class": "photo-container" },
                    (0, _hyperapp.h)("div", { "class": "profile-img" }),
                    (0, _hyperapp.h)("div", { "class": "next-arrow" })
                )
            )
        )
    );
};

(0, _hyperapp.app)({
    state: {
        content: []
    },
    view: [["/", function (state) {
        return (0, _hyperapp.h)(MainApp, { state: state });
    }], ["*", function (state) {
        return (0, _hyperapp.h)(MainApp, { state: state });
    }]],
    actions: {
        getContent: function getContent(state, actions) {
            fetch("http://localhost:5000/api/siteapi/10").then(function (res) {
                return res.json();
            }).then(function (data) {
                if (data.success == 1) {
                    actions.setContent(data.content);
                }
            });
        },

        setContent: function setContent(state, actions, content) {
            return { content: content };
        }
    },
    events: {
        loaded: function loaded(state, actions) {
            return actions.getContent();
        }
    },
    mixins: [_hyperapp.Router]
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__h__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_0__h__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "app", function() { return __WEBPACK_IMPORTED_MODULE_1__app__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return __WEBPACK_IMPORTED_MODULE_2__router__["a"]; });







/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(tag, data) {
  var node
  var stack = []
  var children = []

  for (var i = arguments.length; i-- > 2; ) {
    stack[stack.length] = arguments[i]
  }

  while (stack.length) {
    if (Array.isArray((node = stack.pop()))) {
      for (var i = node.length; i--; ) {
        stack[stack.length] = node[i]
      }
    } else if (node != null && node !== true && node !== false) {
      if (typeof node === "number") {
        node = node + ""
      }
      children[children.length] = node
    }
  }

  return typeof tag === "string"
    ? {
        tag: tag,
        data: data || {},
        children: children
      }
    : tag(data, children)
});


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(app) {
  var state = {}
  var view = app.view
  var actions = {}
  var events = {}
  var node
  var element

  for (var i = -1, mixins = app.mixins || []; i < mixins.length; i++) {
    var mixin = mixins[i] ? mixins[i](app) : app

    if (mixin.mixins != null && mixin !== app) {
      mixins = mixins.concat(mixin.mixins)
    }

    if (mixin.state != null) {
      state = merge(state, mixin.state)
    }

    init(actions, mixin.actions)

    Object.keys(mixin.events || []).map(function(key) {
      events[key] = (events[key] || []).concat(mixin.events[key])
    })
  }

  if (document.readyState[0] !== "l") {
    load()
  } else {
    addEventListener("DOMContentLoaded", load)
  }

  function init(namespace, children, lastName) {
    Object.keys(children || []).map(function(key) {
      var action = children[key]
      var name = lastName ? lastName + "." + key : key

      if (typeof action === "function") {
        namespace[key] = function(data) {
          var result = action(
            state,
            actions,
            emit("action", {
              name: name,
              data: data
            }).data,
            emit
          )

          if (result == null || typeof result.then === "function") {
            return result
          }

          render((state = merge(state, emit("update", result))), view)
        }
      } else {
        init(namespace[key] || (namespace[key] = {}), action, name)
      }
    })
  }

  function load() {
    render(state, view)
    emit("loaded")
  }

  function emit(name, data) {
    ;(events[name] || []).map(function(cb) {
      var result = cb(state, actions, data, emit)
      if (result != null) {
        data = result
      }
    })

    return data
  }

  function render(state, view) {
    element = patch(
      app.root || (app.root = document.body),
      element,
      node,
      (node = emit("render", view)(state, actions))
    )
  }

  function merge(a, b) {
    var obj = {}

    if (typeof b !== "object" || Array.isArray(b)) {
      return b
    }

    for (var i in a) {
      obj[i] = a[i]
    }
    for (var i in b) {
      obj[i] = b[i]
    }

    return obj
  }

  function createElementFrom(node, isSVG) {
    if (typeof node === "string") {
      var element = document.createTextNode(node)
    } else {
      var element = (isSVG = isSVG || node.tag === "svg")
        ? document.createElementNS("http://www.w3.org/2000/svg", node.tag)
        : document.createElement(node.tag)

      for (var i = 0; i < node.children.length; ) {
        element.appendChild(createElementFrom(node.children[i++], isSVG))
      }

      for (var i in node.data) {
        if (i === "oncreate") {
          node.data[i](element)
        } else {
          setElementData(element, i, node.data[i])
        }
      }
    }

    return element
  }

  function setElementData(element, name, value, oldValue) {
    if (name === "key") {
    } else if (name === "style") {
      for (var i in merge(oldValue, (value = value || {}))) {
        element.style[i] = value[i] || ""
      }
    } else {
      try {
        element[name] = value
      } catch (_) {}

      if (typeof value !== "function") {
        if (value) {
          element.setAttribute(name, value)
        } else {
          element.removeAttribute(name)
        }
      }
    }
  }

  function updateElementData(element, oldData, data) {
    for (var name in merge(oldData, data)) {
      var value = data[name]
      var oldValue = name === "value" || name === "checked"
        ? element[name]
        : oldData[name]

      if (name === "onupdate" && value) {
        value(element)
      } else if (value !== oldValue) {
        setElementData(element, name, value, oldValue)
      }
    }
  }

  function getKeyFrom(node) {
    if (node && (node = node.data)) {
      return node.key
    }
  }

  function removeElement(parent, element, node) {
    ;((node.data && node.data.onremove) || removeChild)(element, removeChild)
    function removeChild() {
      parent.removeChild(element)
    }
  }

  function patch(parent, element, oldNode, node) {
    if (oldNode == null) {
      element = parent.insertBefore(createElementFrom(node), element)
    } else if (node.tag && node.tag === oldNode.tag) {
      updateElementData(element, oldNode.data, node.data)

      var len = node.children.length
      var oldLen = oldNode.children.length
      var reusableChildren = {}
      var oldElements = []
      var newKeys = {}

      for (var i = 0; i < oldLen; i++) {
        var oldElement = element.childNodes[i]
        oldElements[i] = oldElement

        var oldChild = oldNode.children[i]
        var oldKey = getKeyFrom(oldChild)

        if (null != oldKey) {
          reusableChildren[oldKey] = [oldElement, oldChild]
        }
      }

      var i = 0
      var j = 0

      while (j < len) {
        var oldElement = oldElements[i]
        var oldChild = oldNode.children[i]
        var newChild = node.children[j]

        var oldKey = getKeyFrom(oldChild)
        if (newKeys[oldKey]) {
          i++
          continue
        }

        var newKey = getKeyFrom(newChild)

        var reusableChild = reusableChildren[newKey] || []

        if (null == newKey) {
          if (null == oldKey) {
            patch(element, oldElement, oldChild, newChild)
            j++
          }
          i++
        } else {
          if (oldKey === newKey) {
            patch(element, reusableChild[0], reusableChild[1], newChild)
            i++
          } else if (reusableChild[0]) {
            element.insertBefore(reusableChild[0], oldElement)
            patch(element, reusableChild[0], reusableChild[1], newChild)
          } else {
            patch(element, oldElement, null, newChild)
          }

          j++
          newKeys[newKey] = newChild
        }
      }

      while (i < oldLen) {
        var oldChild = oldNode.children[i]
        var oldKey = getKeyFrom(oldChild)
        if (null == oldKey) {
          removeElement(element, oldElements[i], oldChild)
        }
        i++
      }

      for (var i in reusableChildren) {
        var reusableChild = reusableChildren[i]
        var reusableNode = reusableChild[1]
        if (!newKeys[reusableNode.data.key]) {
          removeElement(element, reusableChild[0], reusableNode)
        }
      }
    } else if (node !== oldNode) {
      var i = element
      parent.replaceChild((element = createElementFrom(node)), i)
    }

    return element
  }
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(app, view) {
  return {
    state: {
      router: match(location.pathname)
    },
    actions: {
      router: {
        match: function(state, actions, data, emit) {
          return {
            router: emit("route", match(data))
          }
        },
        go: function(state, actions, data) {
          history.pushState({}, "", data)
          actions.router.match(data.split("?")[0])
        }
      }
    },
    events: {
      loaded: function(state, actions) {
        match()
        addEventListener("popstate", match)

        function match() {
          actions.router.match(location.pathname)
        }
      },
      render: function() {
        return view
      }
    }
  }

  function match(data) {
    for (var match, params = {}, i = 0, len = app.view.length; i < len; i++) {
      var route = app.view[i][0]
      var keys = []

      if (!match) {
        data.replace(
          RegExp(
            route === "*"
              ? "." + route
              : "^" +
                  route
                    .replace(/\//g, "\\/")
                    .replace(/:([\w]+)/g, function(_, key) {
                      keys.push(key)
                      return "([-\\.\\w]+)"
                    }) +
                  "/?$",
            "g"
          ),
          function() {
            for (var j = 1; j < arguments.length - 2; ) {
              params[keys.shift()] = arguments[j++]
            }
            match = route
            view = app.view[i][1]
          }
        )
      }
    }

    return {
      match: match,
      params: params
    }
  }
});


/***/ })
/******/ ]);