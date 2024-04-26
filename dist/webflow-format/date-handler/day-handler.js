"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WfuDateHandlerDay = void 0;
const date_handler_1 = require("./date-handler");
const dayjs_1 = __importDefault(require("dayjs"));
const advancedFormat_1 = __importDefault(require("dayjs/plugin/advancedFormat")); // load on demand
const relativeTime_1 = __importDefault(require("dayjs/plugin/relativeTime")); // load on demand
dayjs_1.default.extend(advancedFormat_1.default); // use plugin
dayjs_1.default.extend(relativeTime_1.default); // use plugin
class WfuDateHandlerDay extends date_handler_1.WfuDateHandler {
    constructor(config) {
        super(config); // call the super class constructor and pass in the name parameter
    }
    calculateAge(date) {
        const diff = new Date().getTime() - date.getTime();
        return Math.floor(diff / 31557600000); // 31557600000 ms/year
    }
    formatDate(date) {
        const h = (0, dayjs_1.default)(date);
        const past = date < new Date();
        let relative;
        let abs;
        var formatted;
        switch (this.mode) {
            // case "diff-days":
            //     relative = h.diff(new Date(), "days");
            //     abs = Math.abs(relative);
            //     if(this.suffix) {
            //         switch (this.compareToday(date, TimeframeScale.day)) {
            //             case RelativeDate.present:
            //                 formatted = `${abs} days`;
            //                 break;                        
            //             case RelativeDate.past:
            //                 if (abs == 1)
            //                     formatted = `${abs} day ago`;
            //                 else
            //                     formatted = `${abs} dayss ago`;
            //                 break;                        
            //             case RelativeDate.future:
            //                 if (abs == 1)
            //                     formatted = `in ${abs} day`;
            //                 else
            //                     formatted = `in ${abs} days`;
            //                 break;                        
            //         }
            //     }
            //     break;                
            // case "diff-months":
            //     relative = h.diff(new Date(), "months");
            //     abs = Math.abs(relative);
            //     if(this.suffix) {
            //         switch (this.compareToday(date, TimeframeScale.month)) {
            //             case RelativeDate.present:
            //                 formatted = `${abs} months`;
            //                 break;                        
            //             case RelativeDate.past:
            //                 if (abs == 1)
            //                     formatted = `${abs} month ago`;
            //                 else
            //                     formatted = `${abs} months ago`;
            //                 break;                        
            //             case RelativeDate.future:
            //                 if (abs == 1)
            //                     formatted = `in ${abs} month`;
            //                 else
            //                     formatted = `in ${abs} months`;
            //                 break;                        
            //         }
            //     }
            //     break;
            // case "diff-years":
            //     relative = h.diff(new Date(), "years");
            //     abs = Math.abs(relative);
            //     if(this.suffix) {
            //         switch (this.compareToday(date, TimeframeScale.year)) {
            //             case RelativeDate.present:
            //                 formatted = `${abs} years`;
            //                 break;                        
            //             case RelativeDate.past:
            //                 if (abs == 1)
            //                     formatted = `${abs} year ago`;
            //                 else
            //                     formatted = `${abs} years ago`;
            //                 break;                        
            //             case RelativeDate.future:
            //                 if (abs == 1)
            //                     formatted = `in ${abs} year`;
            //                 else
            //                     formatted = `in ${abs} years`;
            //                 break;                        
            //         }
            //     }
            //     break; 
            case "age":
                // console.log("age 2023-10-21", this.calculateAge(new Date("2023-10-21"))); 
                // console.log("age 2023-10-22", this.calculateAge(new Date("2023-10-22"))); 
                // console.log("age 2023-10-23", this.calculateAge(new Date("2023-10-23"))); 
                relative = this.calculateAge(date);
                abs = Math.abs(relative);
                formatted = relative.toString();
                if (this.suffix) {
                    if (abs == 1)
                        formatted = `${relative} year`;
                    else
                        formatted = `${relative} years`;
                }
                break;
            case "from":
                formatted = h.fromNow(!this.suffix);
                break;
            case "to":
                formatted = h.toNow(!this.suffix);
                break;
            case "relative":
                formatted = "rel";
                break;
            case "date":
            default:
                formatted = h.format(this.formatString);
                break;
        }
        return formatted;
    }
}
exports.WfuDateHandlerDay = WfuDateHandlerDay;
//# sourceMappingURL=day-handler.js.map