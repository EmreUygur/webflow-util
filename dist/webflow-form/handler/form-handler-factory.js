"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WfuFormHandlerFactory = void 0;
const webflow_form_1 = require("../../webflow-form");
const form_handler_1 = require("./form-handler");
const basin_handler_1 = require("./basin-handler");
const make_handler_1 = require("./make-handler");
const n8n_handler_1 = require("./n8n-handler");
const zapier_handler_1 = require("./zapier-handler");
const success_handler_1 = require("./success-handler");
const globals_1 = require("../../globals");
class WfuFormHandlerFactory {
    constructor(form, config = {}) {
    }
    static create(form, config = {}) {
        var handler;
        let type = form.formBlockElement.getAttribute(globals_1.Sa5Attribute.ATTR_FORM_HANDLER // "wfu-form-handler"
        );
        switch (type) {
            case "zapier":
                handler = new zapier_handler_1.WfuFormHandlerZapier(form, config);
                break;
            case "n8n":
                handler = new n8n_handler_1.WfuFormHandlerN8N(form, config);
                break;
            case "make":
                handler = new make_handler_1.WfuFormHandlerMake(form, config);
                break;
            case "basin":
                handler = new basin_handler_1.WfuFormHandlerBasin(form, config);
                break;
            case "success":
                handler = new success_handler_1.WfuFormHandlerSuccess(form, config);
                break;
            case "other":
            case "": // unspecified 
                handler = new form_handler_1.WfuFormHandler(form, config);
                break;
            default:
                console.error(`Unknown wfu-form-handler ${type}`);
                break;
        }
        return handler;
    }
    static createFromElement(elem) {
        let form = new webflow_form_1.Sa5Form(elem);
        // if form is valid
        if (!form.isValid) {
            console.error("Cannot only instantiate Sa5 form handler from a Form element.");
        }
        return WfuFormHandlerFactory.create(form);
    }
}
exports.WfuFormHandlerFactory = WfuFormHandlerFactory;
/*
// https://dev.to/sanderdebr/js-es6-design-patterns-factory-3a3g
export const WfuFormHandlerFactory = {
    create: function (type, elem, config) {
    }
}
*/ 
//# sourceMappingURL=form-handler-factory.js.map