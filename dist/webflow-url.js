"use strict";
/*
 * SA5 Url
 * webflow-url
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Url Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5Url = void 0;
const globals_1 = require("./globals");
const webflow_core_1 = require("./webflow-core");
const debug_1 = require("./webflow-core/debug");
const queryPassthrough_1 = require("./webflow-url/queryPassthrough");
const relativeLinkFixup_1 = require("./webflow-url/relativeLinkFixup");
const targetLinks_1 = require("./webflow-url/targetLinks");
// Register
//Sa5Core.startup(WfuQuery);
// window["sa5"] = window["sa5"] || []; // {};
// window["sa5"]["Sa5Format"] = WebflowFormat;
class Sa5Url {
    constructor(config = {}) {
        this.config = {
            passthrough: config.passthrough ?? false,
            passthroughConfig: config.passthroughConfig ?? {
                ignorePatterns: [/_page$/],
                overwriteExisting: config.passthroughConfig?.overwriteExisting ?? false,
                internalOnly: config.passthroughConfig?.internalOnly ?? true,
            },
            fixupRelative: config.fixupRelative ?? true,
            targetExternal: config.targetExternal ?? true,
            targetExternalConfig: config.targetExternalConfig ?? {
                allLinks: false,
            },
        };
        // Initialize debugging
        this.debug = new debug_1.Sa5Debug("sa5-url");
        this.debug.debug("Initializing");
    }
    // Handle config modifications
    getConfig() {
        let core = webflow_core_1.Sa5Core.startup();
        // TODO: move label to globals
        let configHandler = core.getHandler("urlConfig");
        if (!configHandler)
            return; // do nothing
        // this.config.getConfigCallback
        //     = core.getHandler('getMembershipRoutingConfig') as GetConfigCallback;
        //        console.log("pre config", this.config)
        if (configHandler) {
            this.config = configHandler(this.config);
        }
        //        console.log("post config", this.config)
    }
    init() {
        this.getConfig();
        /**
         * Process querystring params into tagged elements
         * NOTE: A links are currently ignored
         */
        // TODO: configure A link behavior
        //        new WfuQuery().init();
        // console.log("init url", this.config)
        if (this.config.passthrough) {
            new queryPassthrough_1.Sa5QueryPassthrough(this.config.passthroughConfig).init();
        }
        /**
         * Fixup relative links from the CMS
         */
        if (this.config.fixupRelative) {
            let elements = Array.from(document.querySelectorAll(globals_1.Sa5Attribute.getBracketed(globals_1.Sa5Attribute.ATTR_URL_RELATIVE_LINKS) // "[wfu-relative-links]"
            ));
            elements.forEach((element) => {
                new relativeLinkFixup_1.WfuRelativeLinkFixup(element).init();
            });
        }
        /**
         * Target external links to _blank
         */
        if (this.config.targetExternal) {
            // BUGGED: designer change on how links work ??
            var elements;
            if (this.config.targetExternalConfig.allLinks)
                elements = Array.from(document.querySelectorAll("a"));
            else
                elements = Array.from(document.querySelectorAll(globals_1.Sa5Attribute.getBracketed(globals_1.Sa5Attribute.ATTR_URL_EXTERNAL_LINKS) // "[wfu-external-links]"
                ));
            elements.forEach((element) => {
                new targetLinks_1.WfuTargetLinks(element).init();
            });
            //    new WfuTargetLinks().init();
        }
    }
}
exports.Sa5Url = Sa5Url;
webflow_core_1.Sa5Core.startup(Sa5Url);
//# sourceMappingURL=webflow-url.js.map