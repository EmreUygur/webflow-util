"use strict";
/*
 * webflow-core
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Scripts Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5Scripts = void 0;
var PageInstallPosition;
(function (PageInstallPosition) {
    PageInstallPosition["headStart"] = "headStart";
    PageInstallPosition["headEnd"] = "headEnd";
    PageInstallPosition["head"] = "head";
    PageInstallPosition["bodyStart"] = "bodyStart";
    PageInstallPosition["bodyEnd"] = "bodyEnd";
    PageInstallPosition["body"] = "body";
})(PageInstallPosition || (PageInstallPosition = {}));
class Sa5Scripts {
    // Initialize
    constructor() {
    }
    // Start a console log group
    install(src, type = null, async = false, defer = false, installPos = PageInstallPosition.head) {
        // Check for existing
        // Prevent double-loads
        var script = document.createElement("script");
        script.src = src;
        script.type = type; // text/javascript // module
        script.async = async;
        script.defer = defer;
        console.log("installing script", script);
        switch (installPos) {
            case PageInstallPosition.headStart:
                document.head.insertBefore(script, document.head.firstChild);
                break;
            case PageInstallPosition.head:
            case PageInstallPosition.headEnd:
                document.head.appendChild(script);
                break;
            case PageInstallPosition.bodyStart:
                document.body.insertBefore(script, document.body.firstChild);
                break;
            case PageInstallPosition.body:
            case PageInstallPosition.bodyEnd:
                document.body.appendChild(script);
                break;
        }
    }
}
exports.Sa5Scripts = Sa5Scripts;
//# sourceMappingURL=scripts.js.map