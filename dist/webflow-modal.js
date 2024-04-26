"use strict";
/*
 * Sa5
 * webflow-modal
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5Modal = void 0;
// import { renderRatingComponent } from "./modules/webflow-ui";
// import * as Cookies from 'js-cookie';
const typescript_cookie_1 = require("typescript-cookie");
const globals_1 = require("./globals");
//import { Cookies } from 'js-cookie';
class Sa5Modal {
    constructor(element) {
        this._element = element;
    }
    // Generates the unique key name for suppression tracking
    getModalKeyName() {
        return `wfu-modal_${this._name}`;
    }
    // Returns true if the item is flagged as suppressed
    isSuppressed() {
        // name
        //        console.log("suppressed", this.getModalKeyName())
        const suppressed = (0, typescript_cookie_1.getCookie)(this.getModalKeyName());
        //        console.log("suppressed", suppressed)
        // We use session storage
        // suppression is temporary, to the current tab-session
        // const suppressed = sessionStorage.getItem(
        //     this.getModalKeyName()
        //     );
        return suppressed;
    }
    // Suppress the item
    suppress(val, duration) {
        (0, typescript_cookie_1.setCookie)(this.getModalKeyName(), val, {
            expires: duration, // days
        });
        // We'll use session storage
        // suppression is temporary, to the current tab-session
        // sessionStorage.setItem(
        //     this.getModalKeyName(this._name), val);
    }
    // Un-suppress the item
    unSuppress() {
        // We'll use session storage
        // suppression is temporary, to the current tab-session
        (0, typescript_cookie_1.removeCookie)(this.getModalKeyName());
    }
    // Initialize all "modals" on the page
    init() {
        this._name =
            this._element.getAttribute(globals_1.Sa5Attribute.ATTR_MODAL // "wfu-modal"
            ) || "default";
        if (this.isSuppressed()) {
            this._element.remove();
            return; // nothing else to do
        }
        // Un-hide the item, if not suppressed
        this._element.removeAttribute(globals_1.Sa5Attribute.ATTR_MODAL_TRIGGER // "wfu-modal-trigger"
        );
        // Detect close button clicks,
        // and then suppress the targeted element
        document
            .querySelectorAll(globals_1.Sa5Attribute.getBracketed(globals_1.Sa5Attribute.ATTR_MODAL_CLOSE) // "[wfu-modal-close]"
        )
            .forEach((element) => {
            // Detect close button clicks,
            // and then suppress the targeted element
            element.addEventListener("click", () => {
                // Get modal
                const modalClose = element;
                const modal = modalClose.closest(globals_1.Sa5Attribute.getBracketed(globals_1.Sa5Attribute.ATTR_MODAL) // "[wfu-modal]"
                );
                const modalCloseVal = modalClose.getAttribute(globals_1.Sa5Attribute.ATTR_MODAL_CLOSE // "wfu-modal-close"
                ) || "true";
                const modalCloseType = modal.getAttribute(globals_1.Sa5Attribute.ATTR_MODAL_CLOSE_TYPE // "wfu-modal-close-type"
                ) || "auto";
                const modalSuppressDuration = parseFloat(modal.getAttribute(globals_1.Sa5Attribute.ATTR_MODAL_SUPPRESS_DAYS // "wfu-modal-suppress-days"
                )) || 9999;
                // Set cookie suppression
                this.suppress(modalCloseVal, modalSuppressDuration // days
                );
                // Close dialog
                // TODO: consider special interaction closes, do nothing
                switch (modalCloseType) {
                    case "interaction":
                        // do nothing
                        break;
                    case "auto":
                    default:
                        // remove now
                        modal.remove();
                        break;
                }
            });
        });
    }
}
exports.Sa5Modal = Sa5Modal;
//# sourceMappingURL=webflow-modal.js.map