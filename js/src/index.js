"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.browserifyDeclarative = void 0;
var browserify = __importStar(require("browserify"));
/**
 * Bundles script with all requirements use browserify
 * returns promise of result code string
 */
function browserifyDeclarative(conf) {
    var b = browserify.default();
    return new Promise(function (resolve, reject) {
        try {
            b.add(conf.srcPath)
                .bundle(function (err, src) {
                if (err) {
                    reject(err);
                }
                var content = src.toString();
                if (conf.tokensToReplace) {
                    content = Object.keys(conf.tokensToReplace).reduce(function (acc, el) { return acc.split(JSON.stringify(el))
                        .join(JSON.stringify(conf.tokensToReplace[el])); }, src.toString());
                }
                if (conf.saveBundlePath) {
                    require("fs").writeFile(conf.saveBundlePath, content, function (err) {
                        if (!err) {
                            resolve(content);
                        }
                        reject(err);
                    });
                }
                else {
                    resolve(content);
                }
            });
        }
        catch (e) {
            reject(e);
        }
    });
}
exports.browserifyDeclarative = browserifyDeclarative;
