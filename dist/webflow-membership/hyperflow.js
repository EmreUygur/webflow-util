"use strict";
/*
 * SA5
 * webflow-membership
 * Hyperflow
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * User Account Information Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5UserHyperflow = void 0;
/*
 * Access Groups class.
 */
//import Md5 from "crypto-api/src/hasher/md5"; 
class Sa5UserHyperflow {
    constructor(membership) {
        this.accessGroups = [];
        this.membership = membership;
    }
    async initAsync() {
        console.log("initAsync");
        // Determine access group access
        console.log(await this.getCurrentUserAsync());
        // Iterate and check
        // this.hasAccessGroup("webflow");
        // this.hasAccessGroup("client");
    }
    async getCurrentUserAsync() {
        //        this.accessGroups = []; // Object.create(null); 
        // this.accessGroups.push({ key: "webflow", access: false });
        // this.accessGroups.push({ key: "webflow-2", access: false });
        // this.accessGroups.push({ key: "client", access: false });
        const response = await fetch(`${this.membership.config.hf.currentUserUrl}`);
        //      console.log(`redirected: ${response.redirected}`);
        console.log('STATUS:', response.status);
        const raw = await response.json();
        console.log(raw);
        // Parse this Puppy
        /*
        {
          id: "658d2c967a397cda826ac938",
          createdOn: "2023-12-28T08:06:46.759Z",
          lastUpdated: "2023-12-28T21:58:28.281Z",
          isEmailVerified: true,
          lastLogin: "2023-12-28T08:07:35.407Z",
          data: {
            country: null,
            city: null,
            webflow-micro-consulting: false,
            webflow-mc-account: null,
            wmc-map-url: null,
            bio: null,
            name: "Michael",
            email: "memetican@gmail.com",
            accept-communications: true,
            accept-privacy: true
          },
          status: "verified",
          accessGroups: [
            {
              slug: "webflow-support",
              type: "admin"
            }
          ]
        }
        */
        //         for (let group of this.membership.config.accessGroups) {
        // //            let hasAccess: boolean = await this.checkAccessGroupAsync(group);
        //             if(hasAccess)
        //                 this.accessGroups.push(group);
        //         }
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
        //        return this.accessGroups; // 
    }
}
exports.Sa5UserHyperflow = Sa5UserHyperflow;
//# sourceMappingURL=hyperflow.js.map