"use strict";
/*
 * SA5
 * webflow-commerce
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Adds simple capabilities to Webflow.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaypalPayment = exports.WindcavePayment = void 0;
/*
 * Windcave Payment Provider
 * Generates a Windcave payment url.
 */
const webflow_core_1 = require("./webflow-core");
class WindcavePayment {
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
        // Fixup URL, windcave doesn't like '+'s
        newHref = newHref.replace("+", "%20");
        //        newHref = newHref.replace(/\+/g, "%20");
        return newHref;
    }
}
exports.WindcavePayment = WindcavePayment;
webflow_core_1.Sa5Core.startup(WindcavePayment);
/*
 * Paypal Payment Provider
 * Generates a Paypal payment url.
 */
class PaypalPayment {
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
}
exports.PaypalPayment = PaypalPayment;
webflow_core_1.Sa5Core.startup(PaypalPayment);
//# sourceMappingURL=webflow-commerce.js.map