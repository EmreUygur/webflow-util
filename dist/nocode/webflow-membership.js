"use strict";
/*
 * webflow-membership
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * NO-CODE version, keys off of attributes.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../globals");
const webflow_core_1 = require("../webflow-core");
const debug_1 = require("../webflow-core/debug");
const webflow_membership_1 = require("../webflow-membership");
const login_routing_1 = require("../webflow-membership/login-routing");
const init = () => {
    //    let membership = new Sa5Membership(); 
    // Init membership
    let membership = new webflow_membership_1.Sa5UserAccounts(
    /*
          {
          handleBreakpointChange: (breakpointName: string, e: MediaQueryListEvent) => {
    
              window['sa5'] = window['sa5'] || {};
              const sa5: any = window['sa5'];
    
              // Get any global handler
              const breakpointChangeHandler = sa5['userInfoChanged'];
              if(breakpointChangeHandler)
                  breakpointChangeHandler(breakpointName, e);
    
            }
        }
    */
    );
    //    breakpoints.init();
    // Factory-create SA5 Core
    let core = webflow_core_1.Sa5Core.startup();
    // Initialize debugging
    let debug = new debug_1.Sa5Debug("sa5-user-accounts");
    debug.debug("Initializing");
    console.debug(`isLoggedIn = %c${membership.isLoggedIn()}`, "color: #ff0000;");
    /**
     * Conditional visiblity
     */
    // Show all elements tagged for logged-in users only
    document.querySelectorAll(globals_1.Sa5Attribute.getBracketed(globals_1.Sa5Attribute.ATTR_SHOW_LOGGED_IN))
        .forEach((element) => {
        if (membership.isLoggedIn())
            element.removeAttribute(globals_1.Sa5Attribute.ATTR_SHOW_LOGGED_IN);
    });
    // Hide all elements tagged for logged-out users only
    document.querySelectorAll(globals_1.Sa5Attribute.getBracketed(globals_1.Sa5Attribute.ATTR_HIDE_LOGGED_IN))
        .forEach((element) => {
        if (!membership.isLoggedIn())
            element.removeAttribute(globals_1.Sa5Attribute.ATTR_HIDE_LOGGED_IN);
    });
    /**
     * Memberships UX Enhancements
     */
    document.querySelectorAll(globals_1.Sa5Attribute.getBracketed(globals_1.Sa5Attribute.ATTR_LOGIN_BUTTON))
        .forEach((element) => {
        membership.expandLoginButton(element);
    });
    /**
     * Load Current User Info
     */
    membership.init();
    /**
     * Perform routing, if configured
     */
    (new login_routing_1.Sa5MembershipRouting()).init();
};
// Auto-execute on DOM load
document.addEventListener("DOMContentLoaded", init);
//# sourceMappingURL=webflow-membership.js.map