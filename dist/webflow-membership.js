"use strict";
/*
 * webflow-membership
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Member Information Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5UserAccounts = void 0;
const utils_1 = require("./utils");
const webflow_core_1 = require("./webflow-core");
const debug_1 = require("./webflow-core/debug");
const user_1 = require("./webflow-membership/user");
const webflow_databind_1 = require("./webflow-databind");
const globals_1 = require("./globals");
const access_groups_1 = require("./webflow-membership/access-groups");
const hyperflow_1 = require("./webflow-membership/hyperflow");
const StorageKeys = Object.freeze({
    user: "wfuUser",
    userKey: "wfuUserKey", // sa5_user_key
});
/**
 * User Accounts
 */
class Sa5UserAccounts {
    // Type guard to check if a function is a UserInfoChangedCallback
    isUserInfoChangedCallback(func) {
        if (!func)
            return false;
        // Adjust this check as needed
        return func.length === 1;
    }
    constructor(config = {}) {
        //#endregion
        //#region EVENT
        // User Info Updated
        this.userInfoUpdatedCallback = (user) => {
            //        console.log("%ccalled handler", "background-color: yellow;", user);
            // Notify any config-specified handler
            if (this.config.userInfoUpdatedCallback)
                this.config.userInfoUpdatedCallback(user);
        };
        // Merge configs, with defaults
        this.config = {
            userInfoUpdatedCallback: config.userInfoUpdatedCallback,
            debug: config.debug ?? false,
            dataBind: config.dataBind ?? true,
            accessGroupsFolder: config.accessGroupsFolder ?? "/sa5-ag",
            accessGroups: config.accessGroups ?? null,
            advanced: {
                accountInfoLoadDelay: config.advanced?.accountInfoLoadDelay ?? 300,
                accountInfoSaveDelay: config.advanced?.accountInfoSaveDelay ?? 500,
            },
            hf: {
                // Hyperflow
                enabled: config.hf?.enabled ?? false,
                currentUserUrl: config.hf?.currentUserUrl ?? "/_hf/users/current_user",
            },
        };
        let core = webflow_core_1.Sa5Core.startup();
        // Initialize debugging
        this.debug = new debug_1.Sa5Debug("sa5-membership");
        this.debug.debug("Initializing");
        // Load config
        // Get any global handler
        //         const userInfoChanged = core.getHandlers(Sa5GlobalEvent.EVENT_USER_CHANGED);
        //         userInfoChanged.forEach((f) => {
        // if(this.isUserInfoChangedCallback(f)) {
        // }
        //         });
        // if (this.isUserInfoChangedCallback(userInfoChanged)) {
        //     this.config.userInfoUpdatedCallback = userInfoChanged;
        // }
        // const userInfoChanged = core.getHandler(Sa5GlobalEvent.EVENT_USER_CHANGED);
        // if (this.isUserInfoChangedCallback(userInfoChanged)) {
        //     this.config.userInfoUpdatedCallback = userInfoChanged;
        // }
        // TODO: Make this a singleton Sa5Core
    }
    onUserInfoChanged(user) {
        let core = webflow_core_1.Sa5Core.startup();
        console.log(core);
        const userInfoChanged = core.getHandlers(globals_1.Sa5GlobalEvent.EVENT_USER_CHANGED);
        userInfoChanged.forEach((f) => {
            if (this.isUserInfoChangedCallback(f)) {
                f(user);
            }
        });
    }
    init() {
        // // Suppress IFRAME loads & user-account page loads
        // // BUG:
        // if (window.self != window.top)
        //     return;
        // if (window.location.pathname == `/user-account`)
        //     return;
        this.debug.group(`SA5 UserInfo init - ${Date.now()}.`);
        let core = webflow_core_1.Sa5Core.startup();
        // TODO: move label to globals
        let configHandler = core.getHandler("getMembershipConfig");
        if (!configHandler)
            return; // do nothing
        // this.config.getConfigCallback
        //     = core.getHandler('getMembershipRoutingConfig') as GetConfigCallback;
        if (configHandler) {
            this.config = configHandler(this.config);
        }
        /**
         * Install listeners
         * to listen for login/logout events
         */
        // https://stackoverflow.com/questions/9347282/using-jquery-preventing-form-from-submitting
        // https://stackoverflow.com/questions/11469616/jquery-form-validation-before-ajax-submit
        // LOGIN FORMS
        let forms = document.querySelectorAll("form[data-wf-user-form-type='login']");
        forms.forEach((form) => {
            form.addEventListener("submit", (e) => {
                // e.preventDefault();
                // e.stopPropagation();
                // On a login event, capture and save email temporarily
                let emailInput = form.querySelector("#wf-log-in-email");
                let userEmail = emailInput.value;
                let userKey = (0, utils_1.encodeDataBTOA)(userEmail);
                localStorage.setItem("StorageKeys.userKey", userKey);
            });
        });
        // USER-ACCOUNT FORMS
        forms = document.querySelectorAll("form[data-wf-user-form-type='userAccount']");
        forms.forEach((form) => {
            // Add a submit event listener
            form.addEventListener("submit", (e) => {
                // e.preventDefault();
                // e.stopPropagation();
                setTimeout(async () => {
                    // Refresh user info
                    await this.loadUserInfoAsync();
                }, this.config.advanced.accountInfoSaveDelay);
            });
        });
        // Call on every page on load.
        this.readyUserInfo();
        this.debug.groupEnd();
    }
    // Determine whether Webflow has a
    // currently logged-in user, by cookie detection
    isLoggedIn() {
        return (0, utils_1.getCookie)("wf_loggedin") || false;
    }
    clearUserInfo() {
        this.debug.group("clearUserInfo");
        this.debug.debug("logged out, cleaning info.");
        sessionStorage.removeItem(StorageKeys.user);
        localStorage.removeItem(StorageKeys.userKey);
        // Notify listeners
        // if (this.config.userLogoutPurge)
        //     this.config.userLogoutPurge(); // async
        this.debug.groupEnd();
    }
    // setDomainCookie = function(key, value, expires) {
    //     const domain = location.hostname;
    // }
    // Loads user info, from local and server data.
    // readying it for use.
    // Should be called on every page at the start.
    async readyUserInfo() {
        this.debug.group("readyUserInfo");
        // If not logged in
        // clear user tracking
        if (!this.isLoggedIn()) {
            this.clearUserInfo();
            this.debug.groupEnd();
            return;
        }
        // Load or create blank
        var user = this.loadUserInfoCache();
        if (user) {
            // Databinding
            if (this.config.dataBind) {
                this.debug.debug("databinding", user);
                new webflow_databind_1.WfuDataBinder(null, {
                    user: user,
                }).bindAll();
            }
            // User Callback
            this.onUserInfoChanged(user);
            // if (this.config.userInfoUpdatedCallback) {
            //     this.debug.debug("userCallback", user);
            //     this.config.userInfoUpdatedCallback(user); // async
            // }
        }
        // If no cached user, load it
        if (!user)
            // user =
            await this.loadUserInfoAsync();
        this.debug.groupEnd();
    }
    async getUserKey() {
        var userKey;
        // Get cached version if possible
        const userKeyEncoded = localStorage.getItem(StorageKeys.userKey);
        if (userKeyEncoded) {
            return (0, utils_1.encodedDataATOB)(userKeyEncoded);
        }
    }
    //#region CONSTRUCT USER INFO OBJECT
    // Loads user info, from local and server data.
    // readying it for use.
    // Should be called on every page at the start.
    async loadUserInfoAsync() {
        this.debug.group("loadUserInfoAsync");
        this.debug.debug(`isLoggedIn = ${this.isLoggedIn()}`);
        // If not logged in
        // clear user tracking
        if (!this.isLoggedIn()) {
            this.clearUserInfo();
            this.debug.groupEnd();
            return;
        }
        // Remove cached user object
        sessionStorage.removeItem(StorageKeys.user);
        if (this.config.hf.enabled) {
            // Use Hyperflow loader
            this.loadUserInfoAsync_hyperflow(); // async
        }
        else {
            // Load layers asynchronously
            // for maximum performance
            // merge dynamically as results are gathered
            this.loadUserInfoAsync_loginInfo(); // async
            this.loadUserInfoAsync_accountInfo(); // async
            this.loadUserInfoAsync_accessGroups(); // async
        }
        // Load or create blank
        this.debug.groupEnd();
    }
    // Get account info
    // from Hyperflow
    async loadUserInfoAsync_hyperflow() {
        this.debug.group("loadUserInfoAsync_hyperflow");
        // Create blank
        var user = new user_1.Sa5User();
        user.user_data_loaded.email = true;
        user.user_data_loaded.account_info = true;
        user.user_data_loaded.access_groups = true;
        const hf = new hyperflow_1.Sa5UserHyperflow(this);
        await hf.initAsync();
        // const userKey = await this.getUserKey();
        // if (!userKey) {
        //     // Logged in but no userKey
        //     // Typically happens on first login from sign-up auth
        //     this.debug.debug("No user key for loading.");
        //     this.debug.groupEnd();
        //     return;
        // }
        // // Loaded successfully
        // user.email = userKey;
        // Cache locally (email only)
        this.debug.debug("Caching user object [login].", user);
        this.saveUserInfoCache(user);
        // // Hydrate user object with other data
        // if (this.config.loadUserInfoCallback) {
        //     await this.config.loadUserInfoCallback(user);
        //     // Cache locally ( updated )
        //     this.saveUserInfoCache(user);
        // }
        // Notify listeners
        // if (this.config.userInfoUpdatedCallback)
        //     this.config.userInfoUpdatedCallback(user); // async
        this.debug.groupEnd();
    }
    // Get account info
    // from cache
    async loadUserInfoAsync_loginInfo() {
        this.debug.group("loadUserInfoAsync_loginInfo");
        // Create blank
        var user = new user_1.Sa5User();
        user.user_data_loaded.email = true;
        const userKey = await this.getUserKey();
        if (!userKey) {
            // Logged in but no userKey
            // Typically happens on first login from sign-up auth
            this.debug.debug("No user key for loading.");
            this.debug.groupEnd();
            return;
        }
        // Loaded successfully
        user.email = userKey;
        // Cache locally (email only)
        this.debug.debug("Caching user object [login].", user);
        this.saveUserInfoCache(user);
        // // Hydrate user object with other data
        // if (this.config.loadUserInfoCallback) {
        //     await this.config.loadUserInfoCallback(user);
        //     // Cache locally ( updated )
        //     this.saveUserInfoCache(user);
        // }
        // Notify listeners
        // if (this.config.userInfoUpdatedCallback)
        //     this.config.userInfoUpdatedCallback(user); // async
        this.debug.groupEnd();
    }
    // Get account info
    // from /user-account page
    async loadUserInfoAsync_accountInfo() {
        this.debug.group("loadUserInfoAsync_accountInfo");
        // Suppress IFRAME loads & user-account page loads
        if (window.self != window.top) {
            return;
        }
        // Create the iframe element
        let userInfoPixel = document.createElement("iframe");
        userInfoPixel.src = "/user-account";
        userInfoPixel.id = "userInfoPixel";
        userInfoPixel.style.display = "none";
        // Append the iframe to the body
        document.body.append(userInfoPixel);
        // Add a "load" event listener
        userInfoPixel.addEventListener("load", async () => {
            this.debug.debug("Loading user account info.");
            this.debug.debug(`%c here`, "color: #ff0000; background-color: yellow;");
            // Create blank
            var user = new user_1.Sa5User();
            user.user_data_loaded.email = true;
            user.user_data_loaded.account_info = true;
            user.user_data_loaded.custom_fields = true;
            //            user.user_data_loaded.access_groups = true;
            //             var $userAccountEmail = await userInfoPixel.contents().find("input#wf-user-account-email");
            let userAccountEmailInput = null;
            if (userInfoPixel.contentDocument) {
                userAccountEmailInput = userInfoPixel.contentDocument.querySelector("input#wf-user-account-email");
            }
            else if (userInfoPixel.contentWindow) {
                userAccountEmailInput =
                    userInfoPixel.contentWindow.document.querySelector("input#wf-user-account-email");
            }
            if (!userAccountEmailInput) {
                return;
            }
            // Detect programmatic changes on input type text [duplicate]
            // https://stackoverflow.com/a/72223895
            const input = userAccountEmailInput; // $userAccountEmail[0];
            const desc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
            Object.defineProperty(input, "value", {
                get: desc.get,
                set: function (v) {
                    desc.set.call(this, v);
                    // How can I trigger an onchange event manually? [duplicate]
                    // https://stackoverflow.com/a/2856602
                    if ("createEvent" in document) {
                        var evt = document.createEvent("HTMLEvents");
                        evt.initEvent("change", false, true);
                        input.dispatchEvent(evt);
                    }
                    else {
                        if (userAccountEmailInput) {
                            // Create a new event
                            let event = new Event("change", {
                                bubbles: true,
                                cancelable: true,
                            });
                            // Dispatch the event
                            userAccountEmailInput.dispatchEvent(event);
                        }
                    }
                    //                    input.fireEvent("onchange");
                },
            });
            // setting up input change event
            userAccountEmailInput.addEventListener("change", async () => {
                this.debug.debug("email field load detected.");
                this.debug.debug(`waiting ${this.config.advanced.accountInfoLoadDelay}ms`);
                setTimeout(async () => {
                    this.debug.debug(`%c USER-ACCOUNT LOADED`, "color: #ff0000; background-color: yellow;");
                    const userKey = userAccountEmailInput.value;
                    user.email = userKey;
                    // Get pixel
                    let doc = userInfoPixel.contentDocument ||
                        userInfoPixel.contentWindow?.document;
                    if (doc) {
                        let userNameElement = doc.querySelector("[data-wf-user-field='wf-user-field-name']");
                        if (userNameElement) {
                            user.name = userNameElement.value;
                        }
                        // Accept_communications, if defined
                        let acceptCommunicationsCheckbox = doc.querySelector("#wf-user-account-accept-communications");
                        if (acceptCommunicationsCheckbox) {
                            user.accept_communications = acceptCommunicationsCheckbox.checked;
                        }
                        // User data fields, if defined
                        let userDataFields = doc.querySelectorAll("[data-wf-user-field]");
                        userDataFields.forEach((element) => {
                            const id = element.id;
                            const fieldType = element.getAttribute("data-wf-user-field-type");
                            let val = element.value;
                            if (!id)
                                return;
                            if (id.startsWith("wf-user-account-"))
                                return;
                            switch (fieldType) {
                                case "PlainText": // 256 char max
                                case "Email":
                                case "Link":
                                case "Option":
                                    user.data[id] = val;
                                    return;
                                case "Number": // step min max
                                    user.data[id] = val;
                                    return;
                                case "Bool": // checkbox
                                    let checkbox = element;
                                    user.data[id] = checkbox.checked;
                                    return;
                                case "FileRef": // file - suppressed
                                    break;
                            }
                        });
                    }
                    this.debug.debug("Final version", user);
                    // Cache locally (email only)
                    this.debug.debug("Caching user object [account_info].", user);
                    this.saveUserInfoCache(user);
                    // // Hydrate user object with other data
                    // if (this.config.loadUserInfoCallback) {
                    //     await this.config.loadUserInfoCallback(user);
                    //     // Cache locally ( updated )
                    //     this.saveUserInfoCache(user);
                    // }
                    // // Notify listeners
                    // if (that.config.userInfoUpdatedCallback)
                    //     that.config.userInfoUpdatedCallback(user); // async
                }, this.config.advanced.accountInfoLoadDelay);
            });
            this.debug.groupEnd();
        });
    }
    async loadUserInfoAsync_accessGroups() {
        this.debug.group("loadUserInfoAsync_accessGroups");
        // Create blank
        var user = new user_1.Sa5User();
        user.user_data_loaded.access_groups = true;
        // If null or [], exit
        if (this.config.accessGroups) {
            let accessGroupHandler = new access_groups_1.Sa5UserAccessGroups(this);
            await accessGroupHandler.initAsync();
            user.access_groups = accessGroupHandler.accessGroups;
        }
        else {
            this.debug.debug("Access groups not configured.");
        }
        // Cache locally (email only)
        this.debug.debug("Caching user object [login].", user);
        this.saveUserInfoCache(user);
        this.debug.groupEnd();
    }
    //#endregion
    //#region USER CACHE
    saveUserInfoCache(newUserData) {
        this.debug.group("saveUserInfoCache");
        if (!this.isLoggedIn) {
            this.debug.debug("no user logged in.");
            this.debug.groupEnd();
            return null;
        }
        // Smart merge
        // https://www.javascripttutorial.net/object/javascript-merge-objects/
        // https://masteringjs.io/tutorials/fundamentals/merge-two-objects
        var userData = this.loadUserInfoCache();
        if (!userData)
            userData = new user_1.Sa5User();
        if (newUserData.user_data_loaded.email) {
            this.debug.debug("Merging user email.");
            userData.email = newUserData.email;
        }
        if (newUserData.user_data_loaded.account_info) {
            this.debug.debug("Merging user account_info.");
            userData.email = newUserData.email;
            userData.name = newUserData.name;
            userData.accept_communications = newUserData.accept_communications;
        }
        if (newUserData.user_data_loaded.custom_fields) {
            this.debug.debug("Merging user custom_fields.");
            userData.data = newUserData.data;
        }
        if (newUserData.user_data_loaded.access_groups) {
            this.debug.debug("Merging user access_groups.");
            userData.access_groups = newUserData.access_groups;
        }
        // Coalesce loaded info
        userData.user_data_loaded.email =
            userData.user_data_loaded.email || newUserData.user_data_loaded.email;
        userData.user_data_loaded.account_info =
            userData.user_data_loaded.account_info ||
                newUserData.user_data_loaded.account_info;
        userData.user_data_loaded.custom_fields =
            userData.user_data_loaded.custom_fields ||
                newUserData.user_data_loaded.custom_fields;
        userData.user_data_loaded.access_groups =
            userData.user_data_loaded.access_groups ||
                newUserData.user_data_loaded.access_groups;
        this.debug.debug("new user", newUserData);
        this.debug.debug("merged", userData); // Merged
        sessionStorage.setItem(StorageKeys.user, (0, utils_1.encodeDataBTOA)(JSON.stringify(userData)) // , jsonMapReplacer))
        );
        // Databinding
        if (this.config.dataBind) {
            this.debug.debug("databinding", userData);
            new webflow_databind_1.WfuDataBinder(null, // datastore
            {
                user: userData,
            }).bindAll();
        }
        // Notify listeners
        //        console.log("%cchecking for handler", "background-color: yellow;");
        this.onUserInfoChanged(userData);
        //         if (this.config.userInfoUpdatedCallback) {
        // //            console.log("%ccalling handler", "background-color: yellow;");
        //             this.debug.debug("Notify listeners", userData); // Merged
        //             this.userInfoUpdatedCallback(userData);
        // //            this.config.userInfoUpdatedCallback(userData); // async
        //         }
        //this.userInfoUpdatedCallback
        this.debug.groupEnd();
    }
    loadUserInfoCache() {
        this.debug.group("loadUserInfoCache");
        if (!this.isLoggedIn) {
            this.debug.debug("No user logged in.");
            this.debug.groupEnd();
            return null;
        }
        const userInfo = sessionStorage.getItem(StorageKeys.user);
        if (!userInfo) {
            this.debug.debug("No user info to load.");
            this.debug.groupEnd();
            return null;
        }
        this.debug.debug(userInfo);
        this.debug.debug("getting user.");
        // De-serialize User
        const user = new user_1.Sa5User();
        user.fromJSON(JSON.parse((0, utils_1.encodedDataATOB)(userInfo)) //, jsonMapReviver)
        );
        this.debug.groupEnd();
        return user;
    }
    //#endregion
    //#region MEMBERSHIPS UX
    // Expanded login button
    // Used on a containing DIV to expand the trigger area of
    // Webflow's Log-In / Log-Out button
    expandLoginButton(elem) {
        // Get Webflow Login/Logout button
        const wfLoginButton = elem.querySelector("[data-wf-user-logout]");
        // Setup click event handler on outer DIV
        elem.addEventListener("click", () => {
            // Click inner element
            if (wfLoginButton) {
                wfLoginButton.click();
            }
        });
        // Also intercept and stop propagation so event is not doubled
        if (wfLoginButton) {
            wfLoginButton.addEventListener("click", (e) => {
                e.stopPropagation();
            });
        }
    }
}
exports.Sa5UserAccounts = Sa5UserAccounts;
//# sourceMappingURL=webflow-membership.js.map