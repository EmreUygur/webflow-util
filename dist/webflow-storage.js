"use strict";
/*
 * webflow-storage
 * Storage Utilities
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Cookies, webStorage, ...
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5Storage = void 0;
const webflow_core_1 = require("./webflow-core");
const debug_1 = require("./webflow-core/debug");
//#region WfuCacheItem
var StorageMethod;
(function (StorageMethod) {
    StorageMethod[StorageMethod["sessionStorage"] = 0] = "sessionStorage";
    StorageMethod[StorageMethod["localStorage"] = 1] = "localStorage";
    StorageMethod[StorageMethod["cookies"] = 2] = "cookies";
})(StorageMethod || (StorageMethod = {}));
var defaultConfig = {
    // sessionStorage | localStorage | cookies
    storageMethod: StorageMethod.sessionStorage, // 'sessionStorage', // ONLY supported
    // prefix: 'cache',
    // val: {}, // Cached values
    // debug: false, // Debugging mode
};
class Sa5Storage {
    constructor(customConfig = {}) {
        //        this.config = $.extend({}, defaultWfuCacheConfig, config);
        this.config = { ...defaultConfig, ...customConfig };
        // Enable debugging, if specified
        this.debug = new debug_1.Sa5Debug("sa5-storage");
        //        this.debug.enabled = this.config.debug;
    }
    // cacheKey = function(key) {
    //     return `${this.config.prefix}_${key}`;
    // }
    setValue(key, value) {
        sessionStorage.setItem(key, value);
    }
    // add cookies npm lib
    getValue(key) {
        switch (this.config.storageMethod) {
            case StorageMethod.cookies:
                // window.getCookie = window.getCookie || function(name) {
                //     var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
                //     if (match) return match[2];
                // }
                break;
            case StorageMethod.localStorage:
                break;
            case StorageMethod.sessionStorage:
                break;
        }
        return sessionStorage.getItem(key);
    }
}
exports.Sa5Storage = Sa5Storage;
//#endregion
// Register
webflow_core_1.Sa5Core.startup(Sa5Storage);
// window["sa5"] = window["sa5"] || []; // {};
// window["sa5"]["Sa5Cache"] = Sa5Cache;
//# sourceMappingURL=webflow-storage.js.map