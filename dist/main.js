/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
eval("for (var i = 1; i < 4; i++) {\n  console.log(i);\n}\n/* var a = <div id=\"a\" class=\"c\">\r\n    <div></div>\r\n    <div></div>\r\n    <div></div>\r\n</div> */\n//SUCCESS  就能够这也样一个结构 createElement(\"div\", {\n//   id: \"a\",\n//   \"class\": \"c\"\n// }, createElement(\"div\", null), createElement(\"div\", null), createElement(\"div\", null));\n//  jsx 语法即使碰到html的括号会被翻译成一个函数的调用  以上会翻译为React.createElement('div',null);\n// 通过配置  @babel/transform-react-jsx  插件的 第二个参数，能够修改这个函数名\n// 如果我去定义这createElement为document.createElement 的操作，就能够将 jsx语法转化为真实的dom节点\n\n\nfunction createElement(tagName, attributes) {\n  var e = document.createElement(tagName); // attributes 是对象\n\n  for (var p in attributes) {\n    e.setAttribute(p, attributes[p]);\n  } // children 是子元素数组集合\n\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  for (var _i = 0, _children = children; _i < _children.length; _i++) {\n    var child = _children[_i];\n\n    if (typeof child === 'string') {\n      child = document.createTextNode(child);\n    }\n\n    e.appendChild(child);\n  }\n\n  return e;\n} // 将a挂载到body上\n\n\nwindow.a = createElement(\"div\", {\n  id: \"a\",\n  \"class\": \"c\"\n}, createElement(\"div\", null, \"a\"), createElement(\"div\", null, \"b\"), createElement(\"div\", null, \"c\")); // 将a 挂载到 body上\n\ndocument.body.appendChild(a); // 当有文本内容的时候，需要判断\n\n//# sourceURL=webpack://toyreact/./main.js?");
/******/ })()
;