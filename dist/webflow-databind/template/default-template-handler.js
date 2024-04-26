"use strict";
/**
 * SA5
 * Default Template Handler
 * Data-Binding Content Template Handler
 *
 * - Straightforward handling of {{ }} constructions
 * - Full support for SA5 data-binding syntax
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTemplateHandler = void 0;
const webflow_databind_1 = require("../../webflow-databind");
class DefaultTemplateHandler {
    constructor(dataBinder) {
        this._dataBinder = dataBinder;
    }
    processElement(elem) {
        let html = elem.innerHTML;
        // Use the replace function with a regex to find and replace {{...}} constructions
        html = html.replace(/{{(.*?)}}/g, (match, p1) => {
            return this.processItem(p1, elem);
        });
        elem.innerHTML = html;
    }
    processItem(dsdSpecifier, elem) {
        let dsd = new webflow_databind_1.Sa5DataSourceDescriptor(dsdSpecifier);
        return this._dataBinder.getData(dsd, elem);
    }
}
exports.DefaultTemplateHandler = DefaultTemplateHandler;
//# sourceMappingURL=default-template-handler.js.map