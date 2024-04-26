"use strict";
/*
 * webflow-elements
 * Slider, Lightbox, Tabs, and more.
 *
 * Sygnal Technology Group
 * https://www.sygnal.com
 *
 * NO-CODE version, keys off of [wfu] attributes.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../globals");
const lightbox_1 = require("../webflow-elements/lightbox");
const button_1 = require("../webflow-elements/button");
const caption_handler_1 = require("../webflow-lightbox/caption-handler");
const tabs_1 = require("../webflow-elements/tabs");
const slider_1 = require("../webflow-elements/slider");
const deck_controller_1 = require("../webflow-elements/deck-controller");
const dropdown_1 = require("../webflow-elements/dropdown");
const init = () => {
    // elements is a NodeList of all elements with the "wfu-tabs" attribute
    // [wfu-tab-default]
    /**
     * Tabs
     */
    // Tabs
    // Auto-register class on named items? 
    // [wfu-tabs=NAME]
    let tabElements = document.querySelectorAll(`[${globals_1.Sa5Attribute.ATTR_ELEMENT_TABS}]`);
    tabElements.forEach(element => {
        var tabObj = new tabs_1.WebflowTabs(element);
    });
    /**
     * Slider
     */
    // Slider
    // Auto-register class on named items? 
    // [wfu-slider=NAME]
    let sliderElements = document.querySelectorAll(`[${globals_1.Sa5Attribute.ATTR_ELEMENT_SLIDER}]`);
    sliderElements.forEach(element => {
        var sliderObj = new slider_1.WebflowSlider(element);
    });
    /**
     * Deck Controllers
     */
    let deckControllerElements = document.querySelectorAll(`[${globals_1.Sa5Attribute.ATTR_ELEMENT_DECK_ACTION}]`);
    deckControllerElements.forEach(element => {
        var deckControllerObj = new deck_controller_1.Sa5DeckController(element);
        deckControllerObj.init();
    });
    /**
     * Buttons
     */
    const buttons = document.querySelectorAll(`[${globals_1.Sa5Attribute.ATTR_ELEMENT_BUTTON}]`);
    buttons.forEach((element) => {
        // Do something with each element
        new button_1.Sa5Button(element).init();
    });
    /**
     * Dropdowns
     */
    const dropdowns = document.querySelectorAll(`[${globals_1.Sa5Attribute.ATTR_ELEMENT_DROPDOWN}]`);
    dropdowns.forEach((element) => {
        // Do something with each element
        new dropdown_1.Sa5Dropdown(element).init();
    });
    /**
     * Init lightbox captions
     */
    let useLightboxCaptionHandler = false;
    const elements = document.querySelectorAll(globals_1.Sa5Attribute.getBracketed(globals_1.Sa5Attribute.ATTR_LIGHTBOX_CAPTIONS) // '[wfu-lightbox-captions]'
    );
    useLightboxCaptionHandler = elements.length > 0;
    elements.forEach((element) => {
        // Do something with each element
        const wfuLightbox = new lightbox_1.Sa5Lightbox(element).init();
    });
    if (useLightboxCaptionHandler) {
        new caption_handler_1.Sa5LightboxCaptionHandler().init();
    }
    /**
     * Init lightbox CMS groups
     */
    let lightBoxCmsGroups = false;
    const groups = document.querySelectorAll(globals_1.Sa5Attribute.getBracketed(globals_1.Sa5Attribute.ATTR_LIGHTBOX_GROUP) // '[wfu-lightbox-group]'
    );
    lightBoxCmsGroups = groups.length > 0;
    groups.forEach((element) => {
        // Get the value of the wfu-lightbox-group attribute
        let groupValue = element.getAttribute(globals_1.Sa5Attribute.ATTR_LIGHTBOX_GROUP // "wfu-lightbox-group"
        );
        // Find all descendant script elements with the class .w-json
        let scripts = element.querySelectorAll("script.w-json");
        // For each script
        scripts.forEach((script) => {
            // Parse the JSON
            let json = JSON.parse(script.textContent);
            // Update the group value
            json.group = groupValue;
            // Convert the JSON back to a string and update the script's content
            script.textContent = JSON.stringify(json, null, 2);
        });
    });
    // Re-initialize lightbox
    // to pick up new group names
    if (lightBoxCmsGroups) {
        var Webflow = Webflow || [];
        Webflow.push(function () {
            Webflow.require("lightbox").ready();
        });
    }
};
document.addEventListener("DOMContentLoaded", init);
//# sourceMappingURL=webflow-elements.js.map