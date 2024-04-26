"use strict";
/*
 * webflow-demo
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * NO-CODE version, keys off of [wfu] attributes.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const webflow_demo_1 = require("../webflow-demo");
const webflow_core_1 = require("../webflow-core");
const debug_1 = require("../webflow-core/debug");
const globals_1 = require("../globals");
const init = () => {
    //    new Sa5Core().init();
    let core = webflow_core_1.Sa5Core.startup();
    // Initialize debugging
    let debug = new debug_1.Sa5Debug("wfu-demo");
    debug.debug("Initializing");
    const webflowInfo = new webflow_demo_1.WebflowInfo();
    const elements = document.querySelectorAll(`a[${globals_1.Sa5Attribute.ATTR_DEMO_LINK}]` // wfu-demo-link 
    );
    // Iterate over the matched elements
    elements.forEach((element) => {
        // Do something with each element
        webflowInfo.updateHrefToWebflowPreviewLink(element);
    });
};
document.addEventListener("DOMContentLoaded", init);
//# sourceMappingURL=webflow-demo.js.map