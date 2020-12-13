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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _vdom_createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vdom/createElement */ \"./src/vdom/createElement.js\");\n/* harmony import */ var _vdom_render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vdom/render.js */ \"./src/vdom/render.js\");\n/* harmony import */ var _vdom_mount_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vdom/mount.js */ \"./src/vdom/mount.js\");\n/* harmony import */ var _vdom_diff_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vdom/diff.js */ \"./src/vdom/diff.js\");\n\n\n\n\nconsole.log(\"test\")\n\nconst createVApp = count=> (0,_vdom_createElement__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', {\n  attrs: {\n    id: 'app',\n    //dataCount: count, // we use the count here\n  },\n  children: [\n    'The current count is: ',\n    (0,_vdom_createElement__WEBPACK_IMPORTED_MODULE_0__.createElement)('a', {\n      children: [\n        String(count),\n      ],\n    }),\n    (0,_vdom_createElement__WEBPACK_IMPORTED_MODULE_0__.createElement)('img', {\n      attrs: {\n        src: 'https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif',\n      },\n    }),\n  ],\n});\n\nlet count = 0;\nlet vApp = createVApp(count);\nconst $app = (0,_vdom_render_js__WEBPACK_IMPORTED_MODULE_1__.render)(vApp);\nlet $rootEl = (0,_vdom_mount_js__WEBPACK_IMPORTED_MODULE_2__.mount)($app, document.getElementById('app'));\n\n\n\nsetInterval(() => {\n  count++;\n  \n  const vNewApp = createVApp(count)\n  const patch = (0,_vdom_diff_js__WEBPACK_IMPORTED_MODULE_3__.diff)(vApp, vNewApp);\n\n  // we might replace the whole $rootEl,\n  // so we want the patch will return the new $rootEl\n  $rootEl = patch($rootEl);\n\n  vApp = vNewApp;\n}, 500);\n\n//# sourceURL=webpack://virtual-dom-simple-framework/./src/index.js?");

/***/ }),

/***/ "./src/vdom/createElement.js":
/*!***********************************!*\
  !*** ./src/vdom/createElement.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createElement\": function() { return /* binding */ createElement; }\n/* harmony export */ });\nconst createElement = (tagName, { attrs = {}, children = [] } = {}) => {\n  return {\n    tagName,\n    attrs,\n    children,\n  };\n};\n\n//# sourceURL=webpack://virtual-dom-simple-framework/./src/vdom/createElement.js?");

/***/ }),

/***/ "./src/vdom/diff.js":
/*!**************************!*\
  !*** ./src/vdom/diff.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"diff\": function() { return /* binding */ diff; }\n/* harmony export */ });\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render.js */ \"./src/vdom/render.js\");\n\n\nconst zip = (xs, ys) => {\n  const zipped = [];\n  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {\n    zipped.push([xs[i], ys[i]]);\n  }\n  return zipped;\n};\n\nconst diffAttrs = (oldAttrs, newAttrs) => {\n  const patches = [];\n\n  // setting newAttrs\n  for (const [k, v] of Object.entries(newAttrs)) {\n    patches.push($node => {\n      $node.setAttribute(k, v);\n      return $node;\n    });\n  }\n\n  // removing attrs\n  for (const k in oldAttrs) {\n    if (!(k in newAttrs)) {\n      patches.push($node => {\n        $node.removeAttribute(k);\n        return $node;\n      });\n    }\n  }\n\n  return $node => {\n    for (const patch of patches) {\n      patch($node);\n    }\n    return $node;\n  };\n};\n\nconst diffChildren = (oldVChildren, newVChildren) => {\n  const childPatches = [];\n  oldVChildren.forEach((oldVChild, i) => {\n    childPatches.push(diff(oldVChild, newVChildren[i]));\n  });\n\n  const additionalPatches = [];\n  for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {\n    additionalPatches.push($node => {\n      $node.appendChild((0,_render_js__WEBPACK_IMPORTED_MODULE_0__.render)(additionalVChild));\n      return $node;\n    });\n  }\n\n  return $parent => {\n    // since childPatches are expecting the $child, not $parent,\n    // we cannot just loop through them and call patch($parent)\n    for (const [patch, $child] of zip(childPatches, $parent.childNodes)) {\n      patch($child);\n    }\n\n    for (const patch of additionalPatches) {\n      patch($parent);\n    }\n    return $parent;\n  };\n};\n\nconst diff = (oldVTree, newVTree) => {\n  // let's assume oldVTree is not undefined!\n  if (newVTree === undefined) {\n    return $node => {\n      $node.remove();\n      // the patch should return the new root node.\n      // since there is none in this case,\n      // we will just return undefined.\n      return undefined;\n    }\n  }\n\n  if (typeof oldVTree === 'string' ||\n    typeof newVTree === 'string') {\n    if (oldVTree !== newVTree) {\n      // could be 2 cases:\n      // 1. both trees are string and they have different values\n      // 2. one of the trees is text node and\n      //    the other one is elem node\n      // Either case, we will just render(newVTree)!\n      return $node => {\n         const $newNode = (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.render)(newVTree);\n         $node.replaceWith($newNode);\n         return $newNode;\n       };\n    } else {\n      // this means that both trees are string\n      // and they have the same values\n      return $node => $node;\n    }\n  }\n\n  if (oldVTree.tagName !== newVTree.tagName) {\n    // we assume that they are totally different and \n    // will not attempt to find the differences.\n    // simply render the newVTree and mount it.\n    return $node => {\n      const $newNode = (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.render)(newVTree);\n      $node.replaceWith($newNode);\n      return $newNode;\n    };\n  }\n\n  const patchAttrs = diffAttrs(oldVTree.attrs, newVTree.attrs);\n  const patchChildren = diffChildren(oldVTree.children, newVTree.children);\n\n  return $node => {\n    patchAttrs($node);\n    patchChildren($node);\n    return $node;\n  };\n};\n\n\n\n//# sourceURL=webpack://virtual-dom-simple-framework/./src/vdom/diff.js?");

/***/ }),

/***/ "./src/vdom/mount.js":
/*!***************************!*\
  !*** ./src/vdom/mount.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"mount\": function() { return /* binding */ mount; }\n/* harmony export */ });\nconst mount = ($node, $target) => {\n  $target.replaceWith($node);\n  return $node;\n};\n\n//# sourceURL=webpack://virtual-dom-simple-framework/./src/vdom/mount.js?");

/***/ }),

/***/ "./src/vdom/render.js":
/*!****************************!*\
  !*** ./src/vdom/render.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* binding */ render; }\n/* harmony export */ });\nconst renderElem = ({ tagName, attrs, children}) => {\n  // create the element\n  //   e.g. <div></div>\n  const $el = document.createElement(tagName);\n\n  // add all attributs as specified in vNode.attrs\n  //   e.g. <div id=\"app\"></div>\n  for (const [k, v] of Object.entries(attrs)) {\n    $el.setAttribute(k, v);\n  }\n\n  // append all children as specified in vNode.children\n  //   e.g. <div id=\"app\"><img></div>\n  for (const child of children) {\n    $el.appendChild(render(child));\n  }\n\n  return $el;\n};\n\nconst render = (vNode) => {\n  if (typeof vNode === 'string') {\n    return document.createTextNode(vNode);\n  }\n\n  // we assume everything else to be a virtual element\n  return renderElem(vNode);\n};\n\n//# sourceURL=webpack://virtual-dom-simple-framework/./src/vdom/render.js?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;