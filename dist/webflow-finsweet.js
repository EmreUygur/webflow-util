"use strict";
/**
 * SA5
 * webflow-finsweet
 *
 * Extensions and helper utils for Finsweet Attributes
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5Finsweet = void 0;
const fs_load_1 = require("./webflow-finsweet/fs-load");
class Sa5Finsweet {
    constructor() {
        this.fsLoad = new fs_load_1.Sa5FinsweetLoad();
    }
    init() {
        // Init FS Load extensions
        this.fsLoad.init();
    }
}
exports.Sa5Finsweet = Sa5Finsweet;
//# sourceMappingURL=webflow-finsweet.js.map