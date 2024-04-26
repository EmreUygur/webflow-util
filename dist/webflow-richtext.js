"use strict";
/*
 * webflow-richtext
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Blog Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5RichText = void 0;
const webflow_core_1 = require("./webflow-core");
const debug_1 = require("./webflow-core/debug");
const github_gist_1 = require("./webflow-richtext/github-gist");
/*
 * GitHub Gist.
 */
class Sa5RichText {
    // Initialize
    constructor() {
        // Enable debugging, if specified
        this.debug = new debug_1.Sa5Debug("sa5-richtext");
        //        this.debug.enabled = this.config.debug;
    }
    init() {
        this.debug.debug("Initializing SA5 RichText");
        var gitHubGist = new github_gist_1.GitHubGist();
        gitHubGist.initCopyGist();
    }
}
exports.Sa5RichText = Sa5RichText;
//window["GitHubGist"] = GitHubGist;
// Register
webflow_core_1.Sa5Core.startup(Sa5RichText);
// window["sa5"] = window["sa5"] || []; // {};
// window["sa5"]["Sa5Blog"] = Sa5Blog;
//# sourceMappingURL=webflow-richtext.js.map