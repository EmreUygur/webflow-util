"use strict";
/*
 * query
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Url Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WfuRelativeLinkFixup = void 0;
/*
 * Link-processing functions.
 * Fixues up //self/ relative links for CMS.
 */
class WfuRelativeLinkFixup {
    // TODO: Support alternatives 
    constructor(element) {
        this._element = element;
        //        this.config = config;
    }
    // Process elements with the custom attr wfu-query-param
    init() {
        // Case insensitive jQuery attribute selector
        // https://stackoverflow.com/a/38923109
        // Fixup broken Webflow relative links
        // where it prepends http://.
        // Valid links should include 
        // ./sdlfj
        // lksdfj
        // ?lkdsfj
        // Get all 'a' elements with 'href' attribute containing '//self/'
        let elems = Array.from(this._element.querySelectorAll("a[href^='http://.' i], a[href^='https://.' i], a[href^='http://?' i], a[href^='https://?' i]"));
        elems.forEach((elem) => {
            // Get the href attribute
            let href = elem.getAttribute('href');
            if (href) {
                // Create a new href
                if (href.startsWith("http://."))
                    href = href.substring(8);
                if (href.startsWith("https://."))
                    href = href.substring(9);
                if (href.startsWith("http://?"))
                    href = href.substring(7);
                if (href.startsWith("https://?"))
                    href = href.substring(8);
                // Set the href attribute to the pathname of the URL
                elem.setAttribute('href', href);
            }
        });
        // Get all 'a' elements with 'href' attribute containing '//self/'
        let elements = Array.from(this._element.querySelectorAll("a[href*='//self/' i], a[href$='//self' i]"));
        elements.forEach((element) => {
            // Get the href attribute
            let originalHref = element.getAttribute('href');
            if (originalHref) {
                // Create a new URL object
                const originalUrl = new URL(originalHref);
                // Create relative path
                let relativeHref = originalUrl.pathname + originalUrl.search + originalUrl.hash;
                // Set the href attribute to the pathname of the URL
                element.setAttribute('href', relativeHref);
            }
        });
    }
}
exports.WfuRelativeLinkFixup = WfuRelativeLinkFixup;
//# sourceMappingURL=relativeLinkFixup.js.map