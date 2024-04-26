"use strict";
/*
 * form-data-binder
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * For capturing sender IP info,
 * and appending to a form.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5FormDataBinder = void 0;
// import { getDataSource } from './webflow-data-collectionlist.js';
class Sa5FormDataBinder {
    //    prefix = "ip";
    constructor(form, config) {
        this.form = form;
        this.handler = this;
        this.config = config;
    }
}
exports.Sa5FormDataBinder = Sa5FormDataBinder;
//# sourceMappingURL=form-data-binder.js.map