"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WfuDateHandlerFactory = void 0;
const day_handler_1 = require("./day-handler");
const utils_1 = require("../../utils");
const globals_1 = require("../../globals");
class WfuDateHandlerFactory {
    constructor(config = {}) {
    }
    static create(type, config = {}) {
        var handler;
        //        let type = form.formBlockElement.getAttribute("wfu-form-handler"); 
        switch (type) {
            // case "moment": case "momentjs":
            //     handler = new WfuDateHandlerMoment(config);
            //     break;
            case "": // unspecified 
            case "day":
            case "dayjs":
                handler = new day_handler_1.WfuDateHandlerDay(config);
                break;
            default:
                console.error(`Unknown wfu-format-handler ${type}`);
                break;
        }
        return handler;
    }
    static createFromElement(elem) {
        let type = elem.getAttribute(globals_1.Sa5Attribute.ATTR_FORMAT_HANDLER // "wfu-format-handler"
        );
        let format = elem.getAttribute(globals_1.Sa5Attribute.ATTR_FORMAT_DATE // "wfu-format-date"
        );
        //console.log(type);
        //console.log(format);
        const handler = WfuDateHandlerFactory.create(type);
        handler.mode = elem.getAttribute(globals_1.Sa5Attribute.ATTR_FORMAT_MODE // "wfu-format-mode"
        ) || "date";
        handler.formatString = format;
        handler.suffix = (0, utils_1.booleanValue)(elem.getAttribute(globals_1.Sa5Attribute.ATTR_FORMAT_SUFFIX // "wfu-format-suffix"
        ) || "yes");
        return handler;
    }
}
exports.WfuDateHandlerFactory = WfuDateHandlerFactory;
//# sourceMappingURL=date-handler-factory.js.map