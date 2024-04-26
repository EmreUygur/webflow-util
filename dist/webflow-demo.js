"use strict";
/*
 * webflow-demo
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Webflow Informational Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebflowInfo = void 0;
const webflow_core_1 = require("./webflow-core");
class WebflowInfo {
    // Initialize
    constructor() {
        this.siteId = document.documentElement.getAttribute("data-wf-site");
        this.pageId = document.documentElement.getAttribute("data-wf-page");
    }
    // Returns a Webflow preview link
    // to the current page
    getWebflowPreviewLink(url) {
        const parsedUrl = new URL(url);
        // Add/replace pageId in Url
        parsedUrl.searchParams.set("pageId", this.pageId ?? "");
        return parsedUrl.href;
    }
    updateHrefToWebflowPreviewLink(linkElem) {
        var parsedUrl = linkElem.href;
        // Modify href to include pageId
        var modifiedUrl = this.getWebflowPreviewLink(parsedUrl ?? "");
        // Set updated href
        linkElem.href = modifiedUrl;
    }
}
exports.WebflowInfo = WebflowInfo;
// Register
webflow_core_1.Sa5Core.startup(WebflowInfo);
//# sourceMappingURL=webflow-demo.js.map