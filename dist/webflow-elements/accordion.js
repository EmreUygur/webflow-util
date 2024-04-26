"use strict";
/*
 * webflow-core
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Accordion Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebflowAccordion = void 0;
const globals_1 = require("../globals");
class WebflowAccordion {
    //#region PROPERTYS
    get element() {
        return this._element;
    }
    get elementTabMenu() {
        return this._elementTabMenu;
    }
    get elementTabContent() {
        return this._elementTabContent;
    }
    get tabIndex() {
        //        let parentElement: HTMLElement; // Assume this is your parent element with class .w-tab-menu
        let currentIndex = null;
        // Find current tab
        for (let i = 0; i < this._elementTabMenu.children.length; i++) {
            if (this._elementTabMenu.children[i].classList.contains('w--current')) {
                currentIndex = i;
                break;
            }
        }
        // if (currentIndex !== null) {
        //   console.log(`The child with class 'w--current' is at index ${currentIndex}`);
        // } else {
        //   console.log("No child with class 'w--current' was found");
        // }
        return currentIndex;
    }
    set tabIndex(index) {
        // verify number in range
        if (index < 0)
            return;
        if (index >= this.tabCount)
            return;
        let clickEvent = new MouseEvent('click', {
            // Event properties
            bubbles: true,
            cancelable: true,
            view: window,
            // More properties can be added as needed
        });
        this.elementTab(index).dispatchEvent(clickEvent);
        //        this.elementTabMenu.children[index].click
    }
    get tabCount() {
        return this._elementTabMenu.children.length;
    }
    //#endregion
    //#region CONSTRUCTORS
    constructor(element) {
        // Initialize
        this.init(element);
    }
    init(element) {
        // Find accordions
        const accordionBtns = document.querySelectorAll(`[${globals_1.Sa5Attribute.ATTR_UI_ACCORDION}=header]` // "[wfu-ui-accordion=header]"
        );
        accordionBtns.forEach((accordion) => {
            accordion.onclick = function () {
                accordion.classList.toggle("is-open");
                let content = accordion.nextElementSibling;
                console.log(content);
                if (content.style.maxHeight) {
                    //this is if the accordion is open
                    content.style.maxHeight = "auto";
                }
                else {
                    //if the accordion is currently closed
                    content.style.maxHeight = content.scrollHeight + "px";
                    console.log(content.style.maxHeight);
                }
            };
        });
    }
    //#endregion
    //#region METHODS
    // Initialize the class to the element
    init2(element) {
        // Verify it's a tabs element .w-tabs
        if (!element.classList.contains("w-tabs")) {
            console.error("[wfu-tabs] is not on a tabs element");
            return;
        }
        console.log("init.");
        // Inventory parts
        this._element = element;
        this._elementTabMenu = element.querySelector('.w-tab-menu');
        this._elementTabContent = element.querySelector('.w-tab-content');
        //.w-tab-menu
        console.log("count", this.tabCount);
        console.log("index", this.tabIndex);
        //.w-tab-content
    }
    // Get the tab element at the specified index
    elementTab(index) {
        // verify number in range
        if (index < 0)
            return;
        if (index >= this.tabCount)
            return;
        return this._elementTabMenu.children[index];
    }
    // Goes to the identified tab 
    // raises navigation events
    goToTabIndex(index) {
        // Eventing tab change (pre)
        // from & to tabs
        console.log(index);
        this.tabIndex = index;
        // Eventing tab change (post)
        // from & to tabs
    }
    goToNextTab() {
        // If no tab selected, select first
        if (this.tabIndex == null) {
            this.tabIndex = 0;
            return;
        }
        // Determine new tab
        var newTabIndex = this.tabIndex + 1;
        if (newTabIndex >= this.tabCount)
            newTabIndex = 0;
        this.goToTabIndex(newTabIndex);
    }
    goToPrevTab() {
        // If no tab selected, select first
        if (this.tabIndex == null) {
            this.tabIndex = 0;
            return;
        }
        // Determine new tab
        var newTabIndex = this.tabIndex - 1;
        if (newTabIndex < 0)
            newTabIndex = this.tabCount - 1;
        this.goToTabIndex(newTabIndex);
    }
    goToFirstTab() {
        this.goToTabIndex(0);
    }
    goToLastTab() {
        var newTabIndex = this.tabCount - 1;
        this.goToTabIndex(newTabIndex);
    }
    //#endregion
    //#region EVENTS
    onTabChanged() {
        // Raise event
    }
}
exports.WebflowAccordion = WebflowAccordion;
// window["WebflowAccordion"] = WebflowAccordion;
//# sourceMappingURL=accordion.js.map