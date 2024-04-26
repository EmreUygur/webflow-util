"use strict";
/*
 * webflow-form
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * NO-CODE version, keys off of [wfu] attributes.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// import {  } from '../modules/webflow-form';
const globals_1 = require("../globals");
const webflow_core_1 = require("../webflow-core");
const debug_1 = require("../webflow-core/debug");
const form_handler_factory_1 = require("../webflow-form/handler/form-handler-factory");
const ip_info_1 = require("../webflow-form/ip-info");
const init = () => {
    //    new Sa5Core().init();
    let core = webflow_core_1.Sa5Core.startup();
    // Initialize debugging
    let debug = new debug_1.Sa5Debug("sa5-form");
    debug.debug("Initializing");
    // const sa5Hotkeys = new Sa5Hotkeys();
    // sa5Hotkeys.init();
    // Prepare any tagged forms by appending IP Info
    document.querySelectorAll(globals_1.Sa5Attribute.getBracketed(globals_1.Sa5Attribute.ATTR_FORM_IPINFO) // '[wfu-form-ipinfo]'
    )
        .forEach((element) => {
        //        console.log("test ip-info"); 
        ip_info_1.Sa5FormIPInfo.createFromElement(element)
            .init();
    });
    // Catch any submits on forms
    // Which post to Zapier-webhooks 
    document.querySelectorAll(globals_1.Sa5Attribute.getBracketed(globals_1.Sa5Attribute.ATTR_FORM_HANDLER) // '[wfu-form-handler]'
    )
        .forEach((element) => {
        // console.log("installing form handler."); 
        form_handler_factory_1.WfuFormHandlerFactory.createFromElement(element)
            .init();
        // (new WfuFormIPInfo(element))
        //     .appendIPInfo();
        // const handlerName = element.getAttribute("wfu-form-handler");
        // var handler;
        // handler = WfuFormHandlerFactory
        //     .create(handlerName, element);
    });
    /*
        dataBindAllForms(db) {
    
            // Create datalists from all data sources
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
            db.data.forEach((data, dataSourceName) => {
    
                // Create HTML datalists of all data sources
                // for data binding
                createHtmlDataList(
                    createDsnMoniker(dataSourceName), // creates a more unique name to avoid element ID conflicts
                    data
                );
            });
    
            // Bind all SELECTS with [wfu-bind] specified
            dataBindAllFormSelects(db);
    
            // Bind all INPUTS with [wfu-bind] specified
            dataBindAllFormInputs(db);
    
        }
    */
};
document.addEventListener("DOMContentLoaded", init);
//# sourceMappingURL=webflow-form.js.map