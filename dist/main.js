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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar createElement_1 = __webpack_require__(/*! ./vdom/createElement */ \"./src/vdom/createElement.ts\");\nvar render_1 = __webpack_require__(/*! ./vdom/render */ \"./src/vdom/render.ts\");\nvar mount_1 = __webpack_require__(/*! ./vdom/mount */ \"./src/vdom/mount.ts\");\nvar diff_1 = __webpack_require__(/*! ./vdom/diff */ \"./src/vdom/diff.ts\");\n/*\nconst createVApp = (count: number) => createElement({\n  tagName: \"div\",\n  attrs: { id: 'app' },\n  children: [\n    createElement({\n      tagName: 'p',\n      attrs: {\n        test: \"1\",\n      },\n      children: [\n        `count: ${count}`,\n      ]\n    }),\n  ],\n});\n*/\nvar createVApp = function (count) { return createElement_1.createElement({\n    tagName: \"div\",\n    attrs: { id: 'app' },\n    children: [\n        createElement_1.createElement({\n            tagName: 'p',\n            attrs: {},\n            children: [\n                \"count: \" + String(count),\n            ]\n        }),\n        createElement_1.createElement({\n            tagName: 'table',\n            attrs: { border: \"1\" },\n            children: [\n                createElement_1.createElement({\n                    tagName: 'tr',\n                    attrs: {},\n                    children: [\n                        createElement_1.createElement({\n                            tagName: 'th',\n                            attrs: {},\n                            children: [\n                                \"count\"\n                            ]\n                        }),\n                        createElement_1.createElement({\n                            tagName: 'th',\n                            attrs: {},\n                            children: [\n                                \"count * 2\"\n                            ]\n                        }),\n                    ]\n                }),\n                createElement_1.createElement({\n                    tagName: 'tr',\n                    attrs: {},\n                    children: [\n                        createElement_1.createElement({\n                            tagName: 'td',\n                            attrs: {},\n                            children: [\n                                String(count)\n                            ]\n                        }),\n                        createElement_1.createElement({\n                            tagName: 'td',\n                            attrs: {},\n                            children: [\n                                String(count * 2)\n                            ]\n                        }),\n                    ]\n                }),\n            ]\n        })\n    ],\n}); };\nvar count = 0;\nvar vApp = createVApp(count);\nvar $app = render_1.firstRender(vApp);\nvar $target = document.getElementById('app');\nvar $rootEl = mount_1.mount({ $node: $app, $target: $target });\nsetInterval(function () {\n    count++;\n    if (count < 3) {\n        console.log(\"count\", count);\n        var vNewApp = createVApp(count);\n        var patch = diff_1.diff(vApp, vNewApp);\n        if ($rootEl !== undefined) {\n            $rootEl = patch($rootEl);\n        }\n        vApp = vNewApp;\n    }\n}, 1500);\n\n\n//# sourceURL=webpack://virtual-dom-simple-framework/./src/index.ts?");

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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.diff = void 0;\nvar render_1 = __webpack_require__(/*! ./render */ \"./src/vdom/render.ts\");\nvar zip = function (xs, ys) {\n    var zipped = [];\n    for (var i = 0; i < Math.min(xs.length, ys.length); i++) {\n        zipped.push([xs[i], ys[i]]);\n    }\n    return zipped;\n};\nvar diffAttrs = function (oldAttrs, newAttrs) {\n    var patches = [];\n    var _loop_1 = function (k, v) {\n        patches.push(function ($node) {\n            $node.setAttribute(k, v);\n            return $node;\n        });\n    };\n    // setting newAttrs\n    for (var _i = 0, _a = Object.entries(newAttrs); _i < _a.length; _i++) {\n        var _b = _a[_i], k = _b[0], v = _b[1];\n        _loop_1(k, v);\n    }\n    console.log(\"paches\", patches);\n    var _loop_2 = function (k) {\n        if (!(k in newAttrs)) {\n            patches.push(function ($node) {\n                $node.removeAttribute(k);\n                return $node;\n            });\n        }\n    };\n    // removing attrs\n    for (var k in oldAttrs) {\n        _loop_2(k);\n    }\n    return function ($node) {\n        for (var _i = 0, patches_1 = patches; _i < patches_1.length; _i++) {\n            var patch = patches_1[_i];\n            patch($node);\n        }\n        return $node;\n    };\n};\nvar diffChildren = function (oldVChildren, newVChildren) {\n    var childPatches = [];\n    oldVChildren.forEach(function (oldVChild, i) {\n        childPatches.push(exports.diff(oldVChild, newVChildren[i]));\n    });\n    //console.log(\"childPatches\", childPatches)\n    var additionalPatches = [];\n    var _loop_3 = function (additionalVChild) {\n        additionalPatches.push(function ($node) {\n            $node.appendChild(render_1.render(additionalVChild));\n            return $node;\n        });\n    };\n    for (var _i = 0, _a = newVChildren.slice(oldVChildren.length); _i < _a.length; _i++) {\n        var additionalVChild = _a[_i];\n        _loop_3(additionalVChild);\n    }\n    return function ($parent) {\n        // since childPatches are expecting the $child, not $parent,\n        // we cannot just loop through them and call patch($parent)\n        for (var _i = 0, _a = zip(childPatches, $parent.childNodes); _i < _a.length; _i++) {\n            var _b = _a[_i], patch = _b[0], $child = _b[1];\n            patch($child);\n        }\n        for (var _c = 0, additionalPatches_1 = additionalPatches; _c < additionalPatches_1.length; _c++) {\n            var patch = additionalPatches_1[_c];\n            patch($parent);\n        }\n        return $parent;\n    };\n};\nvar diff = function (oldVTree, newVTree) {\n    //console.log(oldVTree, newVTree)\n    // newTreeがない場合 未定義を返す\n    if (newVTree === undefined) {\n        return function ($node) {\n            $node.remove();\n            return undefined;\n        };\n    }\n    // string type の場合は置き換えて Text type を返す\n    if (typeof oldVTree === 'string' ||\n        typeof newVTree === 'string') {\n        if (oldVTree !== newVTree) {\n            return function ($node) {\n                var $newNode = render_1.render(newVTree);\n                $node.replaceWith($newNode);\n                return $newNode;\n            };\n        }\n        else {\n            // 同じテキストの場合はそのままで返す\n            return function ($node) { return $node; };\n        }\n    }\n    // 差分を見つけずに，新しいnewVtreeをレンダリングして返す\n    if (oldVTree.tagName !== newVTree.tagName) {\n        return function ($node) {\n            var $newNode = render_1.render(newVTree);\n            $node.replaceWith($newNode);\n            return $newNode;\n        };\n    }\n    var patchAttrs = diffAttrs(oldVTree.attrs, newVTree.attrs);\n    var patchChildren = diffChildren(oldVTree.children, newVTree.children);\n    return function ($node) {\n        patchAttrs($node);\n        patchChildren($node);\n        return $node;\n    };\n};\nexports.diff = diff;\n\n\n//# sourceURL=webpack://virtual-dom-simple-framework/./src/vdom/diff.ts?");

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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.firstRender = exports.render = void 0;\nvar renderElem = function (vNode) {\n    // create the element\n    //   e.g. <div></div>\n    var $el = document.createElement(vNode.tagName);\n    // add all attributs as specified in vNode.attrs\n    //   e.g. <div id=\"app\"></div>\n    for (var _i = 0, _a = Object.entries(vNode.attrs); _i < _a.length; _i++) {\n        var _b = _a[_i], k = _b[0], v = _b[1];\n        $el.setAttribute(k, v);\n    }\n    // append all children as specified in vNode.children\n    //   e.g. <div id=\"app\"><img></div>\n    for (var _c = 0, _d = vNode.children; _c < _d.length; _c++) {\n        var child = _d[_c];\n        $el.appendChild(exports.render(child));\n    }\n    return $el;\n};\nvar render = function (vNode) {\n    if (typeof vNode === 'string') {\n        return document.createTextNode(vNode);\n    }\n    return renderElem(vNode);\n};\nexports.render = render;\nvar firstRender = function (vNode) {\n    return renderElem(vNode);\n};\nexports.firstRender = firstRender;\n\n\n//# sourceURL=webpack://virtual-dom-simple-framework/./src/vdom/render.ts?");

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