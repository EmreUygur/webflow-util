"use strict";
/*
 * webflow-ui
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * NO-CODE version, keys off of [wfu] attributes.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const webflow_ui_1 = require("../webflow-ui");
const init = () => {
    // Find all rating components
    document.querySelectorAll('div[wfu-ui="rating"]')
        .forEach((element) => {
        new webflow_ui_1.Sa5Rating(element).init();
    });
};
// Auto-execute on DOM load
document.addEventListener("DOMContentLoaded", init);
//# sourceMappingURL=webflow-ui.js.map