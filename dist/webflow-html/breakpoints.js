"use strict";
/*
 * webflow-html
 * Breakpoints
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5Breakpoints = exports.sa5Breakpoints = void 0;
const webflow_core_1 = require("../webflow-core");
const debug_1 = require("../webflow-core/debug");
// Webflow breakpoints
exports.sa5Breakpoints = {
    large1920: '(min-width: 1920px)',
    large1440: '(min-width: 1440px) and (max-width: 1919px)',
    large1280: '(min-width: 1280px) and (max-width: 1439px)',
    desktop: '(min-width: 992px) and (max-width: 1279px)',
    tablet: '(min-width: 768px) and (max-width: 991px)',
    mobileLandscape: '(min-width: 480px) and (max-width: 767px)',
    mobilePortrait: '(max-width: 479px)'
};
class Sa5Breakpoints {
    // Type guard to check if a function is a UserInfoChangedCallback
    isBreakpointsChangedCallback(func) {
        if (!func)
            return false;
        // Adjust this check as needed
        return func.length === 1;
    }
    constructor(config = {}) {
        // Breakpoint changed
        this.handleBreakpointChange = ((e) => {
            // We only want matching events 
            if (!e.matches)
                return;
            // Identify breakpoint
            var device = null;
            for (let d in exports.sa5Breakpoints) {
                if (e.media == exports.sa5Breakpoints[d]) {
                    //                console.log(`Current device: ${d}`);
                    device = d;
                }
            }
            // Notify any config-specified handler
            if (this.config.breakpointChangedCallback) {
                this.config.breakpointChangedCallback(device, e);
            }
        });
        // Merge configs, with defaults
        this.config = {
            breakpointChangedCallback: config.breakpointChangedCallback,
        };
        let core = webflow_core_1.Sa5Core.startup();
        const breakpointChanged = core.getHandler('breakpointChanged');
        this.config.breakpointChangedCallback = breakpointChanged;
    }
    init() {
        // Initialize debugging
        let debug = new debug_1.Sa5Debug("sa5-html");
        debug.debug("Breakpoints initialized.", this.config);
        // Create MediaQueryList and attach listeners for each breakpoint
        for (let device in exports.sa5Breakpoints) {
            let mediaQueryList = window.matchMedia(exports.sa5Breakpoints[device]);
            // Register internal handler
            mediaQueryList.addEventListener('change', this.handleBreakpointChange);
            if (mediaQueryList.matches) {
                this.handleBreakpointChange({
                    media: mediaQueryList.media,
                    matches: mediaQueryList.matches
                });
            }
        }
    }
}
exports.Sa5Breakpoints = Sa5Breakpoints;
// Register
// window["sa5"] = window["sa5"] || []; // {};
// window["sa5"]["Sa5Breakpoints"] = Sa5Breakpoints;
// "site": {
//     "mediaQueries": [{
//         "key": "main",
//         "min": 992,
//         "max": 10000
//     }, {
//         "key": "medium",
//         "min": 768,
//         "max": 991
//     }, {
//         "key": "small",
//         "min": 480,
//         "max": 767
//     }, {
//         "key": "tiny",
//         "min": 0,
//         "max": 479
//     }]
//# sourceMappingURL=breakpoints.js.map