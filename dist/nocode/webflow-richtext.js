"use strict";
/*
 * webflow-richtext
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * NO-CODE version, keys off of [wfu] attributes.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const github_gist_1 = require("../webflow-richtext/github-gist");
const webflow_core_1 = require("../webflow-core");
const debug_1 = require("../webflow-core/debug");
const nested_list_1 = require("../webflow-richtext/nested-list");
const globals_1 = require("../globals");
const init = () => {
    //    new Sa5Core().init();
    let core = webflow_core_1.Sa5Core.startup();
    // Initialize debugging
    let debug = new debug_1.Sa5Debug("sa5-richtext");
    debug.debug("Initializing");
    const gitHubGist = new github_gist_1.GitHubGist();
    //    const elements = document.querySelectorAll('a[wfu-demo-link]') as NodeListOf<HTMLLinkElement>; 
    /**
     * Process nested lists
     */
    //    console.log("richtext pre-processing lists");
    document.querySelectorAll(`.w-richtext[${globals_1.Sa5Attribute.ATTR_RICHTEXT_LISTS}]` // '.w-richtext[wfu-lists]')
    ).forEach((rtfElem) => {
        //        console.log("richtext processing lists");
        rtfElem.querySelectorAll(':scope > ul, :scope > ol')
            .forEach((list) => {
            new nested_list_1.Sa5NestedList(list)
                .processNestedList();
        });
        // Remove the attribute
        // So that the skeleton CSS will reveal the underlying
        // processed content.
        rtfElem.removeAttribute(globals_1.Sa5Attribute.ATTR_RICHTEXT_LISTS // 'wfu-lists'
        );
    });
    gitHubGist.init();
    // Iterate over the matched elements
    // elements.forEach((element) => { 
    //   // Do something with each element
    //   webflowInfo.updateHrefToWebflowPreviewLink(element);
    // });
};
// Auto-execute on DOM load 
document.addEventListener("DOMContentLoaded", init);
//# sourceMappingURL=webflow-richtext.js.map