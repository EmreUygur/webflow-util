"use strict";
/*
 * target links
 * Fixues up //self/ relative links for CMS.
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Url Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WfuTargetLinks = void 0;
/*
 * Link-processing functions.
 * Fixues up //self/ relative links for CMS.
 */
class WfuTargetLinks {
    // TODO: Allow forcing target override 
    constructor(element) {
        //        this.config = config;
        this._element = element;
    }
    // Process elements with the custom attr wfu-query-param
    init() {
        // Get all 'a' elements with 'href' attribute starting with 'http://' or 'https://' and without 'target' attribute
        let elements = Array.from(document.querySelectorAll("a[href^='http://']:not([target]), a[href^='https://']:not([target])"));
        elements.forEach((element) => {
            // Get the href attribute
            let href = element.getAttribute('href');
            if (href) {
                console.debug(`retargeting ${href}.`);
                // Set the target attribute to '_blank'
                element.setAttribute('target', '_blank');
            }
        });
    }
}
exports.WfuTargetLinks = WfuTargetLinks;
//# sourceMappingURL=targetLinks.js.map