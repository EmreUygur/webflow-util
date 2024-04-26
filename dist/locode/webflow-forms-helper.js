"use strict";
/*
 * webflow-forms-helper
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * LO-CODE Helper class to simplify form functions.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataBindAll = void 0;
const webflow_data_js_1 = require("../modules/webflow-data.js");
const webflow_form_js_1 = require("../modules/webflow-form.js");
var dataBindAll = function () {
    // Create database
    var db = (0, webflow_data_js_1.loadAllData)();
    // Bind all form elements
    (0, webflow_form_js_1.dataBindAllForms)(db);
};
exports.dataBindAll = dataBindAll;
//# sourceMappingURL=webflow-forms-helper.js.map