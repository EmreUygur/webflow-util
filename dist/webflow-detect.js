"use strict";
/**
 * SA5
 * webflow-detect
 *
 * Prototype project
 * https://detect-location.webflow.io/
 * https://webflow.com/design/detect-location?pageId=64e82fd6ad1f15554ee84f49
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5Detect = void 0;
//import IPinfoWrapper, { IPinfo, AsnResponse } from "node-ipinfo";
const webflow_cache_1 = require("./webflow-cache");
const cache_item_typed_1 = require("./webflow-cache/cache-item-typed");
const ip_info_1 = require("./webflow-detect/geo-handlers/ip-info");
const routing_rules_1 = require("./webflow-detect/routing-rules");
const countryToContinent = {
    CN: "Asia",
    JP: "Asia",
    IN: "Asia",
    // ... other Asian countries
    FR: "Europe",
    DE: "Europe",
    GB: "Europe",
    // ... other European countries
    US: "North America",
    CA: "North America",
    MX: "North America",
    // ... other North American countries
    BR: "South America",
    AR: "South America",
    // ... other South American countries
    ZA: "Africa",
    EG: "Africa",
    // ... other African countries
    AU: "Oceania",
    NZ: "Oceania",
    // ... other Oceania countries
    AQ: "Antarctica",
    // ... other countries
};
const COOKIE_NAME = "userInfo";
class Sa5Detect {
    async userInfo() {
        const info = (await this.cache
            .getItem("userInfo")
            .getAsync());
        // if(!info)
        //     return null;
        // let userInfo: GeoHandlerInfo = JSON.parse(info);
        return info;
    }
    constructor() {
        // Map for redirection
        this.countries = new Map([]);
        this.routingRules = new routing_rules_1.Sa5RoutingRules(this);
        // Expiry: 3 days
        // BUG: ??
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 3);
        // Setup cached values
        this.cache = new webflow_cache_1.Sa5CacheController({
            id: "sa5-detect",
            cacheKey: "af92b71b-d0cf-4ad5-a06c-97327215af8a",
            prefix: "_sa5",
        });
        this.cache.addItem("userInfo", // ref name
        new cache_item_typed_1.Sa5CacheItemTyped({
            name: "userInfo",
            storageType: webflow_cache_1.Sa5CacheStorageType.cookies,
            storageExpiry: expiry,
            updateFnAsync: this.getUserInfoAsync,
        }));
    }
    async getUserInfoAsync() {
        // 37cce46c605631
        const IP_INFO_TOKEN = "37cce46c605631";
        const ipInfo = new ip_info_1.IPInfo(IP_INFO_TOKEN);
        let rawInfo = await ipInfo.getInfoAsync();
        const info = {
            ip: rawInfo.ip,
            country: rawInfo.country,
            city: rawInfo.city,
            region: rawInfo.region,
            postal: rawInfo.postal,
            timezone: rawInfo.timezone,
        };
        // const request = await fetch(`https://ipinfo.io/json?token=${IP_INFO_TOKEN}`);
        // this.userInfo = await request.json()
        console.log(info.ip, info.country);
        return info;
    }
    detectGeographicZone() {
        /*
        const continent = countryToContinent[jsonResponse.country];
        console.log(`The country ${jsonResponse.country} is in ${continent}.`);
    
    
        // Usage
        const currentCountry = jsonResponse.country;
        if (isCountryInList(currentCountry)) {
            console.log(`${currentCountry} is in the list.`);
        } else {
            console.log(`${currentCountry} is not in the list.`);
        }
        */
    }
    // Function to check if a country is in the list
    isCountryInList(countryCode) {
        return this.countries.has(countryCode);
    }
    getPathForCountry(countryCode) {
        console.log("getPathForCountry", countryCode);
        console.log(this.countries);
        return this.countries.get(countryCode);
    }
    // Home should be
    async applyDetectContextAsync() {
        //        console.log(this.countries);
        let userInfo = await this.cache
            .getItem("userInfo")
            .getAsync();
        //        console.log("APPLYING CONTEXT.");
        //      console.log(userInfo);
        let path = this.getPathForCountry(userInfo.country);
        //    console.log("path", path);
        /**
         * Route via redirect, if appropriate
         */
        // Look for a matching rule, by path
        for (const item of this.routingRules.rules) {
            //        console.log(item.path, window.location.pathname)
            // If path matches current location
            // TODO: expand on this, make it optional
            if (item.path === window.location.pathname) {
                // Check if the type is 'geo-country'
                if (item.type === "geo-country") {
                    // Iterate through each route in the 'route' array
                    for (const [country, path] of item.route) {
                        if (userInfo.country == country)
                            if (window.location.pathname != path)
                                // Redirect
                                window.location.href = path;
                        // Process each country and path
                        //                        console.log(`Country: ${country}, Path: ${path}`);
                        // Add your conditional processing logic here
                    }
                }
            }
        }
        // if(path) {
        //     if (window.location.pathname != path)
        //         window.location.href = path;
        // }
        // Apply hide/show filter on elements
        // Allow override context change on country
    }
}
exports.Sa5Detect = Sa5Detect;
//# sourceMappingURL=webflow-detect.js.map