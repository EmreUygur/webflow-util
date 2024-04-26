"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5LayoutHandlerFactory = void 0;
// Default handler
const layout_handler_1 = require("./layout-handler");
// Typed handlers
const tabs_handler_1 = require("./tabs-handler");
const globals_1 = require("../../../globals");
class Sa5LayoutHandlerFactory {
    constructor(layoutContainer, config = {}) {
    }
    static createFromElement(layoutContainer, config = {}) {
        var handler;
        // Get the explicit type of layout handler
        let type = layoutContainer.getAttribute(globals_1.Sa5Attribute.ATTR_LAYOUT_HANDLER // "wfu-form-handler"
        ) || "auto";
        // Resolve the type of layout handler
        if (type == "auto") {
            if (layoutContainer.classList.contains('w-tabs')) {
                type = "tabs";
            }
            else {
                type = "default";
            }
        }
        // console.log("layout handler type", type, layoutContainer, config);
        switch (type) {
            case "tabs":
                handler = new tabs_handler_1.Sa5LayoutHandlerTabs(layoutContainer, config);
                break;
            case "default":
                handler = new layout_handler_1.Sa5LayoutHandler(layoutContainer, config);
                break;
            default:
                console.error(`Unknown wfu-layout-handler - ${type}`);
                break;
        }
        return handler;
    }
}
exports.Sa5LayoutHandlerFactory = Sa5LayoutHandlerFactory;
/*
// https://dev.to/sanderdebr/js-es6-design-patterns-factory-3a3g
export const WfuFormHandlerFactory = {
    create: function (type, elem, config) {
    }
}
*/ 
//# sourceMappingURL=layout-handler-factory.js.map