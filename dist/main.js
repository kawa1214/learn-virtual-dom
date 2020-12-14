/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar createElement_1 = __webpack_require__(/*! ./vdom/createElement */ \"./src/vdom/createElement.ts\");\nvar render_1 = __webpack_require__(/*! ./vdom/render */ \"./src/vdom/render.ts\");\nvar mount_1 = __webpack_require__(/*! ./vdom/mount */ \"./src/vdom/mount.ts\");\nvar diff_1 = __webpack_require__(/*! ./vdom/diff */ \"./src/vdom/diff.ts\");\nvar createVApp = function (count) { return createElement_1.createElement({\n    tagName: \"div\",\n    attrs: { id: 'app', test: \"\" + count },\n    children: [\n        createElement_1.createElement({\n            tagName: 'p',\n            attrs: {\n                value: \"\" + count,\n                value2: count + \"2\",\n            },\n            children: [\n            //`count: ${String(count)}`,\n            ]\n        }),\n        createElement_1.createElement({\n            tagName: 'table',\n            attrs: { border: \"1\" },\n            children: [\n                createElement_1.createElement({\n                    tagName: 'tr',\n                    attrs: {},\n                    children: [\n                        createElement_1.createElement({\n                            tagName: 'th',\n                            attrs: {},\n                            children: [\n                                \"count\"\n                            ]\n                        }),\n                    ]\n                }),\n                createElement_1.createElement({\n                    tagName: 'tr',\n                    attrs: {},\n                    children: [\n                        createElement_1.createElement({\n                            tagName: 'td',\n                            attrs: {},\n                            children: [\n                                String(count),\n                                createElement_1.createElement({\n                                    tagName: 'div',\n                                    attrs: {},\n                                    children: [\n                                        createElement_1.createElement({\n                                            tagName: 'div',\n                                            attrs: {},\n                                            children: [\n                                                \"\" + count,\n                                            ]\n                                        }),\n                                    ]\n                                }),\n                            ]\n                        }),\n                    ]\n                }),\n            ]\n        })\n    ],\n}); };\nvar count = 0;\nvar vApp = createVApp(count);\nvar $app = render_1.firstRender(vApp);\nvar $target = document.getElementById('app');\nvar $rootEl = mount_1.mount({ $node: $app, $target: $target });\nsetInterval(function () {\n    count++;\n    if (count <= 5) {\n        console.log(\"count\", count);\n        var vNewApp = createVApp(count);\n        if ($rootEl !== undefined) {\n            var $newRootEl = diff_1.diff(vApp, vNewApp, $rootEl);\n            console.log(\"$rootEl\", $rootEl);\n            console.log(\"$newRootEl\", $newRootEl);\n            $rootEl = $newRootEl;\n        }\n        vApp = vNewApp;\n    }\n}, 1500);\n/*\nconst createVApp = (count: number) => createElement({\n  tagName: \"div\",\n  attrs: { id: 'app' },\n  children: [\n    createElement({\n      tagName: 'p',\n      attrs: {\n        test: \"1\",\n      },\n      children: [\n        `count: ${count}`,\n      ]\n    }),\n  ],\n});\n*/ \n\n\n//# sourceURL=webpack://virtual-dom-simple-framework/./src/index.ts?");

/***/ }),

/***/ "./src/vdom/createElement.ts":
/*!***********************************!*\
  !*** ./src/vdom/createElement.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.createElement = void 0;\nvar createElement = function (props) {\n    return {\n        tagName: props.tagName,\n        attrs: props.attrs,\n        children: props.children,\n    };\n};\nexports.createElement = createElement;\n/*\nexport const createElement = (tagName: String, { attrs = {}, children = [] } = {}) => {\n  return {\n    tagName,\n    attrs,\n    children,\n  };\n};\n \n */ \n\n\n//# sourceURL=webpack://virtual-dom-simple-framework/./src/vdom/createElement.ts?");

/***/ }),

/***/ "./src/vdom/diff.ts":
/*!**************************!*\
  !*** ./src/vdom/diff.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.diff = void 0;\nvar render_1 = __webpack_require__(/*! ./render */ \"./src/vdom/render.ts\");\nvar replaceChildren = function (oldVTree, newVTree, $rootEl) {\n    $rootEl = replaceAttrs(oldVTree.attrs, newVTree.attrs, $rootEl);\n    oldVTree.children.forEach(function (oldVChild, i) {\n        if (oldVTree.children === undefined || newVTree.children === undefined) {\n            return $rootEl;\n        }\n        var newVChild = newVTree.children[i];\n        if (typeof oldVChild === 'string' || typeof newVChild === 'string') {\n            if (oldVChild !== newVChild) {\n                var $newNode = render_1.render(newVTree);\n                $rootEl.replaceWith($newNode);\n            }\n            return $rootEl;\n        }\n        if ($rootEl.children[i] === undefined) {\n            return $rootEl;\n        }\n        replaceChildren(oldVChild, newVChild, $rootEl.children[i]);\n    });\n    return $rootEl;\n};\nvar replaceAttrs = function (oldAttrs, newAttrs, $rootEl) {\n    for (var _i = 0, _a = Object.entries(newAttrs); _i < _a.length; _i++) {\n        var _b = _a[_i], k = _b[0], v = _b[1];\n        $rootEl.setAttribute(k, v);\n    }\n    for (var k in oldAttrs) {\n        if (!(k in newAttrs)) {\n            $rootEl.removeAttribute(k);\n        }\n    }\n    return $rootEl;\n};\nvar diff = function (oldVTree, newVTree, $rootEl) {\n    //$rootEl = replaceAttrs(oldVTree, newVTree, $rootEl)\n    $rootEl = replaceChildren(oldVTree, newVTree, $rootEl);\n    return $rootEl;\n};\nexports.diff = diff;\n\n\n//# sourceURL=webpack://virtual-dom-simple-framework/./src/vdom/diff.ts?");

/***/ }),

/***/ "./src/vdom/mount.ts":
/*!***************************!*\
  !*** ./src/vdom/mount.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.mount = void 0;\nvar mount = function (props) {\n    if (props.$target !== null) {\n        props.$target.replaceWith(props.$node);\n        return props.$node;\n    }\n};\nexports.mount = mount;\n\n\n//# sourceURL=webpack://virtual-dom-simple-framework/./src/vdom/mount.ts?");

/***/ }),

/***/ "./src/vdom/render.ts":
/*!****************************!*\
  !*** ./src/vdom/render.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.firstRender = exports.render = void 0;\nvar renderElem = function (vNode) {\n    var $el = document.createElement(vNode.tagName);\n    for (var _i = 0, _a = Object.entries(vNode.attrs); _i < _a.length; _i++) {\n        var _b = _a[_i], k = _b[0], v = _b[1];\n        $el.setAttribute(k, v);\n    }\n    for (var _c = 0, _d = vNode.children; _c < _d.length; _c++) {\n        var child = _d[_c];\n        $el.appendChild(exports.render(child));\n    }\n    return $el;\n};\nvar render = function (vNode) {\n    if (typeof vNode === 'string') {\n        return document.createTextNode(vNode);\n    }\n    return renderElem(vNode);\n};\nexports.render = render;\nvar firstRender = function (vNode) {\n    return renderElem(vNode);\n};\nexports.firstRender = firstRender;\n\n\n//# sourceURL=webpack://virtual-dom-simple-framework/./src/vdom/render.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;