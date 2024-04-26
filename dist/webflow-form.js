"use strict";
/*
 * webflow-form
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Adds capabilities to Webflow Forms and form elements.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5Form = exports.WebflowFormMode = void 0;
const globals_1 = require("./globals");
const debug_1 = require("./webflow-core/debug");
var WebflowFormMode;
(function (WebflowFormMode) {
    WebflowFormMode[WebflowFormMode["Active"] = 0] = "Active";
    WebflowFormMode[WebflowFormMode["Success"] = 1] = "Success";
    WebflowFormMode[WebflowFormMode["Error"] = 2] = "Error";
})(WebflowFormMode = exports.WebflowFormMode || (exports.WebflowFormMode = {}));
class Sa5Form {
    // Get the form's redirect attribute, if exists
    get redirect() {
        return this.formElement.getAttribute("redirect");
    }
    constructor(element) {
        //        this._element = element;
        this.debug = new debug_1.Sa5Debug("sa5-form");
        this.debug.debug("Initializing");
        // Resolve Form Block pointer
        if (element.tagName == "FORM")
            this.formBlockElement = element.parentElement;
        else
            this.formBlockElement = element;
        //        console.debug(this.formBlockElement);
        // Resolve Form pointer
        this.formElement = this.formBlockElement.querySelector("form");
        // TODO: everywhere
        this.isValid = true;
        //        console.debug(this.formElement);
    }
    init() { }
    submitButtonWaitMessage() {
        // Find all submit buttons in the form
        const submitButtons = this.formElement.querySelectorAll('input[type="submit"]');
        // Loop through each submit button
        submitButtons.forEach((button) => {
            // Get the value of the data-wait attribute
            const waitMessage = button.getAttribute("data-wait");
            // If data-wait attribute exists, set the button's value to the attribute value
            if (waitMessage) {
                button.value = waitMessage;
            }
        });
    }
    setMode(mode, message = "") {
        this.debug.debug("setting mode.", mode, message);
        let success = this.formBlockElement.querySelector("div.w-form-done");
        let error = this.formBlockElement.querySelector("div.w-form-fail");
        switch (mode) {
            case WebflowFormMode.Active:
                this.formElement.style.display = "block";
                success.style.display = "none";
                error.style.display = "none";
                break;
            case WebflowFormMode.Success:
                // console.log("SUCCESS");
                // Redirect, if appropriate
                if (this.redirect) {
                    console.log("redirecting");
                    this.submitButtonWaitMessage();
                    window.location.href = this.redirect;
                    return;
                }
                // Display message
                let successMessage = error.querySelector(globals_1.Sa5Attribute.getBracketed(globals_1.Sa5Attribute.ATTR_FORM_MESSAGE)); // wfu-form-message
                if (successMessage)
                    successMessage.innerHTML = message;
                this.formElement.style.display = "none";
                success.style.display = "block";
                error.style.display = "none";
                break;
            case WebflowFormMode.Error:
                // Display message
                let errorMessage = error.querySelector(globals_1.Sa5Attribute.getBracketed(globals_1.Sa5Attribute.ATTR_FORM_MESSAGE)); // wfu-form-message
                if (errorMessage)
                    errorMessage.innerHTML = message;
                this.formElement.style.display = "none";
                success.style.display = "none";
                error.style.display = "block";
                break;
        }
    }
}
exports.Sa5Form = Sa5Form;
//# sourceMappingURL=webflow-form.js.map