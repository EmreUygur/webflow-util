"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WfuFormHandlerN8N = void 0;
const form_handler_1 = require("./form-handler");
const webflow_form_1 = require("../../webflow-form");
class WfuFormHandlerN8N extends form_handler_1.WfuFormHandler {
    constructor(form, config) {
        super(form, config); // call the super class constructor and pass in the name parameter
    }
    handleResponseJSON(data, status, response) {
        // How to access the correct `this` inside a callback 
        // https://stackoverflow.com/a/20279485
        this.debug.debug(`Webhook response data: ${JSON.stringify(data)}`);
        this.debug.debug(`Webhook response status: ${status}`);
        this.debug.debug(`Webhook response xhr: ${JSON.stringify(response)}`);
        if (response.status >= 200 && response.status < 300) {
            this.form.setMode(webflow_form_1.WebflowFormMode.Success, response.responseJSON?.message);
        }
        else {
            this.form.setMode(webflow_form_1.WebflowFormMode.Error, response.responseJSON?.message);
        }
    }
    handleFailResponse(jqxhr, settings, ex) {
        this.debug.debug(`Webhook response FAILED jqxhr: ${JSON.stringify(jqxhr)}`);
        this.debug.debug(`Webhook response FAILED settings: ${settings}`);
        this.debug.debug(`Webhook response FAILED ex: ${ex}`);
        // Webhook is off - Webhook is temporarily disabled.
        // ? Scenario is off
        if (jqxhr.status == 400) {
            console.error(jqxhr.responseText);
            // use default error message, or maybe "Service unavailable." 
            this.form.setMode(webflow_form_1.WebflowFormMode.Error, jqxhr.responseJSON?.message);
        }
        else {
            this.form.setMode(webflow_form_1.WebflowFormMode.Error, jqxhr.responseJSON?.message);
        }
    }
}
exports.WfuFormHandlerN8N = WfuFormHandlerN8N;
//# sourceMappingURL=n8n-handler.js.map