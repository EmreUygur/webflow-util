"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WfuFormHandler = void 0;
const debug_1 = require("../../webflow-core/debug");
const webflow_form_1 = require("../../webflow-form");
/*
 * WfuFormHandler class.
 */
var defaultFormHandlerConfig = {
    debug: false, // Debugging mode
};
class WfuFormHandler {
    constructor(form, config = {}) {
        // Initialize debugging
        this.debug = new debug_1.Sa5Debug("sa5-form-handler");
        this.debug.debug("Initializing");
        this.form = form;
        let action = this.form.formElement.getAttribute("action");
        this.debug.debug("action", action);
        // Get the Webflow wait message
        let waitMessage = this.form.formElement.querySelector("input[type=submit]")
            .getAttribute("data-wait");
        this.debug.debug(`waitMessage: ${waitMessage}`);
    }
    handleResponseJSON(data, status, response) {
        this.debug.debug(`Webhook response data: ${JSON.stringify(data)}`);
        this.debug.debug(`Webhook response status: ${status}`);
        this.debug.debug(`Webhook response xhr: ${JSON.stringify(response)}`);
        if (response.status >= 200 && response.status < 300) {
            this.form.setMode(webflow_form_1.WebflowFormMode.Success);
        }
        else {
            this.form.setMode(webflow_form_1.WebflowFormMode.Error);
        }
    }
    handleResponseText(data, status, response) {
        this.debug.debug(`Webhook response data: ${JSON.stringify(data)}`);
        this.debug.debug(`Webhook response status: ${status}`);
        this.debug.debug(`Webhook response xhr: ${JSON.stringify(response)}`);
        if (response.status >= 200 && response.status < 300) {
            this.form.setMode(webflow_form_1.WebflowFormMode.Success);
        }
        else {
            this.form.setMode(webflow_form_1.WebflowFormMode.Error);
        }
    }
    handleFailResponse(jqxhr, settings, ex) {
        this.debug.debug(`Webhook response FAILED jqxhr: ${jqxhr}`);
        this.debug.debug(`Webhook response FAILED settings: ${settings}`);
        this.debug.debug(`Webhook response FAILED ex: ${ex}`);
        this.form.setMode(webflow_form_1.WebflowFormMode.Error);
    }
    formDataToJson(formElement) {
        let formData = new FormData(formElement);
        let jsonObject = {};
        for (const [key, value] of formData.entries()) {
            jsonObject[key] = value;
        }
        return JSON.stringify(jsonObject);
    }
    init() {
        const form = this.form;
        this.debug.debug("WFU Handle Form submit to webhook (success response).");
        this.form.formElement.addEventListener('submit', async (e) => {
            e.preventDefault();
            this.debug.debug("Posting data.");
            this.debug.debug(`Webhook - ${this.form.formElement.getAttribute("action")}`);
            // Post to hook,
            // Capture & handle result
            let formData = new FormData(this.form.formElement);
            // console.log(json);  // Outputs the JSON string
            //console.log(this.form.formElement.action);
            //console.log(formData); 
            //console.log("sending data");
            fetch(this.form.formElement.action, {
                method: 'POST',
                body: formData
            })
                .then(response => {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    return response
                        .json()
                        .then(data => this.handleResponseJSON(data, "success", response));
                }
                else {
                    return response
                        .text()
                        .then(data => this.handleResponseText(data, "success", response));
                }
            })
                .catch((error) => this.handleFailResponse(error, "error", error));
            // .finally(() => {
            //     // Any cleanup code goes here
            // });
            return false;
        });
    }
}
exports.WfuFormHandler = WfuFormHandler;
/*
// https://dev.to/sanderdebr/js-es6-design-patterns-factory-3a3g
export const WfuFormHandlerFactory = {
    create: function (type, elem, config) {
    }
}
*/ 
//# sourceMappingURL=form-handler.js.map