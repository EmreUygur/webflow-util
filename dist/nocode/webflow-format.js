"use strict";
/*
 * webflow-format
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * NO-CODE version, keys off of [wfu] attributes.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const webflow_format_1 = require("../webflow-format");
const webflow_core_1 = require("../webflow-core");
const debug_1 = require("../webflow-core/debug");
const globals_1 = require("../globals");
const init = () => {
    //    new Sa5Core().init();
    let core = webflow_core_1.Sa5Core.startup();
    // Initialize debugging
    let debug = new debug_1.Sa5Debug("sa5-format");
    //    debug.debug ("Initializing");
    const webflowFormat = new webflow_format_1.WebflowFormat();
    /**
     * Format numbers & currency
     */
    const elements = document.querySelectorAll(globals_1.Sa5Attribute.getBracketed(globals_1.Sa5Attribute.ATTR_FORMAT) // '[wfu-format]'
    );
    // Iterate over the matched elements
    elements.forEach((element) => {
        webflowFormat.formatField(element);
    });
    /**
     * Format date
     * specify moment formatting string
     */
    document.querySelectorAll(globals_1.Sa5Attribute.getBracketed(globals_1.Sa5Attribute.ATTR_FORMAT_DATE) // `[wfu-format-date]`
    )
        .forEach((element) => {
        webflowFormat.formatDate(element);
    });
};
document.addEventListener("DOMContentLoaded", init);
//# sourceMappingURL=webflow-format.js.map