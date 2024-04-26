"use strict";
/*
 * webflow-detect
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * NO-CODE version, keys off of [wfu] attributes.
 * Place in HEAD, do not defer
 */
Object.defineProperty(exports, "__esModule", { value: true });
const webflow_core_1 = require("../webflow-core");
const debug_1 = require("../webflow-core/debug");
const globals_1 = require("../globals");
const webflow_detect_1 = require("../webflow-detect");
// type VideoTimeUpdateCallback = (name: string, time: number, totalTime: number, percent: number) => void;
// Region (Abbreviation: Reg.)
// Zone (Abbreviation: Zn.)
// Bloc (Often used in terms like "trade bloc" or "economic bloc")
// Cluster (Abbreviation: Cl.)
// Grouping (Abbreviation: Grp.)
// Assembly (Abbreviation: Asm.)
// Alliance (Often used in political or military contexts)
// Federation (Abbreviation: Fed.)
// Union (Abbreviation: Un.)
// Sector (Abbreviation: Sec.)
// Run IIFE immediately 
(async () => {
    console.log("DETECT");
    let core = webflow_core_1.Sa5Core.startup();
    // Initialize debugging
    let debug = new debug_1.Sa5Debug("sa5-detect");
    debug.debug("Initializing");
    /**
     * Get IP Info, GeoLocation
     */
    // Usage
    let detect = new webflow_detect_1.Sa5Detect();
    // Process Rules 
    let routingRules = window[globals_1.Sa5GlobalVar.GLOBAL_ROUTE];
    if (routingRules)
        detect.routingRules.load(routingRules);
    await detect.applyDetectContextAsync();
})();
const init = async () => {
};
document.addEventListener("DOMContentLoaded", init);
//# sourceMappingURL=webflow-detect.js.map