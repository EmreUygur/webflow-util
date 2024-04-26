"use strict";
/*
 * Sa5DeckController
 * webflow-elements
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5DeckController = void 0;
const globals_1 = require("../globals");
const webflow_core_1 = require("../webflow-core");
const slider_1 = require("./slider");
const tabs_1 = require("./tabs");
var Action;
(function (Action) {
    Action["First"] = "first";
    Action["Prev"] = "prev";
    Action["Next"] = "next";
    Action["Last"] = "last";
    Action["GoTo"] = "goto";
})(Action || (Action = {}));
class Sa5DeckController {
    // Initialize
    constructor(element) {
        this.element = element;
        // Get the action value from the wfu-deck-action attribute
        const actionValue = this.element.getAttribute(globals_1.Sa5Attribute.ATTR_ELEMENT_DECK_ACTION);
        if (actionValue) {
            this.action = Sa5DeckController.getActionEnum(actionValue);
            //            console.log(`Action is valid: ${this.action}`);
            if (!this.action) {
                // The action is valid, proceed with your logic
                console.error(`Invalid wfu-deck-action value: ${actionValue}`);
            }
        }
        // Get the target deck element
        const targetName = element.getAttribute(globals_1.Sa5Attribute.ATTR_ELEMENT_DECK_TARGET);
        if (targetName) {
            this.deckName = targetName;
            // Query elements with wfu-tabs or wfu-slider attributes matching the targetName
            const tabsElements = document.querySelectorAll(`[wfu-tabs="${targetName}"]`);
            const sliderElements = document.querySelectorAll(`[wfu-slider="${targetName}"]`);
            // Check if more than one element is found for each attribute or if elements with different attributes have the same targetName
            if (tabsElements.length + sliderElements.length > 1) {
                console.error(`Multiple elements or conflicting elements found with the target name: ${targetName}`);
            }
            if (tabsElements.length + sliderElements.length == 0) {
                console.error(`No elements found with the target name: ${targetName}`);
            }
            // Verify it's a valid element [tabs or slider] 
            // anything that implments our deck interface 
            // Handle the found elements
            if (tabsElements.length === 1) {
                this.tabsElement = tabsElements[0];
                this.deck = new tabs_1.WebflowTabs(this.tabsElement);
            }
            else if (sliderElements.length === 1) {
                this.sliderElement = sliderElements[0];
                this.deck = new slider_1.WebflowSlider(this.sliderElement);
            }
        }
        else {
            // Get the nearest parent element with an attribute of wfu-tabs or wfu-slider
            const tabsParent = this.element.closest(`[${globals_1.Sa5Attribute.ATTR_ELEMENT_TABS}]`);
            const sliderParent = this.element.closest(`[${globals_1.Sa5Attribute.ATTR_ELEMENT_SLIDER}]`);
            if (tabsParent) {
                this.tabsElement = tabsParent;
                this.deck = new tabs_1.WebflowTabs(this.tabsElement);
            }
            else if (sliderParent) {
                this.sliderElement = sliderParent;
                this.deck = new slider_1.WebflowSlider(this.sliderElement);
            }
            else {
                console.error(`No valid target element found for the wfu-deck-action element`);
            }
        }
        // Get the item value from the wfu-deck-action-item attribute
        this.item = this.element.getAttribute(globals_1.Sa5Attribute.ATTR_ELEMENT_DECK_ITEM);
    }
    init() {
        // Add event listener to the element
        this.element.addEventListener("click", (event) => {
            // block button click 
            event.preventDefault();
            switch (this.action) {
                case Action.First:
                    this.deck.goToFirst();
                    break;
                case Action.Prev:
                    this.deck.goToPrev();
                    break;
                case Action.Next:
                    this.deck.goToNext();
                    break;
                case Action.Last:
                    this.deck.goToLast();
                    break;
                case Action.GoTo:
                    if (typeof this.item === 'string' && !isNaN(Number(this.item))) {
                        // Convert this.item to a number and call this.deck.goTo
                        this.deck.goTo(Number(this.item) - 1); // Adjust for 0-based index
                    }
                    else if (typeof this.item === 'number') {
                        // this.item is already a number, no conversion needed
                        this.deck.goTo(this.item - 1); // Adjust for 0-based index 
                    }
                    else {
                        // Name translation
                        this.deck.goToName(this.item);
                    }
                    break;
                default:
                    console.error(`Invalid wfu-deck-action value: ${this.action}`);
                    break;
            }
        });
        //        this.element.removeAttribute(Sa5Attribute.ATTR_PRELOAD);
    }
    // Function to check if the action is valid and return the action as an enum
    static getActionEnum(actionValue) {
        const lowerCaseValue = actionValue.toLowerCase();
        //        console.log(`lowerCaseValue: ${lowerCaseValue}`);
        if (Object.keys(Action).some(key => Action[key] === lowerCaseValue)) {
            return lowerCaseValue;
        }
        else {
            console.error(`Invalid wfu-deck-action value: ${actionValue}`);
            return null;
        }
    }
    ;
}
exports.Sa5DeckController = Sa5DeckController;
// Export class to SA5 API 
webflow_core_1.Sa5Core.startup(Sa5DeckController);
//# sourceMappingURL=deck-controller.js.map