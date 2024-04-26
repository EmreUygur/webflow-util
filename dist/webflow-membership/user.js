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
exports.Sa5User = void 0;
const webflow_crypto_1 = require("../webflow-crypto");
const utils_1 = require("../utils");
/*
 * User class.
 */
//import Md5 from "crypto-api/src/hasher/md5";
class Sa5User {
    get user_id_alt() {
        if (!this.email)
            return undefined;
        return webflow_crypto_1.XXH64.hash(this.email);
    }
    get name_short_clean() {
        if (!this.email)
            return undefined;
        // if (this.email == {}) 
        //     return undefined;
        return this.email.split("@")[0];
    }
    get name_short() {
        if (!this.email)
            return undefined;
        return this.name_short_clean + '@';
    }
    get name_short_tcase() {
        if (!this.email)
            return undefined;
        return (0, utils_1.toTitleCase)(this.name_short_clean);
    }
    constructor() {
        // Track what data has been loaded
        this.user_data_loaded = {
            email: false,
            account_info: false,
            custom_fields: false,
            access_groups: false
        };
        // access-groups
        this.access_groups = [];
        // User data
        this.data = {}; // = new Map();
        // Meta data
        this.meta = {}; //  = new Map(); 
        // Raw data
        this.raw = {};
        this.isLoggedIn = function () {
            return (0, utils_1.getCookie)("wf_loggedin") || false;
        };
    }
    fromJSON(json) {
        if (!json)
            return; // no data to load 
        this.user_id = json.user_id;
        this.name = json.name;
        this.email = json.email;
        this.accept_communications = json.accept_communications;
        this.access_groups = json.access_groups;
        this.data = json.data;
        this.user_data_loaded.email = json.user_data_loaded.email;
        this.user_data_loaded.account_info = json.user_data_loaded.account_info;
        this.user_data_loaded.custom_fields = json.user_data_loaded.custom_fields;
        this.user_data_loaded.access_groups = json.user_data_loaded.access_groups;
        this.raw = json.raw;
    }
}
exports.Sa5User = Sa5User;
//# sourceMappingURL=user.js.map