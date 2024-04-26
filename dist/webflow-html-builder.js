"use strict";
/*
 * webflow-html-builder
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * HTML Builder
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlBuilder = void 0;
const utils_1 = require("./utils");
// import { encodeHtml, expandMacrosInText } from './webflow-html';
//import { getDictionaryFromDataRow } from './webflow-data.js';
const webflow_data_1 = require("./webflow-data");
var htmlRenderOptions = {
    encodeHtml: true,
};
class HtmlBuilder {
    constructor() {
        this.html = [];
        //// Putting all clases on DIV for simplicity
        //var divClass = [];
        //if (settings.responsive)
        //    divClass.push('wfu-table-responsive'); // div
        //divClass.push('wfu-table'); // table
        //if (settings.striped)
        //    divClass.push('wfu-striped'); // table
        //if (settings.bordered)
        //    divClass.push('wfu-bordered'); // table
        this.render = function () {
            return this.html.join("");
        };
    }
    add(html) {
        this.html.push(html);
    }
    addTemplate(templateEl, data) {
        let template = templateEl.innerHTML;
        console.log(`addTemplate`);
        console.log(template);
        console.log(data);
        for (let row = 0; row < data.length; row++) {
            // Create Dictionary
            let ds = new webflow_data_1.Sa5Datastore();
            let dict = ds.getDictionaryFromDataRow(data, row);
            let item = (0, utils_1.expandMacrosInText)(template, dict);
            console.log(item);
            this.add(item);
        }
    }
}
exports.HtmlBuilder = HtmlBuilder;
//# sourceMappingURL=webflow-html-builder.js.map