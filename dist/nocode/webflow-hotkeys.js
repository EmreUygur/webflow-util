"use strict";
/*
 * webflow-hotkeys
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * NO-CODE version, keys off of [wfu] attributes.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const webflow_hotkeys_1 = require("../webflow-hotkeys");
const webflow_core_1 = require("../webflow-core");
const debug_1 = require("../webflow-core/debug");
const init = () => {
    //    new Sa5Core().init();
    let core = webflow_core_1.Sa5Core.startup();
    // Initialize debugging
    let debug = new debug_1.Sa5Debug("sa5-hotkeys");
    debug.debug("Initializing");
    const sa5Hotkeys = new webflow_hotkeys_1.Sa5Hotkeys();
    sa5Hotkeys.init();
};
document.addEventListener("DOMContentLoaded", init);
//# sourceMappingURL=webflow-hotkeys.js.map