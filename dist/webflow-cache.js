(() => {
  // src/webflow-core/debug.ts
  var Sa5Debug = class {
    constructor(label) {
      this.localStorageDebugFlag = "sa5-debug";
      this._enabled = false;
      this._label = label;
    }
    get persistentDebug() {
      return Boolean(localStorage.getItem(this.localStorageDebugFlag));
    }
    set persistentDebug(active) {
      if (active) {
        localStorage.setItem(this.localStorageDebugFlag, "true");
        console.debug("sa5-core debug enabled (persistent).");
      } else {
        localStorage.removeItem(this.localStorageDebugFlag);
        console.debug("sa5-core debug disabled (persistent).");
      }
    }
    get enabled() {
      var wfuDebugValue = Boolean(localStorage.getItem(this.localStorageDebugFlag));
      wfuDebugValue = wfuDebugValue || this._enabled;
      return wfuDebugValue;
    }
    set enabled(active) {
      this._enabled = active;
    }
    group(name) {
      if (this.enabled)
        console.group(name);
    }
    groupEnd() {
      if (this.enabled)
        console.groupEnd();
    }
    debug(...args) {
      if (this.enabled)
        console.debug(this._label, ...args);
    }
  };

  // src/globals.ts
  var Sa5Attribute;
  ((Sa5Attribute2) => {
    function getBracketed(attr) {
      return `[${attr}]`;
    }
    Sa5Attribute2.getBracketed = getBracketed;
  })(Sa5Attribute || (Sa5Attribute = {}));
  var Sa5Attribute = /* @__PURE__ */ ((Sa5Attribute2) => {
    Sa5Attribute2["ATTR_DESIGN"] = "wfu-design";
    Sa5Attribute2["ATTR_ELEMENT_SLIDER"] = "wfu-slider";
    Sa5Attribute2["ATTR_ELEMENT_TABS"] = "wfu-tabs";
    Sa5Attribute2["ATTR_DATA"] = "wfu-data";
    Sa5Attribute2["ATTR_DATA_TYPE"] = "wfu-data-type";
    Sa5Attribute2["ATTR_DATA_DSN"] = "wfu-data-dsn";
    Sa5Attribute2["ATTR_DATA_ITEM_ID"] = "wfu-data-item-id";
    Sa5Attribute2["ATTR_DATABIND"] = "wfu-bind";
    Sa5Attribute2["ATTR_DATABIND_CONTENT"] = "wfu-bind-content";
    Sa5Attribute2["ATTR_DATABIND_CONTEXT_DSN"] = "wfu-bind-dsn";
    Sa5Attribute2["ATTR_DATABIND_CONTEXT_ITEM_ID"] = "wfu-bind-item-id";
    Sa5Attribute2["ATTR_PRELOAD"] = "wfu-preload";
    Sa5Attribute2["ATTR_IX_TRIGGER"] = "wfu-ix-trigger";
    Sa5Attribute2["ATTR_IX_ID"] = "wfu-ix-id";
    Sa5Attribute2["ATTR_SORT"] = "wfu-sort";
    Sa5Attribute2["ATTR_FILTER"] = "wfu-filter";
    Sa5Attribute2["ATTR_FILTER_MATCH"] = "wfu-filter-match";
    Sa5Attribute2["ATTR_FILTER_EVAL"] = "wfu-filter-eval";
    Sa5Attribute2["ATTR_FILTER_FUNC"] = "wfu-filter-func";
    return Sa5Attribute2;
  })(Sa5Attribute || {});

  // src/webflow-core/designer.ts
  var Sa5Designer = class {
    constructor() {
    }
    init() {
      this.removeDesignTimeElements();
    }
    removeDesignTimeElements() {
      console.log("designer clean");
      const elements = document.querySelectorAll(
        Sa5Attribute.getBracketed("wfu-design" /* ATTR_DESIGN */)
      );
      elements.forEach((element) => {
        element.remove();
      });
    }
  };

  // src/webflow-core.ts
  var Sa5Core = class {
    constructor() {
      this.handlers = [];
      new Sa5Designer().init();
    }
    getHandlers(name) {
      return this.handlers.filter((item) => item[0] === name).map((item) => item[1]);
    }
    getHandler(name) {
      const item = this.handlers.find((item2) => item2[0] === name);
      return item ? item[1] : void 0;
    }
    init() {
      this.initDebugMode();
    }
    initDebugMode() {
      const debugParamKey = "debug";
      let params = new URLSearchParams(window.location.search);
      let hasDebug = params.has(debugParamKey);
      if (hasDebug) {
        let wfuDebug = new Sa5Debug(`sa5 init`);
        wfuDebug.persistentDebug = this.stringToBoolean(params.get(debugParamKey));
      }
    }
    stringToBoolean(str) {
      const truthyValues = ["1", "true", "yes"];
      const falsyValues = ["0", "false", "no"];
      if (truthyValues.indexOf(str.toLowerCase()) !== -1) {
        return true;
      } else {
        return false;
      }
    }
    static startup(module = null) {
      let sa5instance = window["sa5"];
      var core;
      if (sa5instance?.constructor?.name == "Sa5Core") {
        core = sa5instance;
      } else {
        core = new Sa5Core();
        if (Array.isArray(sa5instance))
          core.handlers = sa5instance;
        window["sa5"] = core;
        window["Sa5"] = window["sa5"];
      }
      if (module) {
        window["sa5"][module.name] = module;
      }
      return core;
    }
    push(o) {
      this.handlers.push(o);
    }
  };
  Sa5Core.startup();

  // src/webflow-cache.ts
  var defaultConfig = {
    store: 0 /* sessionStorage */,
    prefix: "cache",
    val: {},
    debug: false
  };
  var Sa5Cache = class {
    constructor(customConfig = {}) {
      this.cacheKey = function(key) {
        return `${this.config.prefix}_${key}`;
      };
      this.config = { ...defaultConfig, ...customConfig };
      this.debug = new Sa5Debug("sa5-cache");
      this.debug.enabled = this.config.debug;
    }
    async getAsync(valueName) {
      this.debug.group(`getAsync - "${valueName}"`);
      var valueHandler = this.config.val[valueName];
      this.debug.debug("valueHandler", valueHandler);
      var returnValue = sessionStorage.getItem(
        this.cacheKey(valueName)
      );
      this.debug.debug("cached? sessionStorage.getItem", returnValue);
      const that = this;
      if (returnValue == null || returnValue == void 0) {
        returnValue = await valueHandler.config.updateFnAsync().then((r) => {
          sessionStorage.setItem(
            this.cacheKey(valueName),
            r
          );
          that.debug.debug("sessionStorage.setItem", valueName, r);
          that.debug.debug("calculated", r);
          return r;
        });
      }
      this.debug.debug("returning", returnValue);
      this.debug.groupEnd();
      return returnValue;
    }
  };
  Sa5Core.startup(Sa5Cache);
})();
//# sourceMappingURL=webflow-cache.js.map
