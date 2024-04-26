"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WfuFormHandlerZapier = void 0;
const form_handler_1 = require("./form-handler");
const webflow_form_1 = require("../../webflow-form");
class WfuFormHandlerZapier extends form_handler_1.WfuFormHandler {
    constructor(form, config) {
        super(form, config); // call the super class constructor and pass in the name parameter
    }
    handleResponseJSON(data, status, response) {
        // How to access the correct `this` inside a callback 
        // https://stackoverflow.com/a/20279485
        this.debug.debug(`Webhook response status: ${status}`);
        this.debug.debug(`Zapier result: ${data.status}`);
        if (data.status == "success") {
            this.form.setMode(webflow_form_1.WebflowFormMode.Success);
        }
        else {
            this.form.setMode(webflow_form_1.WebflowFormMode.Error);
        }
    }
    handleFailResponse(jqxhr, settings, ex) {
        //console.log("what"); 
        this.debug.debug(`Webhook response FAILED jqxhr: ${jqxhr}`);
        this.debug.debug(`Webhook response FAILED settings: ${settings}`);
        this.debug.debug(`Webhook response FAILED ex: ${ex}`);
    }
}
exports.WfuFormHandlerZapier = WfuFormHandlerZapier;
//# sourceMappingURL=zapier-handler.js.map