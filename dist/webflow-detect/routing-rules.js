"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5RoutingRules = void 0;
class Sa5RoutingRules {
    constructor(detectController) {
        this.detectController = detectController;
    }
    load(rules) {
        this.rules = rules;
        // Iterate through each item in the 'sa5_route' array
        for (const rule of rules) {
            // Check if the type is 'geo-country'
            switch (rule.type) {
                case 'geo-country': {
                    this.detectController.countries = new Map(rule.route);
                    // // Iterate through each route in the 'route' array
                    // for (const [country, path] of item.route) {
                    //     // Process each country and path
                    //     console.log(`Country: ${country}, Path: ${path}`);
                    //     // Add your conditional processing logic here
                    // }
                    break;
                }
            }
        }
    }
}
exports.Sa5RoutingRules = Sa5RoutingRules;
/*

    window['sa5_route'] = [{
        type: 'geo-country',
        path: '/',
        route: [
            ["NZ", "/nz"],
            ["AU", "/au"],
            ["US", "/us"],
            ["GB", "/gb"],
        ]
    }]
    
    ,
    {
        type: 'geo-city',
        route: [
            ["NZ", "/nz"],
            ["AU", "/au"],
            ["US", "/us"],
            ["GB", "/gb"],
        ]
    },
    {
        type: 'ua-browser',
        route: [
            ["android", "/android"],
            ["ios", "/ios"],
        ]
    },
];
*/
// Add onready like user data
// Add data binding 
// detect.countries.set("NZ", "/nz");
// detect.countries.set("AU", "/au");
// detect.countries.set("US", "/us");
// detect.countries.set("GB", "/gb");
//# sourceMappingURL=routing-rules.js.map