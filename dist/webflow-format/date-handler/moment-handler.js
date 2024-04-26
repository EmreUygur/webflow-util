"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WfuDateHandlerMoment = void 0;
const date_handler_1 = require("./date-handler");
const moment = require("moment");
class WfuDateHandlerMoment extends date_handler_1.WfuDateHandler {
    constructor(config) {
        super(config); // call the super class constructor and pass in the name parameter
    }
    formatDate(date) {
        // Get the original content (assumed to be a valid date)
        //        const originalContent = element.textContent;
        // Use Moment.js to format the date
        const formattedDate = moment(date).format(this.formatString);
        this.debug.debug(`formatting date ${date} -> ${formattedDate}`);
        // Update the element's content
        return formattedDate;
    }
}
exports.WfuDateHandlerMoment = WfuDateHandlerMoment;
//# sourceMappingURL=moment-handler.js.map