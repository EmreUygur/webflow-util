"use strict";
/*
 * webflow-utils
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * NO-CODE version, keys off of [wfu] attributes.
 */
Object.defineProperty(exports, "__esModule", { value: true });
//import { WfuQuery, WfuRelativeLinkFixup, WfuTargetLinks } from '../webflow-url';
const webflow_core_1 = require("../webflow-core");
const debug_1 = require("../webflow-core/debug");
//import { loadAllData } from '../modules/webflow-data.js';
const webflow_data_1 = require("../webflow-data");
const webflow_databind_1 = require("../webflow-databind");
//import { dataBindAllForms } from '../modules/webflow-form.js';
// export var dataBindAll = function () {
const init = () => {
    //    new Sa5Core().init();
    let core = webflow_core_1.Sa5Core.startup();
    //    console.log("webflow-data", "init"); 
    // Initialize debugging
    let debug = new debug_1.Sa5Debug("sa5-data");
    debug.debug("Initializing");
    // Create datastore
    var ds = new webflow_data_1.Sa5Datastore();
    ds.init();
    // BUG: DEPRECATED 
    // Bind all form elements
    //    dataBindAllForms(db);
    let binder = new webflow_databind_1.WfuDataBinder(ds).bindAll();
};
document.addEventListener("DOMContentLoaded", init);
//# sourceMappingURL=webflow-data.js.map