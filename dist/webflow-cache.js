"use strict";
/*
 * webflow-cache
 * Cache Utilities
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Cache Utilities
 * An advanced utility for retriving and caching values online, for maximum performance.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5CacheController = exports.Sa5CacheStorageType = void 0;
const webflow_core_1 = require("./webflow-core");
const debug_1 = require("./webflow-core/debug");
//#region WfuCacheItem
var Sa5CacheStorageType;
(function (Sa5CacheStorageType) {
    Sa5CacheStorageType[Sa5CacheStorageType["sessionStorage"] = 0] = "sessionStorage";
    Sa5CacheStorageType[Sa5CacheStorageType["localStorage"] = 1] = "localStorage";
    Sa5CacheStorageType[Sa5CacheStorageType["cookies"] = 2] = "cookies";
})(Sa5CacheStorageType = exports.Sa5CacheStorageType || (exports.Sa5CacheStorageType = {}));
var defaultConfig = {
    id: "cache",
    cacheKey: null,
    // sessionStorage | localStorage | cookies
    //    store: Sa5CacheStorageType.sessionStorage, // 'sessionStorage', // ONLY supported
    prefix: "cache",
    //    val: {}, // Cached values
    //    val: {}, // as { [key: string]: Sa5CacheItemBase },
    debug: false, // Debugging mode
};
// Controller
class Sa5CacheController {
    constructor(customConfig = {}) {
        this.items = new Map();
        this.cacheItemKey = function (itemName) {
            //        const CACHE_PREFIX = 'sa5-cache';
            return `${this.config.prefix}_${itemName}`;
        };
        //        this.config = $.extend({}, defaultWfuCacheConfig, config);
        this.config = { ...defaultConfig, ...customConfig };
        // Enable debugging, if specified
        this.debug = new debug_1.Sa5Debug("sa5-cache");
        this.debug.enabled = this.config.debug;
        // Verify cache is valid, if existing
        // clear if not
        if (this.config.cacheKey) {
        }
    }
    addItem(name, item) {
        // Reference to controller
        // supports cacheKey
        item.controller = this;
        this.items.set(name, item);
    }
    getItem(name) {
        return this.items.get(name);
    }
    /*
      async getAsync(itemName): Promise<string> {
  
          this.debug.group(`getAsync - "${itemName}"`);
          
          var itemHandler: Sa5CacheItem = this.config.val[itemName];
          this.debug.debug("valueHandler", itemHandler);
          
          if(!itemHandler) {
              console.error("Sa5", `No cache item handler '${itemName}'`);
          }
  
          let returnValue = null;
          switch(itemHandler.config.storageType) {
  
              case Sa5CacheStorageType.localStorage:
                  returnValue = localStorage.getItem(
                      this.cacheKey(itemName));
                  break;
              case Sa5CacheStorageType.sessionStorage:
                  returnValue = sessionStorage.getItem(
                      this.cacheKey(itemName));
                  this.debug.debug("cached? sessionStorage.getItem", returnValue);
                  break;
              case Sa5CacheStorageType.cookies:
                  break;
              
          }
  
  
          // var returnValue = sessionStorage.getItem(
          //     this.cacheKey(itemName));
  //        this.debug.debug("cached? sessionStorage.getItem", returnValue);
        
          const that = this;
  
          // Not cached
          // go get this value
          if (returnValue == null || returnValue == undefined) {
              
              // Call valueHandler function to calculate
              returnValue = await itemHandler.config.updateFnAsync().then(r => {
                  sessionStorage.setItem(
                      this.cacheKey(itemName), r);
                  that.debug.debug("sessionStorage.setItem", itemName, r);
                  that.debug.debug("calculated", r);
                  return r;
                  });
  
          }
  
          this.debug.debug("returning", returnValue);
  
          this.debug.groupEnd();
          return returnValue;
      }
  */
    clearCache() {
        // Iterate through items and clear()
    }
}
exports.Sa5CacheController = Sa5CacheController;
//#endregion
// Register
webflow_core_1.Sa5Core.startup(Sa5CacheController);
// window["sa5"] = window["sa5"] || []; // {};
// window["sa5"]["Sa5Cache"] = Sa5Cache;
//# sourceMappingURL=webflow-cache.js.map