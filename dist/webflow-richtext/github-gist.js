"use strict";
/*
 * webflow-blog
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Blog Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubGist = void 0;
const globals_1 = require("../globals");
/*
 * GitHub Gist.
 */
class GitHubGist {
    // Initialize
    constructor() {
    }
    init() {
        this.initCopyGist();
    }
    initCopyGist() {
        document.querySelectorAll(globals_1.Sa5Attribute.getBracketed(globals_1.Sa5Attribute.ATTR_GIST_COPY) // '[wfu-gist-copy]'
        ).forEach((el) => {
            el.addEventListener('click', (e) => {
                //                console.log("clicked"); 
                let a = el.getAttribute(globals_1.Sa5Attribute.ATTR_GIST_COPY // 'wfu-gist-copy'
                );
                //                console.log(a); 
                let gist = document.querySelector(`[${globals_1.Sa5Attribute.ATTR_GIST}="${a}"]`);
                if (gist !== null) {
                    this.copyToClipboard(this.getGistCode(gist));
                }
            });
        });
    }
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            //            console.log('Copying to clipboard was successful!');
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    }
    getGistCode(el) {
        if (!el)
            return;
        // Extract the GIST content
        let code = el.querySelector(".gist-file")?.textContent || '';
        // Remove whitespace-only lines
        let cleanString = code.replace(/\n\s*\n/g, '\n');
        //        console.log(cleanString);
        // Trim the last four lines 
        let lines = cleanString.split('\n');
        lines = lines.slice(0, -4);
        let finalString = lines.join('\n');
        //        console.log(finalString);
        // Trim 10 pre-whitespaces
        let finalLines = finalString.split('\n').map((line) => {
            return line.startsWith('          ') ? line.slice(10) : line;
        });
        let trimmedString = finalLines.join('\n');
        //        console.log(trimmedString);
        return trimmedString;
    }
}
exports.GitHubGist = GitHubGist;
// window["GitHubGist"] = GitHubGist;
// // Register
// window["sa5"] = window["sa5"] || {};
// window["sa5"]["Sa5Blog"] = Sa5Blog;
//# sourceMappingURL=github-gist.js.map