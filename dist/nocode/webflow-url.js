"use strict";
/*
 * SA5 Url (No-Code)
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * NO-CODE version, keys off of [wfu] attributes.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const webflow_core_1 = require("../webflow-core");
const webflow_url_1 = require("../webflow-url");
// import { WfuQuery } from '../webflow-url/query';
// import { WfuRelativeLinkFixup } from '../webflow-url/relativeLinkFixup';
// import { WfuTargetLinks } from '../webflow-url/targetLinks';
const init = () => {
    let core = webflow_core_1.Sa5Core.startup();
    // Initialize debugging
    //    let debug = new Sa5Debug("sa5-url");
    //    debug.debug ("Initializing");
    let handler = new webflow_url_1.Sa5Url();
    handler.init();
    /**
     * Process querystring params into tagged elements
     * NOTE: A links are currently ignored

    // TODO: configure A link behavior
    new WfuQuery().init();
     */
    // https://www.brojo.org/pub?b42d817d_page=2
    /**
     * Fixup relative links from the CMS

    let elements = Array.from(
        document.querySelectorAll(
            Sa5Attribute.getBracketed(Sa5Attribute.ATTR_URL_RELATIVE_LINKS) // "[wfu-relative-links]"
            ));

    elements.forEach((element: HTMLAnchorElement) => {
        new WfuRelativeLinkFixup(element).init();
    });
     */
    /**
     * Target external links to _blank

    // BUGGED: designer change on how links work ??
    elements = Array.from(
        document.querySelectorAll(
            Sa5Attribute.getBracketed(Sa5Attribute.ATTR_URL_EXTERNAL_LINKS) // "[wfu-external-links]"
            ));

    elements.forEach((element: HTMLAnchorElement) => {
        new WfuTargetLinks(element).init();
    });
     */
    //    new WfuTargetLinks().init(); 
};
document.addEventListener("DOMContentLoaded", init);
//# sourceMappingURL=webflow-url.js.map