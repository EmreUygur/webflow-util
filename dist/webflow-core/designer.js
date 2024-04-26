"use strict";
/*
 * webflow-core
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Designer Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5Designer = void 0;
const globals_1 = require("../globals");
class Sa5Designer {
    constructor() {
    }
    init() {
        this.removeDesignTimeElements();
    }
    // Remove any element tagged for design-time-only
    // used typically for in-designer <style> elements
    // in HTML Embeds. 
    removeDesignTimeElements() {
        // console.log("designer clean"); 
        const elements = document.querySelectorAll(globals_1.Sa5Attribute.getBracketed(globals_1.Sa5Attribute.ATTR_DESIGN));
        elements.forEach(element => {
            element.remove();
        });
    }
}
exports.Sa5Designer = Sa5Designer;
//# sourceMappingURL=designer.js.map