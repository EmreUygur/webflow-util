"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LdJsonSearchAction = void 0;
const entry_point_1 = require("./entry-point");
class LdJsonSearchAction {
    constructor(queryInput = undefined) {
        this["@context"] = "https://schema.org";
        this["@type"] = "SearchAction";
        this.queryInput = queryInput;
        this.target = new entry_point_1.LdJsonEntryPoint();
    }
}
exports.LdJsonSearchAction = LdJsonSearchAction;
//# sourceMappingURL=search-action.js.map