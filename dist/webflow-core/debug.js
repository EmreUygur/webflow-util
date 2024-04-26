"use strict";
/*
 * webflow-core
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Debug Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5Debug = void 0;
class Sa5Debug {
    // Get or set WFU persistent debug state
    // which is stored in localStorage. 
    get persistentDebug() {
        return Boolean(localStorage.getItem(this.localStorageDebugFlag));
    }
    set persistentDebug(active) {
        if (active) {
            localStorage.setItem(this.localStorageDebugFlag, "true");
            console.debug("sa5-core debug enabled (persistent).");
        }
        else {
            localStorage.removeItem(this.localStorageDebugFlag);
            console.debug("sa5-core debug disabled (persistent).");
        }
    }
    // Enable/disable debugging 
    get enabled() {
        // localStorage is checked for a debug flag, to enable remote debug enabling 
        // Any non-null string value will resolve to TRUE here, including the string "false" 
        var wfuDebugValue = Boolean(localStorage.getItem(this.localStorageDebugFlag));
        // Or this with the current debug state
        // If either is enabled, debugging is on 
        wfuDebugValue = wfuDebugValue || this._enabled;
        return wfuDebugValue;
    }
    set enabled(active) {
        this._enabled = active;
    }
    // Initialize
    constructor(label) {
        this.localStorageDebugFlag = 'sa5-debug';
        this._enabled = false;
        // Save the label, for console logging
        this._label = label;
    }
    // Start a console log group
    group(name) {
        if (this.enabled)
            console.group(name);
    }
    // End a console log group
    groupEnd() {
        if (this.enabled)
            console.groupEnd();
    }
    // Log debug data to the console
    debug(...args) {
        if (this.enabled)
            // Unlimited arguments in a JavaScript function
            // https://stackoverflow.com/a/6396066
            console.debug(this._label, ...args);
    }
}
exports.Sa5Debug = Sa5Debug;
//# sourceMappingURL=debug.js.map