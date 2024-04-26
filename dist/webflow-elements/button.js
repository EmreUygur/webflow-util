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
exports.Sa5Button = void 0;
const globals_1 = require("../globals");
const utils_1 = require("../utils");
const webflow_core_1 = require("../webflow-core");
class Sa5Button {
    get enabled() {
        // TODO: test falsy, truthy, and null and "" and "null"
        return (0, utils_1.booleanValue)(this.element.getAttribute(globals_1.Sa5Attribute.ATTR_BUTTON_ENABLED));
    }
    set enabled(enabled) {
        this.element.setAttribute(globals_1.Sa5Attribute.ATTR_BUTTON_ENABLED, enabled ? "true" : "false");
        this.applyEnabledState();
    }
    applyEnabledState() {
        // Disabled styling
        if (this.element.hasAttribute(globals_1.Sa5Attribute.ATTR_BUTTON_DISABLED_CLASS)) {
            let disabledClass = this.element.getAttribute(globals_1.Sa5Attribute.ATTR_BUTTON_DISABLED_CLASS);
            if (this.enabled) {
                // Remove disabled class styling, if specified
                this.element.classList.remove(disabledClass);
            }
            else {
                // Add disabled class styling 
                this.element.classList.add(disabledClass);
            }
        }
    }
    // Initialize
    constructor(element) {
        this.element = element;
        this.name = element.getAttribute(globals_1.Sa5Attribute.ATTR_ELEMENT_BUTTON);
        // should be an A element 
    }
    init() {
        // console.log("init button");
        this.applyEnabledState();
        // Determine initial enabled / disabled state
        this.element.addEventListener("click", (event) => {
            // block button click 
            if (!this.enabled)
                event.preventDefault();
            //            console.log("button clicked."); 
        });
        this.element.removeAttribute(globals_1.Sa5Attribute.ATTR_PRELOAD);
    }
    static create(name) {
        const elem = document.querySelector(`[${globals_1.Sa5Attribute.ATTR_ELEMENT_BUTTON}='${name}']`);
        if (elem) {
            const button = new Sa5Button(elem);
            return button;
        }
        return null;
    }
}
exports.Sa5Button = Sa5Button;
// Export class to SA5 API
webflow_core_1.Sa5Core.startup(Sa5Button);
//# sourceMappingURL=button.js.map