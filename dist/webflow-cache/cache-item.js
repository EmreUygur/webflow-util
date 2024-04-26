"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5CacheItem = void 0;
const cache_item_typed_1 = require("./cache-item-typed");
class Sa5CacheItem extends cache_item_typed_1.Sa5CacheItemTyped {
    constructor(customConfig = {}) {
        super(customConfig);
    }
    async getAsync() {
        return await super.getAsync();
    }
    async setAsync(value) {
        await super.setAsync(value);
    }
}
exports.Sa5CacheItem = Sa5CacheItem;
//# sourceMappingURL=cache-item.js.map