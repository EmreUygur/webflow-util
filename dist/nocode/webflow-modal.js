"use strict";
/*
 * webflow-modal
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
const webflow_modal_1 = require("../webflow-modal");
const init = () => {
    let core = webflow_core_1.Sa5Core.startup();
    // Initialize debugging
    let debug = new debug_1.Sa5Debug("sa5-modal");
    debug.debug("Initializing");
    // Remove any elements that are cookie-suppressed
    document.querySelectorAll(globals_1.Sa5Attribute.getBracketed(globals_1.Sa5Attribute.ATTR_MODAL) // "[wfu-modal]"
    ).forEach((element) => {
        const modalElem = element;
        let modal = new webflow_modal_1.Sa5Modal(modalElem);
        modal.init();
    });
};
document.addEventListener("DOMContentLoaded", init);
//# sourceMappingURL=webflow-modal.js.map