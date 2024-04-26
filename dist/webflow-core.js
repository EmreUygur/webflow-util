"use strict";
/*
 * webflow-core
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Core Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5Core = void 0;
// export interface Sa5Handler {
//     [0]: string;
//     [1]: Function;
// }
const globals_1 = require("./globals");
const debug_1 = require("./webflow-core/debug");
const designer_1 = require("./webflow-core/designer");
/*
 * SA5 Core
 */
class Sa5Core {
    // Returns all handlers found by the specified name
    getHandlers(name) {
        return this.handlers
            .filter((item) => item[0] === name)
            .map((item) => item[1]);
    }
    // Returns the first handler found by the specified name
    getHandler(name) {
        const item = this.handlers.find((item) => item[0] === name);
        return item ? item[1] : undefined;
    }
    // Map for elements wired to Sa5 objects
    //    public elements: WeakMap<HTMLElement, object>;
    //     map.set(elem, myObject);
    // // Later, you can retrieve the object like this
    // let retrievedObject = map.get(elem);
    constructor() {
        this.handlers = [];
        // Remove any designer-only elements
        new designer_1.Sa5Designer().init();
    }
    init() {
        this.initDebugMode();
        this.initAsync();
    }
    async initAsync() {
        this.initScriptInjectionsAsync();
    }
    async initScriptInjectionsAsync() {
        // console.log("Sa5", "Script injections");
        document.addEventListener("DOMContentLoaded", () => {
            const loadSrcScripts = document.querySelectorAll(`script[${globals_1.Sa5Attribute.ATTR_CORE_SCRIPT_INJECT}]`);
            loadSrcScripts.forEach((script) => {
                const loadSrcUrl = script.getAttribute(globals_1.Sa5Attribute.ATTR_CORE_SCRIPT_INJECT);
                if (loadSrcUrl) {
                    fetch(loadSrcUrl)
                        .then((response) => response.text())
                        .then((jsContent) => {
                        // Create a new script element and set its content
                        const newScript = document.createElement("script");
                        newScript.textContent = jsContent;
                        // Replace the current script tag with the new one
                        script.replaceWith(newScript);
                    })
                        .catch((error) => {
                        console.error("Error loading script:", error);
                    });
                }
            });
        });
    }
    // Auto-enable debug
    // based on ?sa-debug=true querystring param
    initDebugMode() {
        const debugParamKey = "debug"; // ?sa-debug=true
        //        var wfuDebugValue = Boolean(localStorage.setItem('wfuDebug', 'true'));
        let params = new URLSearchParams(window.location.search);
        let hasDebug = params.has(debugParamKey);
        if (hasDebug) {
            let wfuDebug = new debug_1.Sa5Debug(`sa5 init`);
            wfuDebug.persistentDebug = this.stringToBoolean(params.get(debugParamKey));
        }
    }
    stringToBoolean(str) {
        const truthyValues = ["1", "true", "yes"];
        const falsyValues = ["0", "false", "no"];
        if (truthyValues.indexOf(str.toLowerCase()) !== -1) {
            return true;
            // } else if (falsyValues.indexOf(str.toLowerCase()) !== -1) {
            //     return false;
        }
        else {
            return false;
        }
    }
    // Factory
    // Get or create Sa5Core
    static startup(module = null) {
        //        console.debug("sa5core", "startup");
        //        console.debug("INITIALIZING SA5CORE");
        //        console.log(window["sa5"]);
        let sa5instance = window["sa5"];
        var core; // = new Sa5Core();
        // Initialize Sa5Core if needed
        if (sa5instance?.constructor?.name == "Sa5Core") {
            core = sa5instance;
        }
        else {
            //         if(window["sa5"])
            // console.log("name", window["sa5"].name);
            core = new Sa5Core();
            core.init();
            // Absorb handlers
            if (Array.isArray(sa5instance))
                core.handlers = sa5instance; //window["sa5"];
            window["sa5"] = core;
            window["Sa5"] = window["sa5"];
            //            console.log("post", window["sa5"] instanceof Sa5Core);
        }
        // Add new module
        //window["sa5"] = window["sa5"] || []; // {};
        if (module) {
            //            console.debug("Registered module", module.name);
            window["sa5"][module.name] = module;
            //            console.log(window["sa5"][module.name]);
        }
        // instance.constructor.name
        return core;
    }
    // Add new handlers
    push(o) {
        this.handlers.push(o);
    }
}
exports.Sa5Core = Sa5Core;
// Complete initialization
// even though we don't need it yet
Sa5Core.startup();
// Register
//window["sa5"] = window["sa5"] || []; // {};
//window["sa5"]["Sa5Core"] = Sa5Core;
//# sourceMappingURL=webflow-core.js.map