"use strict";
/*
 * webflow-core
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Editor Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5Editor = void 0;
/*
 * Sa5Editor
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Detects the current editor mode.
 */
class Sa5Editor {
    get isEditorMode() {
        // TODO: check
        // Title
        // vs webflow.require("editor")
        // vs [data-wf-mode]  
        return document.documentElement
            .getAttribute("data-wf-mode") === "editor";
        //        return $("html").attr("data-wf-mode") == "editor";
    }
    detectEditorMode() {
        // HACK: Use the <title> to detect Editor mode status
        if (document.title.startsWith("Editor:")) {
            console.debug("Editor mode");
            document.documentElement.setAttribute("data-wf-mode", "editor");
        }
        else {
            console.debug("NOT Editor mode");
            document.documentElement.removeAttribute("data-wf-mode");
        }
        // // HACK: Use the <title> to detect Editor mode status
        // if ($("title").text().startsWith("Editor:")) {
        //     console.debug("Editor mode");
        //     $("html").attr("data-wf-mode", "editor");
        // } else {
        //     console.debug("NOT Editor mode");
        //     $("html").removeAttr("data-wf-mode");
        // }
    }
    constructor(config = null) {
        config = config || {};
        this.config = config;
        this.init();
        //        console.debug(`WFU Edit mode monitor installed`);
    }
    // Install Editor mode detector
    init() {
        // Assuming `this` is of a class type that has a `detectEditorMode` method
        let titleElement = document.getElementsByTagName("title")[0];
        // Create a new MutationObserver instance
        let observer = new MutationObserver((mutations) => {
            this.detectEditorMode();
        });
        // Start observing the target node for configured mutations
        observer.observe(titleElement, { childList: true });
        // var _this = this;
        // this.observeDOM($("title")[0], function (m) {
        //     _this.detectEditorMode();
        // });
    }
}
exports.Sa5Editor = Sa5Editor;
//# sourceMappingURL=webflow-editor.js.map