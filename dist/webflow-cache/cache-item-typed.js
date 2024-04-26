"use strict";
/*
 * webflow-cache-item
 * Cache Utilities
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Cache Utilities
 * An advanced utility for retriving and caching values online, for maximum performance.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5CacheItemTyped = void 0;
const webflow_cache_1 = require("../webflow-cache");
const debug_1 = require("../webflow-core/debug");
var defaultConfig = {
    name: undefined,
    //    store: "sessionStorage", // | localStorage 
    storageType: webflow_cache_1.Sa5CacheStorageType.sessionStorage,
    storageExpiry: null,
    updateFnAsync: undefined,
    debug: false, // Debugging mode
};
// String item
class Sa5CacheItemTyped {
    constructor(customConfig = {}) {
        this.debug = new debug_1.Sa5Debug("sa5-cache-item");
        // Merge configs
        //        this.config = Object.assign({}, defaultConfig, customConfig);
        this.config = { ...defaultConfig, ...customConfig };
        // Enable debugging, if specified
        this.debug.enabled = this.config.debug;
    }
    getCookie(name) {
        const encodedName = encodeURIComponent(name);
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${encodedName}=`);
        if (parts.length === 2) {
            const cookieValue = parts.pop().split(';').shift();
            return cookieValue ? decodeURIComponent(cookieValue) : null;
        }
        return null;
    }
    setCookie(name, val) {
        let cookieValue = `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;
        if (this.config.storageExpiry) {
            cookieValue += `;expires=${this.config.storageExpiry.toUTCString()}`;
        }
        // Set the path for the cookie to be accessible across the entire site
        cookieValue += `;path=/`;
        document.cookie = cookieValue;
    }
    // TODO: nullable cache values ? 
    async getAsync() {
        // Attempt to retrieve from cache
        let val = await this.getAsyncFromCache();
        // if (returnValue == null || returnValue == undefined) { 
        if (!val) {
            val = await this.getAsyncFromSource();
        }
        return val;
    }
    async setAsync(val) {
        this.setAsyncToCache(val);
    }
    async setAsyncToCache(val) {
        switch (this.config.storageType) {
            case webflow_cache_1.Sa5CacheStorageType.localStorage:
                localStorage.setItem(this.controller.cacheItemKey(this.config.name), JSON.stringify(val));
                break;
            case webflow_cache_1.Sa5CacheStorageType.sessionStorage:
                sessionStorage.setItem(this.controller.cacheItemKey(this.config.name), JSON.stringify(val));
                break;
            case webflow_cache_1.Sa5CacheStorageType.cookies:
                this.setCookie(this.controller.cacheItemKey(this.config.name), JSON.stringify(val));
                this.config.storageExpiry;
                break;
        }
    }
    async getAsyncFromCache() {
        let itemData = null;
        switch (this.config.storageType) {
            case webflow_cache_1.Sa5CacheStorageType.localStorage:
                itemData = localStorage.getItem(this.controller.cacheItemKey(this.config.name));
                break;
            case webflow_cache_1.Sa5CacheStorageType.sessionStorage:
                itemData = sessionStorage.getItem(this.controller.cacheItemKey(this.config.name));
                this.debug.debug("cached? sessionStorage.getItem", itemData);
                break;
            case webflow_cache_1.Sa5CacheStorageType.cookies:
                itemData = this.getCookie(this.controller.cacheItemKey(this.config.name));
                break;
        }
        return JSON.parse(itemData);
    }
    async getAsyncFromSource() {
        // Not cached
        // go get this value 
        // Call valueHandler function to calculate 
        return await this.config.updateFnAsync().then(r => {
            this.setAsync(r);
            this.debug.debug("sessionStorage.setItem", this.config.name, r);
            this.debug.debug("calculated", r);
            return r;
        });
    }
}
exports.Sa5CacheItemTyped = Sa5CacheItemTyped;
//# sourceMappingURL=cache-item-typed.js.map