"use strict";
/*
 * webflow-hotkeys
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Hotkeys Utilities
 *
 * Based on and extends-
 * https://github.com/jaywcjlove/hotkeys-js
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5Hotkeys = void 0;
const webflow_core_1 = require("./webflow-core");
const hotkeys_js_1 = __importDefault(require("hotkeys-js"));
class Sa5Hotkeys {
    init() {
        // ⌘+s, ctrl+s
        // https://github.com/jaywcjlove/hotkeys-js
        // <script src="https://unpkg.com/hotkeys-js/dist/hotkeys.min.js"></script>
        //        this.initDebugMode();
        // Not needed, integrated via TS
        // var scripts: Sa5Scripts = new Sa5Scripts();
        // scripts.install(
        //     "https://unpkg.com/hotkeys-js/dist/hotkeys.min.js"
        // );
        // verify
        // window['sa5'] = window['sa5'] || [];
        // const sa5: Sa5Core = window['sa5'] as Sa5Core;
        let core = webflow_core_1.Sa5Core.startup();
        //console.log("sa5 handlers", sa5.handlers);
        // Get hotkeys handlers
        //BUG:
        //        core.getHandlers()
        let hotkeysItems = core.handlers.filter(([str, fn]) => str === "hotkeys");
        //console.log("hotk handlers", hotkeysItems);
        // Iterate and install
        hotkeysItems.forEach(([str, fn]) => {
            if (typeof fn === "function") {
                fn(this); // Call the handler function
            }
        });
        // const hotkeysHandler = sa5['hotkeys'];
        // if(hotkeysHandler)
        //     hotkeysHandler(this);
    }
    // Numeric keypad?
    // https://codepen.io/memetican/pen/rNQKPeL/5cc22485a64699ff328ba78e1892e9d0?editors=0010
    registerModifier(modifier, callbackTrigger, callbackRelease) {
        let timer;
        let isCtrlDown = false;
        // Future shift, alt, and combos ctrl+shift, etc.
        // Config check
        if (modifier != "ctrl") {
            console.error("sa5-hotkeys", "Can only registerModifier the 'ctrl' key");
            return;
        }
        document.addEventListener("keydown", function (event) {
            if (event.key === "Control" && !isCtrlDown) {
                isCtrlDown = true;
                //                console.log("foo");
                // Clear any existing timer
                if (timer) {
                    clearTimeout(timer);
                }
                // Start a new timer
                timer = setTimeout(function () {
                    console.log("Ctrl key held for 500ms");
                    // Get the root element (usually <html>)
                    if (callbackTrigger)
                        callbackTrigger(modifier, "keydown", event);
                    // Set the CSS variable --theme-color to 'blue'
                    //            document.documentElement.style.setProperty('--display-value', 'block');
                }, 500);
            }
        });
        document.addEventListener("keyup", function (event) {
            if (event.key === "Control") {
                // Clear the timer when the key is released
                clearTimeout(timer);
                isCtrlDown = false;
                if (callbackRelease)
                    callbackRelease(modifier, "keyup", event);
                //                document.documentElement.style.setProperty('--display-value', 'none');
            }
        });
    }
    // Register a hotkey combination + callback
    register(combination, callback) {
        // ,  function(event, handler){
        // TODO: prevent certain keys
        // TODO: reserve some for SA5?
        // e.g. ctrl+shift+f1 to list them and purpose note
        // duplicate option & control on win/mac
        // logging
        // google analytics
        // ToC
        // Secret
        //        console.debug(`registered ${key}.`);
        // Register key with hotkeys
        (0, hotkeys_js_1.default)(combination, function (event, handler) {
            // Prevent the default event
            event.preventDefault();
            // Call the callback function
            if (callback)
                callback(handler);
            //            alert(`-- you pressed ${handler.key}!`);
        });
    }
}
exports.Sa5Hotkeys = Sa5Hotkeys;
webflow_core_1.Sa5Core.startup(Sa5Hotkeys);
// Register
//window["sa5"] = window["sa5"] || []; // {};
//window["sa5"]["Sa5Hotkeys"] = Sa5Hotkeys;
//# sourceMappingURL=webflow-hotkeys.js.map