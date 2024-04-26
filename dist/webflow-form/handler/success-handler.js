"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WfuFormHandlerSuccess = void 0;
const form_handler_1 = require("./form-handler");
const webflow_form_1 = require("../../webflow-form");
class WfuFormHandlerSuccess extends form_handler_1.WfuFormHandler {
    constructor(form, config) {
        super(form, config); // call the super class constructor and pass in the name parameter
    }
    handleResponseJSON(data, status, response) {
        this.debug.debug(`Webhook response data: ${JSON.stringify(data)}`);
        this.debug.debug(`Webhook response status: ${status}`);
        this.debug.debug(`Webhook response xhr: ${JSON.stringify(response)}`);
        // Assume success
        this.form.setMode(webflow_form_1.WebflowFormMode.Success);
    }
    handleResponseText(data, status, response) {
        this.debug.debug(`Webhook response data: ${JSON.stringify(data)}`);
        this.debug.debug(`Webhook response status: ${status}`);
        this.debug.debug(`Webhook response xhr: ${JSON.stringify(response)}`);
        // Assume success
        this.form.setMode(webflow_form_1.WebflowFormMode.Success);
    }
    handleFailResponse(jqxhr, settings, ex) {
        this.debug.debug(`Webhook response FAILED jqxhr: ${jqxhr}`);
        this.debug.debug(`Webhook response FAILED settings: ${settings}`);
        this.debug.debug(`Webhook response FAILED ex: ${ex}`);
        // Assume success
        this.form.setMode(webflow_form_1.WebflowFormMode.Error);
    }
}
exports.WfuFormHandlerSuccess = WfuFormHandlerSuccess;
//# sourceMappingURL=success-handler.js.map