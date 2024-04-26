"use strict";
/*
 * SA5
 * webflow-membership
 * Access Groups
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Member Information Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5UserAccessGroups = void 0;
/*
 * Access Groups class.
 */
//import Md5 from "crypto-api/src/hasher/md5"; 
class Sa5UserAccessGroups {
    constructor(membership) {
        this.accessGroups = [];
        this.membership = membership;
    }
    async initAsync() {
        console.log("initAsync");
        // Determine access group access
        console.log(await this.getAccessGroupsAsync());
        // Iterate and check
        // this.hasAccessGroup("webflow");
        // this.hasAccessGroup("client");
    }
    async getAccessGroupsAsync() {
        this.accessGroups = []; // Object.create(null); 
        // this.accessGroups.push({ key: "webflow", access: false });
        // this.accessGroups.push({ key: "webflow-2", access: false });
        // this.accessGroups.push({ key: "client", access: false });
        for (let group of this.membership.config.accessGroups) {
            let hasAccess = await this.checkAccessGroupAsync(group);
            if (hasAccess)
                this.accessGroups.push(group);
        }
        //  accessGroups.webflow = false;
        //  accessGroups["webflow-2"] = false;
        //  accessGroups.push({"client": false});
        //  accessGroups = {...accessGroups, ["client"]: false}; 
        //   this.accessGroups.forEach((element, index) => {
        //     this.accessGroups[index].access = true;
        //     });
        /*
      const accessGroups = {
          "webflow": false,
          "webflow-2": false,
          "client": false
        };
      */
        //  const ag = accessGroups.map(
        //x => Object.assign({}, accessGroups, {"hasAccess": "true"})
        //  ); 
        return this.accessGroups; // 
    }
    async checkAccessGroupAsync(accessGroupCode) {
        const response = await fetch(`${this.membership.config.accessGroupsFolder}/${accessGroupCode}`);
        console.log(`redirected: ${response.redirected}`);
        console.log('STATUS:', response.status);
        // https://www.sygnal.com/access-group/webflow
        // 302
        // 200 
        if (!response.redirected) {
            //no redirection
            console.log(`Has access group ${accessGroupCode}`);
            return true;
        }
        // Check and report mis-configuration 
        if (response.status != 200) {
            console.warn('SA5', `Memberships configuration error- access group ${accessGroupCode} is not queryable.`);
        }
        //   else
        //   {
        //redirection
        console.log(`Not logged in, or no access to ${accessGroupCode}`);
        return false;
        //          }
        // /log-in?
        // https://www.sygnal.com/access-group/client
        // access denied
        // 302 
        // /access-denied? 
    }
}
exports.Sa5UserAccessGroups = Sa5UserAccessGroups;
//# sourceMappingURL=access-groups.js.map