"use strict";
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailFormat = void 0;
// 
/*
 * email formats
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Used for FORM INPUT validation.
 */
// Encoder
// http://coderstoolbox.net/string/#!encoding=js&action=encode&charset=utf_8
exports.emailFormat = {
    // From https://emailregex.com/
    "all": "(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])",
};
//# sourceMappingURL=email.js.map