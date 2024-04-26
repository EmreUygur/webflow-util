"use strict";
/*
 * webflow-video-factory
 * Handles player instantiation.
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Video Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5VideoPlayerFactory = void 0;
const vimeo_1 = require("./players/vimeo");
class Sa5VideoPlayerFactory {
    constructor() {
    }
    static create(element) {
        // Verify not null
        if (!element)
            return null;
        // Verify it's an IFRAME
        if (element.nodeName != "IFRAME") {
            console.error("SA5", "Invalid video element- must be an IFRAME");
            return null;
        }
        // VIMEO 
        // Verify src looks legit as VIMEO
        if (!element.matches("[src^='https://player.vimeo.com/']")) {
            console.error("SA5", "Does not appear to be a valid Vimeo video element");
            return null;
        }
        // It's Vimeo!
        return new vimeo_1.Sa5VideoPlayerVimeo(element);
    }
}
exports.Sa5VideoPlayerFactory = Sa5VideoPlayerFactory;
//# sourceMappingURL=player-factory.js.map