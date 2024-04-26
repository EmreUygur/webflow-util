"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5LayoutHandlerTabs = void 0;
const globals_1 = require("../../../globals");
const layout_handler_1 = require("./layout-handler");
// import { Sa5Form, WebflowFormMode } from '../../webflow-form';
class Sa5LayoutHandlerTabs extends layout_handler_1.Sa5LayoutHandler {
    constructor(elem, config) {
        super(elem, config);
        // Get the tabs structure eleemnts
        this.tabMenu = this.container.querySelector('.w-tab-menu');
        this.tabContent = this.container.querySelector('.w-tab-content');
        // Get the classes
        const firstTabMenuItem = this.tabMenu.children[0];
        this.tabMenuClasses = firstTabMenuItem ? firstTabMenuItem.className : '';
        const firstTabContentItem = this.tabContent.children[0];
        this.tabContentClasses = firstTabContentItem ? firstTabContentItem.className : '';
    }
    layout() {
        /**
         * Init container
         */
        if (this.container.getAttribute('wfu-layout-init') === 'clear') {
            // Clear existing tabs and content
            const tabMenu = this.container.querySelector('.w-tab-menu');
            const tabContent = this.container.querySelector('.w-tab-content');
            tabMenu.innerHTML = '';
            tabContent.innerHTML = '';
        }
        /**
         * Layout elements
         */
        // Find all elements targeting this container
        let selector = `[${globals_1.Sa5Attribute.ATTR_LAYOUT_TARGET}='${this.name}']`; // '[wfu-layout-target]'
        if (this.zone)
            selector += `[${globals_1.Sa5Attribute.ATTR_LAYOUT_ZONE}='${this.zone}']`;
        const targetedElements = document.querySelectorAll(selector);
        // const targetedElements = document.querySelectorAll(
        //     `[${Sa5Attribute.ATTR_LAYOUT_TARGET}='${this.name}']` // '[wfu-layout-target]'
        //     );
        targetedElements.forEach(element => {
            // Get the tab name
            const tabName = element.getAttribute('wfu-layout-item-name');
            // Create the new tab in the tab menu
            const newTab = document.createElement('a');
            newTab.className = `w-inline-block w-tab-link ${this.tabMenuClasses}`;
            newTab.dataset.wTab = tabName;
            newTab.innerHTML = `<div>${tabName}</div>`;
            this.container.querySelector('.w-tab-menu').appendChild(newTab);
            // Move the element to the tab content area
            const contentPane = document.createElement('div');
            contentPane.className = `w-tab-pane ${this.tabContentClasses}`;
            contentPane.dataset.wTab = tabName;
            contentPane.appendChild(element); // Move the whole element
            this.container.querySelector('.w-tab-content').appendChild(contentPane);
        });
        // Select and click the first tab
        const firstTab = this.container.querySelector('.w-tab-menu .w-tab-link');
        const firstTabContent = this.container.querySelector('.w-tab-content .w-tab-pane');
        if (firstTab && firstTabContent) {
            // const firstTabName = firstTab.dataset.wTab;
            // tabContainer.setAttribute('data-current', firstTabName);
            // firstTab.classList.add('w--current');
            // firstTabContent.classList.add('w--tab-active');
            // firstTab.click(); // Simulate a click on the first tab
        }
        /**
         * Remove preloader
         */
        this.container.removeAttribute('wfu-preload');
    }
}
exports.Sa5LayoutHandlerTabs = Sa5LayoutHandlerTabs;
//# sourceMappingURL=tabs-handler.js.map