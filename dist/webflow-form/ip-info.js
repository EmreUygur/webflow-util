"use strict";
/*
 * webflow-form-ipinfo
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * For capturing sender IP info,
 * and appending to a form.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5FormIPInfo = void 0;
const webflow_form_1 = require("../webflow-form");
class Sa5FormIPInfo {
    constructor(form, config = {}) {
        this.prefix = "ip";
        this.handler = this;
        this.form = form;
        this.config = config;
        // Resolve Form Block pointer 
        // if ($(elem).is("form"))
        //     this.formBlock = $(elem).parent();
        // else
        //     this.formBlock = $(elem);
        // console.debug(this.formBlock);
        // // Resolve Form pointer
        // this.form = this.formBlock.children("form");
        // console.debug(this.form);
    }
    init() {
        const handler = this.handler;
        console.debug("WFU append IP Info to form.");
        // Get GeoIP info and append in hidden fields 
        fetch("https://get.geojs.io/v1/ip/geo.json")
            .then(response => response.json())
            .then(data => {
            const fields = ['ip', 'continent_code', 'address', 'country', 'country-code', 'region', 'city', 'timezone', 'latitude', 'longitude'];
            fields.forEach(field => {
                if (data[field]) {
                    let input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = `${handler.prefix}-${field}`;
                    input.value = data[field];
                    this.form.formElement.appendChild(input);
                }
            });
        })
            .catch(error => console.error('Error:', error));
    }
    static createFromElement(elem) {
        let form = new webflow_form_1.Sa5Form(elem);
        // if form is valid
        if (!form.isValid) {
            console.error("Cannot only instantiate IP Info from a Form element.");
        }
        return new Sa5FormIPInfo(form);
    }
}
exports.Sa5FormIPInfo = Sa5FormIPInfo;
//# sourceMappingURL=ip-info.js.map