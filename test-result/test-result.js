(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.result = void 0;
var test_code2_1 = require("./test-code2");
console.log("bundled script executing..");
var m2 = {"inserted":true};
exports.result = { m1: (0, test_code2_1.addExpression)("inserted") };
exports.result.m2 = m2;
exports.result.m3 = ["inserted",{"inserted":true}];
console.log(exports.result);

},{"./test-code2":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addExpression = void 0;
function addExpression(s) {
    return s + "!";
}
exports.addExpression = addExpression;

},{}]},{},[1]);
