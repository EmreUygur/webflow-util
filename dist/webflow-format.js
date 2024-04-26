"use strict";
/*
 * webflow-format
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Data Formatting Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebflowFormat = void 0;
const globals_1 = require("./globals");
const webflow_core_1 = require("./webflow-core");
const debug_1 = require("./webflow-core/debug");
const date_handler_factory_1 = require("./webflow-format/date-handler/date-handler-factory");
class WebflowFormat {
    // Initialize
    constructor() {
        this.debug = new debug_1.Sa5Debug("sa5-format");
    }
    // Simplest-case encoding for HTML5
    formatField(elem) {
        // How to assign JSON string to Javascript variable?
        // https://stackoverflow.com/a/31372143
        const fs = new Map([
            [
                "usd",
                {
                    locale: "en-US",
                    style: "currency",
                    currency: "USD",
                },
            ],
            [
                "gbp",
                {
                    locale: "en-US",
                    style: "currency",
                    currency: "GBP",
                },
            ],
            [
                "eur",
                {
                    locale: "en-US",
                    style: "currency",
                    currency: "EUR",
                },
            ],
            [
                "jpy",
                {
                    locale: "ja-JP",
                    style: "currency",
                    currency: "JPY",
                },
            ],
            [
                "percent",
                {
                    locale: "en-US",
                    style: "percent",
                },
            ],
            [
                "%",
                {
                    locale: "en-US",
                    style: "percent",
                },
            ],
            [
                "comma",
                {
                    locale: "en-US",
                    //            "style": 'percent',
                },
            ],
            [
                ",",
                {
                    locale: "en-US",
                    //            "style": 'percent',
                },
            ],
        ]);
        // Important- this approach handles common scenarios,
        // but does not handle quotes or special accented characters.
        // See https://www.php.net/htmlspecialchars
        //         elem.innerText
        //        const $item = $(elem);
        const txt = elem.innerText; //$item.text();
        const val = parseFloat(txt);
        var fn = elem.getAttribute(globals_1.Sa5Attribute.ATTR_FORMAT // "wfu-format"
        ); // e.g. "usd";
        // Determine the number of decimal places
        // this is set in the Designer, as the formatting of the numeric item
        var decimals = 0;
        if (txt.includes("."))
            decimals = txt.split(".")[1].length;
        // Get the base formatting rules
        var f = fs.get(fn);
        //    console.log(fn);
        //    console.log(JSON.stringify(f));
        var settings = {};
        settings["style"] = f.style;
        settings["currency"] = f.currency;
        settings["minimumFractionDigits"] = decimals;
        settings["maximumFractionDigits"] = decimals;
        //    settings.roundingIncrement = 1;
        //    console.log(JSON.stringify(settings));
        // Format the item
        const formatter = new Intl.NumberFormat(f.locale, settings);
        // Apply the formatting
        elem.innerHTML = formatter.format(val);
    }
    formatDate(element) {
        // Get the format string from the 'wfu-format-date' attribute
        const formatString = element.getAttribute(globals_1.Sa5Attribute.ATTR_FORMAT_DATE // "wfu-format-date"
        );
        // Check handler
        // Require moment
        const formatHandler = element.getAttribute(globals_1.Sa5Attribute.ATTR_FORMAT_HANDLER // "wfu-format-handler"
        );
        if (!formatHandler) {
            console.error("SA5 format date is used, but no handler is specified.");
        }
        //        handler: WfuDateHandler;
        const handler = date_handler_factory_1.WfuDateHandlerFactory.createFromElement(element);
        const date = new Date(element.textContent);
        const result = handler.formatDate(date);
        element.textContent = result;
        // if (formatHandler == "moment") {
        //     // Get the original content (assumed to be a valid date)
        //     const originalContent = element.textContent;
        //     // Use Moment.js to format the date
        //     const formattedDate = moment(originalContent).format(formatString);
        //     this.debug.debug (`formatting date ${originalContent} -> ${formattedDate}`);
        //     // Update the element's content
        //     element.textContent = formattedDate;
        // } else {
        //     if (formatHandler)
        //         console.error(`SA5 format date is used, but handler ${formatHandler} is unknown`);
        // }
        // Remove the 'wfu-format-date' attribute
        element.removeAttribute(globals_1.Sa5Attribute.ATTR_FORMAT_DATE // "wfu-format-date"
        );
        // Luxon & ordinals
        /*
            const { DateTime } = require('luxon');
    
            function getDayWithOrdinal(dateTime) {
              const day = dateTime.toFormat('d');
              const lastDigit = day.slice(-1);
              let suffix = 'th';
            
              if (day !== '11' && day !== '12' && day !== '13') {
                if (lastDigit === '1') {
                  suffix = 'st';
                } else if (lastDigit === '2') {
                  suffix = 'nd';
                } else if (lastDigit === '3') {
                  suffix = 'rd';
                }
              }
            
              return day + suffix;
            }
            
            const dt = DateTime.fromISO('2023-10-18');
            const dayWithOrdinal = getDayWithOrdinal(dt);
            console.log(dayWithOrdinal); // Outputs "18th"
          */
    }
}
exports.WebflowFormat = WebflowFormat;
// Register
webflow_core_1.Sa5Core.startup(WebflowFormat);
//# sourceMappingURL=webflow-format.js.map