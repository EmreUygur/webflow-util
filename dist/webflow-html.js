"use strict";
/*
 * webflow-html
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * HTML Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5Html = void 0;
const webflow_core_1 = require("./webflow-core");
const debug_1 = require("./webflow-core/debug");
const dynamic_attributes_1 = require("./webflow-html/dynamic-attributes");
const breakpoints_1 = require("./webflow-html/breakpoints");
class Sa5Html {
    constructor(config) {
        this.config = config;
        this.debug = new debug_1.Sa5Debug("sa5-html");
        this.debug.enabled = this.config.debug;
    }
    init() {
        this.debug.debug("sa5-html init.");
        // Init breakpoints
        let breakpoints = new breakpoints_1.Sa5Breakpoints({
            breakpointChangedCallback: (breakpointName, e) => {
                window["sa5"] = window["sa5"] || {};
                const sa5 = window["sa5"];
                // Get any global handler
                const breakpointChangeHandler = sa5["breakpointChanged"];
                if (breakpointChangeHandler)
                    breakpointChangeHandler(breakpointName, e);
            },
        });
        breakpoints.init();
        // Init dynamic attributes
        if (this.config.dynamicAttributes) {
            let obj = new dynamic_attributes_1.Sa5HtmlDynamicAttributes({});
            obj.init();
        }
    }
}
exports.Sa5Html = Sa5Html;
// Register
webflow_core_1.Sa5Core.startup(Sa5Html);
// window["sa5"] = window["sa5"] || []; // {};
// window["sa5"]["Sa5Html"] = Sa5Html;
//# sourceMappingURL=webflow-html.js.map