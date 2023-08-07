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

  // src/webflow-core.ts
  var Sa5Core = class {
    constructor() {
      this.handlers = [];
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

  // src/webflow-commerce.ts
  var WindcavePayment = class {
    generateUrl() {
      var hrefBase = "https://sec.windcave.com/pxaccess/pxpay/payform";
      const urlParams = new URLSearchParams();
      urlParams.set("userid", this.userid);
      urlParams.set("amount", Number(this.amount).toFixed(2));
      urlParams.set("currencyname", this.currencyname);
      urlParams.set("txndata1", this.txndata1);
      urlParams.set("txndata2", this.txndata2);
      urlParams.set("txndata3", this.txndata3);
      urlParams.set("email", this.email);
      var newHref = hrefBase + "?" + urlParams.toString();
      newHref = newHref.replace("+", "%20");
      return newHref;
    }
  };
  Sa5Core.startup(WindcavePayment);
  var PaypalPayment = class {
    generateUrl() {
      var hrefBase = "https://www.paypal.com/cgi-bin/webscr";
      const urlParams = new URLSearchParams();
      urlParams.set("business", this.business);
      urlParams.set("cmd", "_xclick");
      urlParams.set("currency_code", this.currency_code);
      urlParams.set("amount", Number(this.amount).toFixed(2));
      urlParams.set("item_name", this.item_name);
      var newHref = hrefBase + "?" + urlParams.toString();
      return newHref;
    }
  };
  Sa5Core.startup(PaypalPayment);
})();
//# sourceMappingURL=webflow-commerce.js.map