"use strict";
/*
 * webflow-404
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * NO-CODE version, keys off of [wfu] attributes.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../globals");
const webflow_core_1 = require("../webflow-core");
const debug_1 = require("../webflow-core/debug");
const init = () => {
    //    new Sa5Core().init();
    let core = webflow_core_1.Sa5Core.startup();
    // Initialize debugging
    let debug = new debug_1.Sa5Debug("sa5-404");
    debug.debug("Initializing");
    // parse url, put into search field
    // [wfu-404-search]
    set404SearchInputValue();
    // special url detection and redirects
};
function set404SearchInputValue() {
    // 1. Parse the URL to extract the path
    const url = new URL(window.location.href);
    const path = url.pathname;
    // 2. Convert the path into words with space delimiters
    // Remove the leading slash, split by slashes, replace hyphens with spaces, reverse the segments, and then join with spaces
    const searchQuery = path.slice(1).split('/')
        .map(segment => segment.replace(/-/g, ' '))
        .reverse()
        .join(' ');
    // 3. Set the value of the input field with the custom attribute [wfu-404-search] to the parsed content
    const inputElement = document.querySelector(`[${globals_1.Sa5Attribute.ATTR_404_SEARCH}]`);
    if (inputElement) {
        inputElement.value = searchQuery;
    }
}
document.addEventListener("DOMContentLoaded", init);
//# sourceMappingURL=webflow-404.js.map