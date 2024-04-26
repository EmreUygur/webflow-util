"use strict";
/*
 * webflow-html
 * Layouts
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5Layouts = void 0;
const globals_1 = require("../globals");
const webflow_core_1 = require("../webflow-core");
const debug_1 = require("../webflow-core/debug");
const layout_handler_factory_1 = require("./layout/handler/layout-handler-factory");
class Sa5Layouts {
    // Type guard to check if a function is a UserInfoChangedCallback
    isLayoutsChangedCallback(func) {
        if (!func)
            return false;
        // Adjust this check as needed
        return func.length === 1;
    }
    constructor(config = {}) {
        // Merge configs, with defaults
        this.config = {
            layoutChangedCallback: config.layoutChangedCallback,
        };
        let core = webflow_core_1.Sa5Core.startup();
        const layoutChanged = core.getHandler('layoutChanged');
        this.config.layoutChangedCallback = layoutChanged;
    }
    init() {
        // Initialize debugging
        let debug = new debug_1.Sa5Debug("sa5-html");
        debug.debug("Layouts initialized.", this.config);
        let layoutElements = Array.from(document.querySelectorAll(globals_1.Sa5Attribute.getBracketed(globals_1.Sa5Attribute.ATTR_LAYOUT) // '[wfu-layout]'
        ));
        layoutElements.forEach(element => {
            // Create the appropriate layout handler
            let handler = layout_handler_factory_1.Sa5LayoutHandlerFactory.createFromElement(element);
            // Perform the layout
            handler.layout();
        });
        //     // Notify any config-specified handler
        //     if(this.config.layoutChangedCallback) {
        //         this.config.layoutChangedCallback(
        //             device as string, 
        //             e
        //         ); 
        //     }
    }
}
exports.Sa5Layouts = Sa5Layouts;
// Layout 
/*
$("data[layout-target-id]").each(function() {
    
    const containerId = $(this).attr("layout-target-id");
//    console.debug(`item: ${containerId}`);
    
    var $target = $(`data[layout-container-id='${containerId}']`)
//    console.debug($target);
    $target=$target.closest("[layout-container]");
//    console.debug($target);

    const $item = $(this).closest("[layout-item]");
    $item.appendTo($target);
});
*/ 
//# sourceMappingURL=layout.js.map