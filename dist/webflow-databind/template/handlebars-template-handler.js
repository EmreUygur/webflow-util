"use strict";
/**
 * SA5
 * Handlebars
 * Data-Binding Content Template Handler
 *
 * ABANDONING
 * - Lack of flexibility on {{ }} syntax
 * - Complications with internal markup syntax
 * - Inability to define & handle our own declarations
 * - Possible limitations on escaping
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlebarsTemplateHandler = void 0;
const Handlebars = require("handlebars");
const default_template_handler_1 = require("./default-template-handler");
class HandlebarsTemplateHandler extends default_template_handler_1.DefaultTemplateHandler {
    // constructor() {
    // }
    processElement(elem) {
        // https://www.npmjs.com/package//handlebars
        let html = elem.innerHTML;
        html = html.replace(/{{/g, '{{ sa5 ');
        Handlebars.registerHelper('sa5', (context, options) => {
            console.log("sa5 handlebars", context, options);
            //this.getData(new Sa5DataSourceDescriptor())
            return "DATA1";
        });
        const template = Handlebars.compile(html);
        //            "Name: {{name}}");
        console.log(template({ name: "Nils" }));
    }
}
exports.HandlebarsTemplateHandler = HandlebarsTemplateHandler;
//# sourceMappingURL=handlebars-template-handler.js.map