"use strict";
/*
 * SA5 Url | Query Passthrough
 * Carries querystring info to other pages
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Url Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5QueryPassthrough = void 0;
const debug_1 = require("../webflow-core/debug");
class Sa5QueryPassthrough {
    constructor(config = {}) {
        this.config = {
            // Other params to ignore? user accounts login, redir params, etc.
            // https://www.brojo.org/pub?b42d817d_page=2
            ignorePatterns: config.ignorePatterns ?? [
                /_page$/, // Ignore pagination params
            ],
            overwriteExisting: config.overwriteExisting ?? false,
            internalOnly: config.internalOnly ?? true,
        };
        // Initialize debugging
        // this.debug = new Sa5Debug("sa5-url");
        // this.debug.debug ("Initializing");
        this.debug = new debug_1.Sa5Debug("sa5-url-querypassthrough");
        this.debug.debug("Initializing");
        this.debug.debug("Config:", this.config);
    }
    // Process elements with the custom attr wfu-query-param
    init() {
        document.addEventListener('click', (event) => {
            const target = event.target;
            const anchor = target.closest('a');
            if (anchor) {
                //                console.log("link clicked"); 
                event.preventDefault();
                const currentPageParams = new URLSearchParams(window.location.search);
                // Get the parameters of the anchor URL
                const anchorParams = new URLSearchParams(anchor.search);
                // Parse the URL and query string
                const anchorUrl = new URL(anchor.href);
                // console.log("old url", url.toString())
                // const params = new URLSearchParams(url.search);
                // Check if the URL is relative or if the hostname matches the current hostname
                if (this.config.internalOnly) {
                    const isRelativeOrSameHost = !anchorUrl.host || anchorUrl.host === window.location.host;
                    if (!isRelativeOrSameHost) {
                        //                        console.log("Not internal, skipping");
                        return;
                    }
                }
                event.preventDefault();
                // Object to hold the new parameters
                //                let newParams: { [key: string]: string } = {};
                let newParams = new URLSearchParams();
                /**
                 * Identify the query param keys we want to preserve
                 */
                // Iterate over existing parameters
                //                params.forEach((value, key) => {
                for (const [key, value] of currentPageParams) {
                    // if (!this.shouldIgnoreKey(key) && !anchorParams.has(key)) {
                    //     anchorParams.append(key, value);
                    //                    console.log(key, value); 
                    if (this.shouldIgnoreKey(key))
                        continue;
                    if (anchorParams.has(key) && !this.config.overwriteExisting)
                        continue;
                    //                    anchorParams[key] = value;
                    // && !anchorParams.has(key)) {
                    //     anchorParams.append(key, value);
                    // }
                    // // Ignore parameters ending in "_page" (pagination)
                    // if (!key.endsWith('_page')) 
                    //     continue;
                    // Ignore redir Webflow params (user accounts)
                    // TODO: 
                    //                    console.log("adding", key, value);
                    // Add this one
                    //                    newParams[key] = value;
                    newParams.set(key, value);
                    //                    console.log(newParams)
                }
                // Add or override other parameters as needed
                // Example: newParams['newParam'] = 'newValue';
                // Clear existing parameters and set the new ones
                //                Array.from(params.keys()).forEach(key => params.delete(key));
                // params.forEach((_, key) => params.delete(key));
                // // Object.entries(newParams).forEach(([key, value]) => {
                // //     params.set(key, value);
                // // });
                // for (let key in newParams) {
                //     if (newParams.hasOwnProperty(key)) {
                //         params.set(key, newParams[key]);
                //     }
                // }
                //                console.log("writing", newParams)
                // Construct the new URL with the modified query string
                let newUrl = anchorUrl.origin + anchorUrl.pathname;
                if (newParams.size > 0)
                    newUrl += '?' + newParams.toString();
                // Navigate to the new URL
                //                console.log('Navigating to:', newUrl);
                window.location.href = newUrl;
            }
        });
    }
    shouldIgnoreKey(key) {
        //        console.log("checking", key, this.config.ignorePatterns)
        for (const pattern of this.config.ignorePatterns) {
            if (typeof pattern === 'string') {
                if (pattern === key) {
                    //                    console.log("ignoring", key);
                    return true;
                }
            }
            else if (pattern instanceof RegExp) {
                if (pattern.test(key)) {
                    //                    console.log("ignoring", key);
                    return true;
                }
            }
        }
        //        console.log("not ignoring", key);
        return false;
    }
}
exports.Sa5QueryPassthrough = Sa5QueryPassthrough;
//# sourceMappingURL=queryPassthrough.js.map