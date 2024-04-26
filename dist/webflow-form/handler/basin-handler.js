"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WfuFormHandlerBasin = void 0;
const form_handler_1 = require("./form-handler");
class WfuFormHandlerBasin extends form_handler_1.WfuFormHandler {
    constructor(form, config = {}) {
        console.log("BASIN HANDLER.");
        super(form, config); // call the super class constructor and pass in the name parameter
    }
}
exports.WfuFormHandlerBasin = WfuFormHandlerBasin;
//# sourceMappingURL=basin-handler.js.map