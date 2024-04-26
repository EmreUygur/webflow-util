"use strict";
/*
 * webflow-ix
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * NO-CODE version, keys off of [wfu] attributes.
 */
Object.defineProperty(exports, "__esModule", { value: true });
//import { WfuQuery, WfuRelativeLinkFixup, WfuTargetLinks } from '../webflow-url';
const webflow_core_1 = require("../webflow-core");
const debug_1 = require("../webflow-core/debug");
const globals_1 = require("../globals");
const init = () => {
    let core = webflow_core_1.Sa5Core.startup();
    // Initialize debugging
    let debug = new debug_1.Sa5Debug("sa5-ix");
    debug.debug("Initializing");
    // Prepare triggers
    // All <a> elements with href starting with ##
    const links = document.querySelectorAll('a[href^="##"]');
    links.forEach((link) => {
        // Extract the value after ##
        const value = link.getAttribute('href')?.substring(2);
        // Set the extracted value to the custom attribute [wfu-ix-trigger]
        if (value) {
            link.setAttribute(globals_1.Sa5Attribute.ATTR_IX_TRIGGER, value);
        }
        // Reset link
        link.setAttribute('href', '#');
    });
    // Wire up triggers
    // Select all elements with the custom attribute [wfu-ix-trigger]
    const triggerElements = document.querySelectorAll(`[${globals_1.Sa5Attribute.ATTR_IX_TRIGGER}]`);
    debug.debug(`setting up ${triggerElements.length} triggers.`);
    triggerElements.forEach((elem) => {
        elem.addEventListener('click', (event) => {
            // Prevent default action (if it's a link or another clickable element)
            event.preventDefault();
            debug.debug("trigger clicked", elem.getAttribute(globals_1.Sa5Attribute.ATTR_IX_TRIGGER));
            // Get the wfu-ix-trigger attribute value
            const triggerId = elem.getAttribute(globals_1.Sa5Attribute.ATTR_IX_TRIGGER);
            if (triggerId) {
                // Find the element with the matching [wfu-ix-id] value
                const targetElem = document.querySelector(`[${globals_1.Sa5Attribute.ATTR_IX_ID}="${triggerId}"]`);
                // If the target element is found, simulate a click on it
                if (targetElem) {
                    targetElem.click();
                }
            }
        });
    });
};
document.addEventListener("DOMContentLoaded", init);
//# sourceMappingURL=webflow-ix.js.map