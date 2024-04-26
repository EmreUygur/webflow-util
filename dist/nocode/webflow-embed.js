"use strict";
/*
 * webflow-embed
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Embed content such as tables, and more.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const webflow_core_1 = require("../webflow-core");
const debug_1 = require("../webflow-core/debug");
const webflow_embed_1 = require("../webflow-embed");
// import { Sa5HtmlDynamicAttributes } from './webflow-html/dynamic-attributes'
// import { Sa5Breakpoints } from './webflow-html/breakpoints'
// interface Sa5EmbedConfig {
// //    dynamicAttributes?: boolean | true;
// //    handleBreakpointChange?: ((breakpointName: string, e: MediaQueryListEvent) => void) | null;
// //    handleOrientationChange?: ((orientationName: string, e: MediaQueryListEvent) => void) | null;
//     debug?: boolean | true;
// }
const initAsync = async () => {
    //    new Sa5Core().init();
    let core = webflow_core_1.Sa5Core.startup();
    // Initialize debugging
    let debug = new debug_1.Sa5Debug("sa5-embed");
    //console.log("INITIALIZING.")
    debug.debug("Initializing");
    debug.debug("sa5-embed init.");
    // Init embeds
    const embedSelectors = [
        //        'script[type="wfu-embed"]', // deprecated
        'script[type^="sygnal/embed"]' // e.g. sygnal/embed and sygnal/embed+hson
    ];
    document.querySelectorAll(embedSelectors.join(', '))
        .forEach(async (scriptElement) => {
        const webflowEmbed = await webflow_embed_1.Sa5Embed.createFromScriptElementAsync(scriptElement); // ?.init();
    });
};
document.addEventListener("DOMContentLoaded", initAsync);
//# sourceMappingURL=webflow-embed.js.map