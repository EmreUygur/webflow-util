"use strict";
/*
 * webflow-html
 *
 * Sygnal Technology Group
 * https://www.sygnal.com
 *
 * NO-CODE version, keys off of [wfu] attributes.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const webflow_html_1 = require("../webflow-html");
const webflow_core_1 = require("../webflow-core");
const debug_1 = require("../webflow-core/debug");
const webflow_editor_1 = require("../webflow-core/webflow-editor");
const utils_1 = require("../utils");
const collection_list_1 = require("../webflow-html/collection-list");
// import { HtmlBuilder } from '../modules/webflow-html-builder';
const globals_1 = require("../globals");
const layout_1 = require("../webflow-html/layout");
const init = () => {
    //    new Sa5Core().init();
    let core = webflow_core_1.Sa5Core.startup();
    // Initialize debugging
    let debug = new debug_1.Sa5Debug("sa5-html");
    debug.debug("Initializing");
    // Dynamic Attributes
    //    applyDynamicAttributes();
    // Create Sa5Html
    let obj = new webflow_html_1.Sa5Html({
        dynamicAttributes: true
    }).init();
    //    const wfuEditor = new WfuEditor();
    // Init Editor mode detection
    const editor = new webflow_editor_1.Sa5Editor();
    /**
     * Layout items
     */
    (new layout_1.Sa5Layouts).init();
    // let layoutElements = Array.from(
    //     document.querySelectorAll(
    //         Sa5Attribute.getBracketed(Sa5Attribute.ATTR_LAYOUT) // '[wfu-layout]'
    //     ));
    // layoutElements.forEach(element => {
    //     sequence(element as HTMLElement);
    // });    
    /**
     * Sequence items
     */
    // Sequence items 
    let sequenceGroupElements = Array.from(document.querySelectorAll("[wfu-seq-group]"));
    sequenceGroupElements.forEach(element => {
        (0, utils_1.sequence)(element);
    });
    /**
     * Unwrap tagged items
     */
    /*
//    $("*[wfu-unwrap]").each(function (index) {

        //        console.log($(this).attr("wfu-filter"));

//        var visible = eval($(this).attr("wfu-filter"));

  //      if (visible)
  //          $(this).css("display", "block");
//    });
    */
    /**
     * Decode html chunk
     */
    document.querySelectorAll(globals_1.Sa5Attribute.getBracketed(globals_1.Sa5Attribute.ATTR_DECODE) // '[wfu-decode]'
    )
        .forEach((element) => {
        element.innerHTML = (0, utils_1.decodeHTML)(element.innerHTML);
        element.removeAttribute(globals_1.Sa5Attribute.ATTR_DECODE // 'wfu-decode'
        );
    });
    /**
     * Sort items
     * Innermost first, to support nested sorts.
     * Maximum 3 levels of depth
     */
    document.querySelectorAll(`[${globals_1.Sa5Attribute.ATTR_SORT}] [${globals_1.Sa5Attribute.ATTR_SORT}] [${globals_1.Sa5Attribute.ATTR_SORT}]`)
        .forEach((element) => {
        new collection_list_1.Sa5CollectionList(element)
            .sort();
    });
    document.querySelectorAll(`[${globals_1.Sa5Attribute.ATTR_SORT}] [${globals_1.Sa5Attribute.ATTR_SORT}]`)
        .forEach((element) => {
        new collection_list_1.Sa5CollectionList(element)
            .sort();
    });
    document.querySelectorAll(`[${globals_1.Sa5Attribute.ATTR_SORT}]`)
        .forEach((element) => {
        new collection_list_1.Sa5CollectionList(element)
            .sort();
    });
    /**
     * Filter items
     * Place on item you want to conditionally hide
     * TODO: add remove mode for non-matches?
     */
    document.querySelectorAll(`[${globals_1.Sa5Attribute.ATTR_FILTER}],[${globals_1.Sa5Attribute.ATTR_FILTER_EVAL}]`)
        .forEach((element) => {
        let filterEval = null;
        if (element.hasAttribute(globals_1.Sa5Attribute.ATTR_FILTER_EVAL))
            filterEval = element.getAttribute(globals_1.Sa5Attribute.ATTR_FILTER_EVAL);
        else {
            filterEval = element.getAttribute(globals_1.Sa5Attribute.ATTR_FILTER);
            console.warn(`[${globals_1.Sa5Attribute.ATTR_FILTER}] is deprecated, use [${globals_1.Sa5Attribute.ATTR_FILTER_EVAL}] instead.`);
        }
        //        console.log(filterEval);
        let visible = eval(filterEval);
        if (visible) {
            element.removeAttribute(globals_1.Sa5Attribute.ATTR_FILTER);
            element.removeAttribute(globals_1.Sa5Attribute.ATTR_FILTER_EVAL);
        }
    });
    document.querySelectorAll(`[${globals_1.Sa5Attribute.ATTR_FILTER_MATCH}]`)
        .forEach((element) => {
        let filterEval = element.getAttribute(globals_1.Sa5Attribute.ATTR_FILTER_MATCH);
        //        console.log("filter eval", filterEval);
        // [weekday='${new Date().getDay()}']
        let filterMatches = eval(`\`${filterEval}\``);
        //        console.log("filter matches", filterMatches);
        let visible = element.matches(filterMatches);
        if (visible) {
            element.removeAttribute(globals_1.Sa5Attribute.ATTR_FILTER_MATCH);
        }
    });
    // Process filtered items
    document.querySelectorAll(`[${globals_1.Sa5Attribute.ATTR_FILTER_FUNC}]`)
        .forEach((element) => {
        let funcName = element.getAttribute(globals_1.Sa5Attribute.ATTR_FILTER_FUNC);
        let fqFuncName = `window.${funcName}`;
        let f = new Function(fqFuncName);
        // Retrieve function from window object using the function name
        let func = window[funcName];
        if (typeof func === 'function') {
            let visible = func(element);
            if (visible) {
                element.removeAttribute(globals_1.Sa5Attribute.ATTR_FILTER_FUNC);
            }
        }
    });
    /**
     * Suppress sections with no list items.
     */
    document.querySelectorAll(`[${globals_1.Sa5Attribute.ATTR_SUPPRESS}=empty-lists]`)
        .forEach((element) => {
        // Check if the element containssany descendants with a class of .w-dyn-items
        if (element.querySelector('.w-dyn-items')) {
            // Un-suppress the element
            element.removeAttribute(globals_1.Sa5Attribute.ATTR_SUPPRESS);
        }
    });
    /**
     * Limit to a multiple of X items
     */
    // Process limit multiple items
    // e.g. limit a list to a multiple of N items
    document.querySelectorAll(globals_1.Sa5Attribute.getBracketed(globals_1.Sa5Attribute.ATTR_LIMIT_MULTIPLE) // '[wfu-limit-multiple]'
    )
        .forEach((element) => {
        // .w-dyn-list
        // .w-dyn-items
        // .w-dyn-item
        // If collection list wrapper, adjust to list
        var listElement = element;
        if (element.classList.contains("w-dyn-list"))
            listElement = element.children[0];
        // Determine multiple limit
        const itemCount = listElement.children.length;
        const itemMultipleCount = Number(element.getAttribute(globals_1.Sa5Attribute.ATTR_LIMIT_MULTIPLE // 'wfu-limit-multiple'
        ));
        const itemMinimumCount = Number(element.getAttribute(globals_1.Sa5Attribute.ATTR_LIMIT_MULTIPLE_MIN // 'wfu-limit-multiple-min'
        )); // Minimum
        let lastItem = Math.floor(itemCount / itemMultipleCount) * itemMultipleCount;
        if (lastItem < itemMinimumCount)
            lastItem = itemMinimumCount; // Apply minimum
        // Hide extra items over multiple limit
        for (let hideItem = 1; hideItem < itemMultipleCount; hideItem++) {
            let child = listElement.querySelector(`:nth-child(${lastItem + hideItem})`);
            if (child) {
                child.style.display = 'none';
            }
        }
    });
    /**
     * Remove any designer-only elements
     */
    // (new Sa5Designer).init();    
};
// Auto-execute on DOM load
document.addEventListener("DOMContentLoaded", init);
//# sourceMappingURL=webflow-html.js.map