"use strict";
/*
 * SA5
 * webflow-elements
 * Tabs
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Tabs Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebflowTabs = void 0;
/*
 * Webflow Tabs
 */
//#region Sample HTML
/*
<div wfu-tabs="main" data-current="Tab 1" data-easing="ease" data-duration-in="300" data-duration-out="100" class="w-tabs">
  <div class="w-tab-menu" role="tablist"><a data-w-tab="Tab 1" class="tab w-inline-block w-tab-link w--current" id="w-tabs-0-data-w-tab-0" href="#w-tabs-0-data-w-pane-0" role="tab" aria-controls="w-tabs-0-data-w-pane-0" aria-selected="true">
      <div>Tab 1</div>
    </a><a data-w-tab="Tab 2" class="tab w-inline-block w-tab-link" tabindex="-1" id="w-tabs-0-data-w-tab-1" href="#w-tabs-0-data-w-pane-1" role="tab" aria-controls="w-tabs-0-data-w-pane-1" aria-selected="false">
      <div>Tab 2</div>
    </a><a data-w-tab="Tab 3" class="tab w-inline-block w-tab-link" tabindex="-1" id="w-tabs-0-data-w-tab-2" href="#w-tabs-0-data-w-pane-2" role="tab" aria-controls="w-tabs-0-data-w-pane-2" aria-selected="false">
      <div>Tab 3</div>
    </a></div>
  <div class="w-tab-content">
    <div data-w-tab="Tab 1" class="w-tab-pane w--tab-active" id="w-tabs-0-data-w-pane-0" role="tabpanel" aria-labelledby="w-tabs-0-data-w-tab-0"></div>
    <div data-w-tab="Tab 2" class="w-tab-pane" id="w-tabs-0-data-w-pane-1" role="tabpanel" aria-labelledby="w-tabs-0-data-w-tab-1"></div>
    <div data-w-tab="Tab 3" class="w-tab-pane" id="w-tabs-0-data-w-pane-2" role="tabpanel" aria-labelledby="w-tabs-0-data-w-tab-2"></div>
  </div>
</div>
*/
//#endregion
/*
- can we add/remove tabs
- hide/show tabs
- reorder tabs

Events
  tab change

Select no tabs

Querystring
    Scroll and navigate to

.w--current
[data-w-tab] weems to be the identifier
*/
// [wfu-tabs=IDENTIFIER]
// Separately, we...
// 1. create this element for anything [wfu-tabs].w-tabs 
// 1. install click handlers for [wfu-tabs=x] other elements
//      anything? 
// Have the internal handlers perform actions
// wfu-tab-action=first|last|next|prev|clear ? 
const globals_1 = require("../globals");
const webflow_core_1 = require("../webflow-core");
const debug_1 = require("../webflow-core/debug");
class WebflowTabs {
    //#region CONSTRUCTORS
    constructor(element) {
        this.debug = new debug_1.Sa5Debug("sa5-webflow-tabs");
        this.debug.enabled = true;
        // Verify element type
        if (!element.classList.contains("w-tabs")) {
            console.error(`[${globals_1.Sa5Attribute.ATTR_ELEMENT_TABS}] is not on a tabs element`);
            return;
        }
        // Initialize
        this._element = element;
        this.init();
    }
    // changeTab
    // https://discourse.webflow.com/t/solution-setting-default-active-tab/66476/3 
    // Webflow.require("tabs") 
    //#endregion
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
    get name() {
        return this._element.getAttribute(globals_1.Sa5Attribute.ATTR_ELEMENT_TABS);
    }
    // 1-based convenience functions
    get currentNum() {
        return this.currentIndex + 1;
    }
    set currentNum(num) {
        this.currentIndex = num - 1;
    }
    get currentIndex() {
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
    set currentIndex(index) {
        // TODO: support null sets 
        // verify number in range
        if (index < 0)
            return;
        if (index >= this.count)
            return;
        let clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
        });
        this.debug.debug("setting tab", index);
        // Select the tab
        // HACK: dealing with the fact that Webflow events may not have run yet 
        setTimeout(() => {
            this.elementTab(index).dispatchEvent(clickEvent);
        }, 0);
    }
    get count() {
        return this._elementTabMenu.children.length;
    }
    goToTabNone() {
        // https://discourse.webflow.com/t/solution-setting-default-active-tab/66476 
        this.goToTabIndexForced(null);
    }
    // Direct element manipulation
    // IMPORTANT: this does not change the internal state of the tab element classes. 
    // only use when necessary, such as deselecting all tabs 
    goToTabIndexForced(index) {
        // Deselect current tab 
        Array.from(this._elementTabMenu.querySelectorAll(".w-tab-link")).forEach(elem => {
            elem.classList.remove("w--current");
            elem.removeAttribute("tabindex");
            elem.setAttribute("aria-selected", "true");
        });
        Array.from(this._elementTabContent.querySelectorAll(".w-tab-pane")).forEach(elem => {
            elem.classList.remove("w--tab-active");
        });
        // If specified, select specified tab index
        if (index) {
            console.log("setting forced index", index);
            // make the nth-child the active tab
            Array.from(this._elementTabMenu.querySelectorAll(`.w-tab-link:nth-child(${index + 1})`)).forEach(elem => {
                elem.classList.add("w--current");
            });
            Array.from(this._elementTabContent.querySelectorAll(`.w-tab-pane:nth-child(${index + 1})`)).forEach(elem => {
                elem.classList.add("w--tab-active");
                elem.style.cssText =
                    "style=opacity: 1; transition: opacity 300ms ease 0s;";
            });
        }
    }
    //#endregion
    //#region METHODS
    // Given an element, identifies which tab it represents
    getTabIndex(tab) {
        // Check tab menu
        let index = Array.from(this._elementTabMenu.children).indexOf(tab);
        // Check tab content
        if (index == -1) {
            index = Array.from(this._elementTabContent.children).indexOf(tab);
        }
        // No match found
        if (index == -1)
            return null;
        return index;
    }
    // Initialize the class to the element
    init() {
        // Inventory parts
        this._elementTabMenu = this._element.querySelector('.w-tab-menu');
        this._elementTabContent = this._element.querySelector('.w-tab-content');
        // Setup mutation observer to detect slide changes
        this._observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const target = mutation.target;
                    if (target.classList.contains('w--current')) {
                        this.onTabChanged(this.currentIndex);
                    }
                }
            }
        });
        // Configuration for the observer:
        const config = {
            attributes: true,
            childList: true,
            subtree: true // Observe changes in descendants
        };
        // Start observing the target element
        this._observer.observe(this._elementTabMenu, config);
        // Additional setup 
        // Initial setup
        for (let elem of this._elementTabMenu.children) {
            if (elem.hasAttribute('wfu-tab-default')) {
                this.debug.debug("default");
                let defaultTabIndex = this.getTabIndex(elem);
                this.debug.debug(defaultTabIndex);
                // If a default tab was specified, select it 
                if (defaultTabIndex != null)
                    this.currentIndex = defaultTabIndex;
            }
        }
        ;
    }
    // Get the tab element at the specified index
    elementTab(index) {
        // verify number in range
        if (index < 0)
            return;
        if (index >= this.count)
            return;
        return this._elementTabMenu.children[index];
    }
    // Goes to the identified tab 
    // raises navigation events
    goTo(index) {
        // Eventing tab change (pre)
        // from & to tabs
        this.debug.debug("goTo", index);
        this.currentIndex = index;
        // Eventing tab change (post)
        // from & to tabs
    }
    goToName(name) {
        this.debug.debug("goToName", name);
        // Get the index of the slide with the matching name
        let index = Array.from(this._elementTabMenu.children)
            .findIndex(child => child.getAttribute(globals_1.Sa5Attribute.ATTR_ELEMENT_TAB_NAME) == name);
        // If no match found, return
        if (index == -1) {
            console.error(`No tab found with name: ${name}`);
            return;
        }
        this.goTo(index);
    }
    goToNext() {
        // If no tab selected, select first
        if (this.currentIndex == null) {
            this.currentIndex = 0;
            return;
        }
        // Determine new tab
        var newTabIndex = this.currentIndex + 1;
        if (newTabIndex >= this.count)
            newTabIndex = 0;
        this.goTo(newTabIndex);
    }
    goToPrev() {
        // If no tab selected, select first
        if (this.currentIndex == null) {
            this.currentIndex = 0;
            return;
        }
        // Determine new tab
        var newTabIndex = this.currentIndex - 1;
        if (newTabIndex < 0)
            newTabIndex = this.count - 1;
        this.goTo(newTabIndex);
    }
    goToFirst() {
        this.goTo(0);
    }
    goToLast() {
        var newTabIndex = this.count - 1;
        this.goTo(newTabIndex);
    }
    //#endregion
    //#region EVENTS
    // Type guard to check callback function 
    isTabChangedCallback(func) {
        if (!func)
            return false;
        // Adjust this check as needed
        return func.length === 1;
    }
    onTabChanged(index) {
        // Raise event
        let core = webflow_core_1.Sa5Core.startup();
        // Get any global handlers
        core.getHandlers(globals_1.Sa5GlobalEvent.EVENT_TAB_CHANGED)
            .forEach(func => {
            //            console.log('onSlideChanged func', index)
            //            if (this.isSlideChangedCallback(func)) {
            //                console.log('onSlideChanged func OK', index)
            func(this, index);
            //            }
        });
    }
}
exports.WebflowTabs = WebflowTabs;
// window["WebflowTabs"] = WebflowTabs;
// console.log("TABS LOADED.");
// (window as any).WebflowDropdown = WebflowDropdown;
webflow_core_1.Sa5Core.startup(WebflowTabs);
//# sourceMappingURL=tabs.js.map