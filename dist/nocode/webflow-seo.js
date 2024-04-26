"use strict";
/*
 * Sa5
 * webflow-seo
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * SEO Utilities
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const webflow_core_1 = require("../webflow-core");
const article_1 = require("../webflow-seo/json-ld/article");
const course_1 = require("../webflow-seo/json-ld/course");
const debug_1 = require("../webflow-core/debug");
const webpage_1 = require("../webflow-seo/json-ld/webpage");
webflow_core_1.Sa5Core.startup(article_1.LdJsonArticle);
webflow_core_1.Sa5Core.startup(course_1.LdJsonCourse);
const init = () => {
    //    new Sa5Core().init();
    let core = webflow_core_1.Sa5Core.startup();
    // Initialize debugging
    let debug = new debug_1.Sa5Debug("sa5-seo");
    debug.debug("Initializing");
    //  const seo = new Sa5SEO(); 
    const webPage = new webpage_1.LdJsonWebPage();
    webPage.name = document.title;
    webPage.description = document.querySelector('meta[name="description"]')?.getAttribute('content');
    // do callback for modifications
    // e.g. add publisher name
    // publish it
    webPage.generate();
};
//# sourceMappingURL=webflow-seo.js.map