"use strict";
/*
 * webflow-countup
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Countup Utilities
 * Wraps Inorganik's CountUp library for nocode & locode use in Webflow.
 * Utilizes Waypoints for individual and group triggering.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5CountUp = void 0;
// Library added by npm package install 
// https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.0.7/countUp.js';
const countup_js_1 = require("countup.js");
// Added by .d.ts types wrapper, custom built 
// BUG: import { Waypoint } from 'waypoints'; // 'waypoint'; 
const webflow_core_1 = require("../webflow-core");
const debug_1 = require("../webflow-core/debug");
const globals_1 = require("../globals");
var defaultConfig = {
    waypointSelfTrigger: {
        offset: 90, //'90%',
    },
    waypointGroupTrigger: {
        offset: 70, //'70%',
    },
    countupSettings: {},
    debug: false, // Debugging mode
};
class Sa5CountUp {
    // Initialize
    constructor(customConfig = {}) {
        // Initialize debugging
        this.debug = new debug_1.Sa5Debug("sa5-countup");
        this.debug.debug("Initializing");
        // Merge configs
        //        this.config = Object.assign({}, defaultConfig, customConfig);
        this.config = { ...defaultConfig, ...customConfig };
        // Enable debugging, if specified
        this.debug.enabled = this.config.debug;
    }
    init() {
        //        console.log("init countup");
        //        new Sa5Core().init();
        let core = webflow_core_1.Sa5Core.startup();
        this.debug.debug("countup init");
        this.installCountupWaypoints();
    }
    startCountups(group) {
        this.debug.debug("startCountups", group);
        const that = this;
        // Install self-triggered ones
        const elements = document.querySelectorAll(`[${globals_1.Sa5Attribute.ATTR_COUNTUP}='${group}']`); // wfu-countup
        elements.forEach((element) => {
            // Perform actions on each element
            //            console.log(element.textContent);
            //            const v = element.textContent;
            //    $(this).attr("wfu-countup-val", v);
            const n = parseFloat(element.textContent ?? "0");
            // Configuration settings
            // https://github.com/inorganik/CountUp.js 
            const counter = new countup_js_1.CountUp(element, n, this.config.countupSettings).start();
        });
    }
    installCountupWaypoints() {
        this.debug.debug("installCountupWaypoints");
        const that = this;
        // Install self-triggered ones
        const triggers = document.querySelectorAll(globals_1.Sa5Attribute.getBracketed(globals_1.Sa5Attribute.ATTR_COUNTUP_TRIGGER) // `[wfu-countup-trigger]`
        );
        triggers.forEach((trigger) => {
            //        $("[wfu-countup-trigger]").each(function() { 
            const group = trigger.getAttribute(globals_1.Sa5Attribute.ATTR_COUNTUP_TRIGGER // "wfu-countup-trigger"
            );
            var countups = [];
            // Install group-triggered countups
            const elements = document.querySelectorAll(`[${globals_1.Sa5Attribute.ATTR_COUNTUP}='${group}']`); // wfu-countup
            elements.forEach((element) => {
                //                $(`[wfu-countup='${group}']`).each(function() {
                const v = element.textContent;
                //    $(this).attr("wfu-countup-val", v);
                const n = parseFloat(element.textContent ?? "0");
                // Configuration settings
                // https://github.com/inorganik/CountUp.js 
                const counter = new countup_js_1.CountUp(element, n, this.config.countupSettings);
                if (counter != null)
                    countups.push(counter);
                counter.start();
            });
            // const wp = new Waypoint({
            //     element: trigger as HTMLElement,
            //     handler: function() { 
            //         for (var i = 0; i < countups.length; i++) {
            //             countups[i].start();
            //         }
            //         this.destroy(); // to trigger once
            //     }, 
            //     offset: that.config.waypointGroupTrigger.offset // '70%'
            // });      
        });
        // Install self-triggered ones
        const counters = document.querySelectorAll(globals_1.Sa5Attribute.getBracketed(globals_1.Sa5Attribute.ATTR_COUNTUP) // `[wfu-countup]`
        );
        counters.forEach((c) => {
            //        $("[wfu-countup='']").each(function() {
            //            const v = c.textContent;
            //      $(this).attr("wfu-countup-val", v);
            const n = parseFloat(c.textContent ?? "0");
            // https://codepen.io/vn38/pen/eYZWeGr 
            // Configuration settings
            // https://github.com/inorganik/CountUp.js 
            const counter = new countup_js_1.CountUp(c, n, that.config.countupSettings);
            // const wp = new Waypoint({
            //     element: c as HTMLElement,
            //     handler: function() {
            //         counter.start(); 
            //         this.destroy(); // to trigger once
            //     }, 
            //     offset: that.config.waypointSelfTrigger.offset // '90%'
            // });
        });
    }
}
exports.Sa5CountUp = Sa5CountUp;
// Register
window["sa5"] = window["sa5"] || {};
window["sa5"]["Sa5CountUp"] = Sa5CountUp;
//# sourceMappingURL=webflow-countup.js.map