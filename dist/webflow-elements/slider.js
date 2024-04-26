"use strict";
/*
 * SA5
 * webflow-core
 * Slider
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Slider Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebflowSlider = void 0;
/*
 * Webflow Slider
 */
//#region Sample HTML
/*
<div data-delay="4000" data-animation="slide" class="w-slider" data-autoplay="false" wfu-slider="" data-easing="ease" data-hide-arrows="false" data-disable-swipe="false" data-autoplay-limit="0" data-nav-spacing="3" data-duration="500" data-infinite="true" role="region" aria-label="carousel">
  <div class="w-slider-mask" id="w-slider-mask-0">
    <div class="w-slide" aria-label="1 of 3" role="group" style="transform: translateX(0px); opacity: 1;">
        ...
    </div>
    <div class="w-slide" aria-label="2 of 3" role="group" aria-hidden="true" style="transform: translateX(0px); opacity: 1;">
        ...
    </div>
    <div class="w-slide" aria-label="3 of 3" role="group" aria-hidden="true" style="transform: translateX(0px); opacity: 1;">
        ...
    </div>
    <div aria-live="off" aria-atomic="true" class="w-slider-aria-label" data-wf-ignore=""></div>
  </div>
  <div class="w-slider-arrow-left" role="button" tabindex="0" aria-controls="w-slider-mask-0" aria-label="previous slide">
    <div class="w-icon-slider-left"></div>
  </div>
  <div class="w-slider-arrow-right" role="button" tabindex="0" aria-controls="w-slider-mask-0" aria-label="next slide">
    <div class="w-icon-slider-right"></div>
  </div>
  <div class="w-slider-nav w-round w-num">
    <div class="w-slider-dot w-active" data-wf-ignore="" aria-label="Show slide 1 of 3" aria-pressed="true" role="button" tabindex="0" style="margin-left: 3px; margin-right: 3px;">1</div>
    <div class="w-slider-dot" data-wf-ignore="" aria-label="Show slide 2 of 3" aria-pressed="false" role="button" tabindex="-1" style="margin-left: 3px; margin-right: 3px;">2</div>
    <div class="w-slider-dot" data-wf-ignore="" aria-label="Show slide 3 of 3" aria-pressed="false" role="button" tabindex="-1" style="margin-left: 3px; margin-right: 3px;">3</div>
  </div>
</div>
*/
//#endregion
/*
- can we add/remove slides
- hide/show slides
- reorder slides

Events
  slide change

Querystring
    Scroll and navigate to

.w--current
[data-w-tab] weems to be the identifier
*/
// [wfu-slider=IDENTIFIER]
// [w-slider]
// Separately, we...
// 1. create this element for anything [wfu-tabs].w-tabs 
// 1. install click handlers for [wfu-tabs=x] other elements
//      anything? 
// Have the internal handlers perform actions
// wfu-tab-action=first|last|next|prev|clear ? 
const globals_1 = require("../globals");
const webflow_core_1 = require("../webflow-core");
const debug_1 = require("../webflow-core/debug");
// interface SliderConfig {
// //    loadUserInfoCallback?: ((user: Sa5User) => void) | undefined; // Function callback 
//     slideChangedCallback?: SlideChangedCallback; 
// //    userLogoutPurge?: ((user: Sa5User) => void) | undefined;
//     debug?: boolean;
// }
class WebflowSlider {
    //    config: SliderConfig; // Optional config
    //#region CONSTRUCTORS
    constructor(element) {
        this.debug = new debug_1.Sa5Debug("sa5-webflow-slider");
        this.debug.enabled = true;
        // Verify element then
        if (!element.classList.contains("w-slider")) {
            console.error(`[${globals_1.Sa5Attribute.ATTR_ELEMENT_SLIDER}] is not on a slider element`);
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
    get elementSliderMask() {
        return this._elementSliderMask;
    }
    get elementSliderNav() {
        return this._elementSliderNav;
    }
    get name() {
        return this._element.getAttribute(globals_1.Sa5Attribute.ATTR_ELEMENT_SLIDER);
    }
    // 1-based convenience functions
    get currentNum() {
        return this.currentIndex + 1;
    }
    set currentNum(num) {
        this.currentIndex = num - 1;
    }
    get currentIndex() {
        let currentIndex = null;
        currentIndex = Array.from(this._elementSliderNav.children)
            .findIndex(child => child.classList.contains('w-active'));
        return currentIndex;
    }
    set currentIndex(index) {
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
        this.debug.debug("setting slide", index);
        let button = this.elementSliderNav.children[index];
        // Select the slide 
        // HACK: dealing with the fact that Webflow events may not have run yet 
        setTimeout(() => {
            //            console.log(index, button);
            button.dispatchEvent(clickEvent);
        }, 0);
    }
    get count() {
        return this._elementSliderNav.children.length;
    }
    //#endregion
    //#region METHODS
    // Given an element, identifies which slide it represents
    getSlideIndex(slide) {
        // Check tab menu
        let index = Array.from(this._elementSliderMask.children).indexOf(slide);
        // Check tab content
        if (index == -1) {
            index = Array.from(this._elementSliderNav.children).indexOf(slide);
        }
        // No match found
        if (index == -1)
            return null;
        return index;
    }
    // Initialize the class to the element
    init() {
        // Inventory parts
        this._elementSliderMask = this._element.querySelector('.w-slider-mask');
        this._elementSliderNav = this._element.querySelector('.w-slider-nav');
        // Setup mutation observer to detect slide changes
        this._observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const target = mutation.target;
                    if (target.classList.contains('w-active')) {
                        this.onSlideChanged(this.currentIndex);
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
        this._observer.observe(this._elementSliderNav, config);
    }
    // Get the tab element at the specified index
    // TEST: with different element arrangements 
    elementSlide(index) {
        // verify number in range
        if (index < 0)
            return;
        if (index >= this.count)
            return;
        // Get .w-slide children
        let filteredChildren = Array.from(this._elementSliderMask.children)
            .filter(child => child.classList.contains('w-slide'));
        let targetChild = filteredChildren[index];
        // constrain to w-slide items 
        return targetChild;
    }
    // Goes to the identified slide 
    // raises navigation events
    goTo(index) {
        // Eventing tab change (pre)
        // from & to tabs
        this.debug.debug(index);
        this.currentIndex = index;
        // Eventing tab change (post)
        // from & to slide
    }
    goToName(name) {
        // Get the index of the slide with the matching name
        let index = Array.from(this._elementSliderMask.children)
            .findIndex(child => child.getAttribute(globals_1.Sa5Attribute.ATTR_ELEMENT_SLIDE_NAME) == name);
        // If no match found, return
        if (index == -1) {
            console.error(`No slide found with name: ${name}`);
            return;
        }
        this.goTo(index);
    }
    goToNext() {
        // If no slide selected, select first
        if (this.currentIndex == null) {
            this.currentIndex = 0;
            return;
        }
        // Determine new slide
        var newSlideIndex = this.currentIndex + 1;
        if (newSlideIndex >= this.count)
            newSlideIndex = 0;
        this.goTo(newSlideIndex);
    }
    goToPrev() {
        // If no slide selected, select first
        if (this.currentIndex == null) {
            this.currentIndex = 0;
            return;
        }
        // Determine new slide
        var newSlideIndex = this.currentIndex - 1;
        if (newSlideIndex < 0)
            newSlideIndex = this.count - 1;
        this.goTo(newSlideIndex);
    }
    goToFirst() {
        this.goTo(0);
    }
    goToLast() {
        var newSlideIndex = this.count - 1;
        this.goTo(newSlideIndex);
    }
    //#endregion
    //#region EVENTS
    // Type guard to check callback function 
    isSlideChangedCallback(func) {
        if (!func)
            return false;
        // Adjust this check as needed
        return func.length === 1;
    }
    // Raise event
    onSlideChanged(index) {
        let core = webflow_core_1.Sa5Core.startup();
        // Get any global handlers
        core.getHandlers(globals_1.Sa5GlobalEvent.EVENT_SLIDE_CHANGED)
            .forEach(func => {
            //            console.log('onSlideChanged func', index)
            //            if (this.isSlideChangedCallback(func)) {
            //                console.log('onSlideChanged func OK', index)
            func(this, index);
            //            }
        });
    }
}
exports.WebflowSlider = WebflowSlider;
webflow_core_1.Sa5Core.startup(WebflowSlider);
//# sourceMappingURL=slider.js.map