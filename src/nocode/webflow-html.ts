
/*
 * webflow-html
 * 
 * Sygnal Technology Group
 * http://sygnal.com
 * 
 * NO-CODE version, keys off of [wfu] attributes.
 */

import { Sa5Html } from '../webflow-html'
import { Sa5Core } from '../webflow-core';
import { Sa5Debug } from '../webflow-core/debug';
import { WebflowTabs } from '../webflow-core/tabs';
import { WebflowSlider } from '../webflow-core/slider';
import { Sa5Editor } from '../webflow-core/webflow-editor'; 
import { sequence, decodeHTML } from '../utils';
import { Sa5CollectionList } from '../webflow-html/collection-list';
import { HtmlBuilder } from '../modules/webflow-html-builder';
import { Sa5NestedList } from '../webflow-html/nested-list'; 
import { Sa5Attribute } from '../globals';
import { Sa5Designer } from '../webflow-core/designer';

const init = () => { 

//    new Sa5Core().init();

    let core: Sa5Core = Sa5Core.startup();

    // Initialize debugging
    let debug = new Sa5Debug("sa5-html");
    debug.debug ("Initializing");

    // Dynamic Attributes
//    applyDynamicAttributes();


    // Create Sa5Html
    let obj = new Sa5Html({
        dynamicAttributes: true
    }).init();

    // Tabs
    // Auto-register class on named items? 
    // [wfu-tabs=NAME]
    let tabElements: NodeListOf<Element> = document.querySelectorAll(`[${Sa5Attribute.ATTR_ELEMENT_TABS}]`);
    tabElements.forEach(element => {

        var tabObj = new WebflowTabs(element as HTMLElement);

    });

    // Tabs
    // Auto-register class on named items? 
    // [wfu-tabs=NAME]
    let sliderElements: NodeListOf<Element> = document.querySelectorAll(`[${Sa5Attribute.ATTR_ELEMENT_SLIDER}]`);
    sliderElements.forEach(element => {

        var sliderObj = new WebflowSlider(element as HTMLElement);

    });
    
    // elements is a NodeList of all elements with the "wfu-tabs" attribute
    
    // [wfu-tab-default]


//    const wfuEditor = new WfuEditor();

    // Init Editor mode detection
    const editor = new Sa5Editor(); 


    /**
     * Sequence items
     */

    // Sequence items 
    let sequenceGroupElements = Array.from(
        document.querySelectorAll("[wfu-seq-group]")
        );

    sequenceGroupElements.forEach(element => {
        sequence(element as HTMLElement);
    });
    
//   // Sequence items 
//   $("[wfu-seq-group").each(function () {
//     sequence($(this));
// });


    // Unwrap tagged items



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

    document.querySelectorAll('[wfu-decode]')
      .forEach((element) => {
        element.innerHTML = decodeHTML(element.innerHTML);
        element.removeAttribute('wfu-decode');
    });

    /** 
     * Sort items 
     * Innermost first, to support nested sorts
     */

    document.querySelectorAll(`[${Sa5Attribute.ATTR_SORT}] [${Sa5Attribute.ATTR_SORT}] [${Sa5Attribute.ATTR_SORT}]`)
        .forEach((element: HTMLElement) => {
            new Sa5CollectionList(element)
                .sort();
        });
    document.querySelectorAll(`[${Sa5Attribute.ATTR_SORT}] [${Sa5Attribute.ATTR_SORT}]`)
        .forEach((element: HTMLElement) => {
            new Sa5CollectionList(element)
                .sort();
        });
    document.querySelectorAll(`[${Sa5Attribute.ATTR_SORT}]`)
        .forEach((element: HTMLElement) => {
            new Sa5CollectionList(element)
                .sort();
        });

    /**
     * Filter items
     * Place on item you want to conditionally hide 
     * TODO: add remove mode for non-matches? 
     */

//     document.querySelectorAll(`[${Sa5Attribute.ATTR_FILTER_MATCH}]`)
//       .forEach((element: HTMLElement) => {

//         let filterEval = element.getAttribute('wfu-filter') as string;

// //        console.log(filterEval);

//         let visible = eval(filterEval);
//         if (visible) {
//             element.removeAttribute("wfu-filter");
//         }

//     });

    document.querySelectorAll(`[${Sa5Attribute.ATTR_FILTER}],[${Sa5Attribute.ATTR_FILTER_EVAL}]`)
      .forEach((element: HTMLElement) => {

        let filterEval = null;
        if (element.hasAttribute(Sa5Attribute.ATTR_FILTER_EVAL)) 
            filterEval = element.getAttribute(Sa5Attribute.ATTR_FILTER_EVAL) as string;
        else {
            filterEval = element.getAttribute(Sa5Attribute.ATTR_FILTER) as string; 
            console.warn("[wfu-filter] is deprecated, use [wfu-filter-eval] instead.");
        }

//        console.log(filterEval);

        let visible = eval(filterEval);
        if (visible) {
            element.removeAttribute(Sa5Attribute.ATTR_FILTER);
            element.removeAttribute(Sa5Attribute.ATTR_FILTER_EVAL);
        }

    });

    document.querySelectorAll(`[${Sa5Attribute.ATTR_FILTER_MATCH}]`)
      .forEach((element: HTMLElement) => {

        let filterEval = element.getAttribute(Sa5Attribute.ATTR_FILTER_MATCH) as string;

//        console.log("filter eval", filterEval);

        // [weekday='${new Date().getDay()}']
        let filterMatches = eval(`\`${filterEval}\``);

//        console.log("filter matches", filterMatches);

        let visible = element.matches(filterMatches);
        if (visible) {
            element.removeAttribute(Sa5Attribute.ATTR_FILTER_MATCH);
        }

    });

    // Process filtered items
    document.querySelectorAll(`[${Sa5Attribute.ATTR_FILTER_FUNC}]`)
      .forEach((element: HTMLElement) => { 

        let funcName = element.getAttribute(Sa5Attribute.ATTR_FILTER_FUNC);
        let fqFuncName = `window.${funcName}`;
    
        let f = new Function(fqFuncName);
    
        // Retrieve function from window object using the function name
        let func = window[funcName as string];
    
        if (typeof func === 'function') {
            let visible = func(element);
            if (visible) {
                element.removeAttribute(Sa5Attribute.ATTR_FILTER_FUNC); 
            }
        }

    });

    /** 
     * Process nested lists
     */

    document.querySelectorAll('.w-richtext[wfu-lists]')
      .forEach((rtfElem: HTMLElement) => {

        rtfElem.querySelectorAll(':scope > ul, :scope > ol')
          .forEach((list: HTMLElement) => {

            new Sa5NestedList(list)
                .processNestedList();

        });
    
        // Remove the attribute
        // So that the skeleton CSS will reveal the underlying
        // processed content.
        rtfElem.removeAttribute('wfu-lists');

    });

    /**
     * Limit to a multiple of X items 
     */

    // Process limit multiple items
    // e.g. limit a list to a multiple of N items
    document.querySelectorAll('[wfu-limit-multiple]')
      .forEach((element: HTMLElement) => { 

// .w-dyn-list
// .w-dyn-items
// .w-dyn-item

        // If collection list wrapper, adjust to list
        var listElement: HTMLElement = element;
        if(element.classList.contains("w-dyn-list"))
            listElement = element.children[0] as HTMLElement; 

        // Determine multiple limit
        const itemCount = listElement.children.length;
        const itemMultipleCount = Number(element.getAttribute('wfu-limit-multiple'));
        const itemMinimumCount = Number(element.getAttribute('wfu-limit-multiple-min')); // Minimum
        let lastItem = Math.floor(itemCount / itemMultipleCount) * itemMultipleCount;
        if (lastItem < itemMinimumCount) lastItem = itemMinimumCount; // Apply minimum

        // Hide extra items over multiple limit
        for (let hideItem = 1; hideItem < itemMultipleCount; hideItem++) {
            let child: HTMLElement = listElement.querySelector(`:nth-child(${lastItem + hideItem})`);
            if (child) {
                child.style.display = 'none';
            }
        }

    });

    // // Remove any designer-only element
    // (new Sa5Designer).init();    

}

// Auto-execute on DOM load
document.addEventListener("DOMContentLoaded", init)