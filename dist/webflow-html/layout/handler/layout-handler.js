"use strict";
/**
 *
 * https://codepen.io/memetican/pen/WNmpPQQ/58d28833924001977c4761d31979c2d1
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5LayoutHandler = void 0;
const globals_1 = require("../../../globals");
const debug_1 = require("../../../webflow-core/debug");
//import { Sa5Form, WebflowFormMode } from '../../webflow-form';
/*
 * WfuFormHandler class.
 */
var defaultLayoutHandlerConfig = {
    debug: false, // Debugging mode
};
class Sa5LayoutHandler {
    constructor(layoutContainer, config = {}) {
        this.zone = null;
        // Initialize debugging
        this.debug = new debug_1.Sa5Debug("sa5-layout-handler");
        this.debug.debug("Initializing");
        this.container = layoutContainer;
        this.name = this.container.getAttribute("wfu-layout");
        this.zone = this.container.getAttribute("wfu-layout-zone") || null;
    }
    layout() {
        /**
         * Init container
         */
        if (this.container.getAttribute('wfu-layout-init') === 'clear') {
            // Clear existing tabs and content
            // const tabMenu = this.container.querySelector('.w-tab-menu');
            // const tabContent = this.container.querySelector('.w-tab-content');
            // tabMenu.innerHTML = '';
            // tabContent.innerHTML = ''; 
            this.container.innerHTML = '';
        }
        /**
         * Layout elements
         */
        // Find all elements targeting this container
        let selector = `[${globals_1.Sa5Attribute.ATTR_LAYOUT_TARGET}='${this.name}']`; // '[wfu-layout-target]'
        if (this.zone)
            selector += `[${globals_1.Sa5Attribute.ATTR_LAYOUT_ZONE}='${this.zone}']`;
        const targetedElements = document.querySelectorAll(selector);
        targetedElements.forEach(element => {
            // // Get the value of the 'wfu-layout-mtargetove' attribute
            // const targetName = element.getAttribute(
            //     Sa5Attribute.ATTR_LAYOUT_TARGET
            //     );
            // let selector: string = `[${Sa5Attribute.ATTR_LAYOUT_TARGET}='${this.name}']`; // '[wfu-layout-target]'
            // if(this.zone)
            //     selector += `[${Sa5Attribute.ATTR_LAYOUT_ZONE}='${this.zone}']`;
            // Find the corresponding target element
            //   const targetElement = document.querySelector(`[wfu-layout="${targetName}"]`);
            //   // If a target is found, append the movable element as its child
            //   if (targetElement) {
            //     targetElement.appendChild(element);
            //   }
            if (this.container) {
                this.container.appendChild(element);
            }
        });
        /**
         * Remove preloader
         */
        this.container.removeAttribute('wfu-preload');
    }
}
exports.Sa5LayoutHandler = Sa5LayoutHandler;
//# sourceMappingURL=layout-handler.js.map