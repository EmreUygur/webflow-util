"use strict";
/*
 * webflow-editor
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Webflow Editor-mode Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebflowEditor = void 0;
const webflow_core_1 = require("./webflow-core");
class WebflowEditor {
    get editorMode() {
        return this._editorMode;
    }
    constructor() {
        this._editorMode = null;
        this.init();
    }
    // Initialize
    init() {
        // Install a handler for after Webflow.js is ready
        // to detect Editor mode properly
        var Webflow = Webflow || [];
        Webflow.push(() => {
            if (Webflow.env("editor")) {
                this._editorMode = true;
                console.log("EDITOR mode");
            }
            else {
                this._editorMode = false;
                console.log("not in EDITOR mode");
            }
        });
    }
}
exports.WebflowEditor = WebflowEditor;
// Register
webflow_core_1.Sa5Core.startup(WebflowEditor);
//# sourceMappingURL=webflow-editor.js.map