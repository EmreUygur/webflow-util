"use strict";
/*
 * webflow-video
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * NO-CODE version, keys off of [wfu] attributes.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const webflow_video_1 = require("../webflow-video");
const webflow_core_1 = require("../webflow-core");
const debug_1 = require("../webflow-core/debug");
const player_factory_1 = require("../webflow-video/player-factory");
const globals_1 = require("../globals");
// type VideoTimeUpdateCallback = (name: string, time: number, totalTime: number, percent: number) => void;
const init = () => {
    let core = webflow_core_1.Sa5Core.startup();
    // Initialize debugging
    let debug = new debug_1.Sa5Debug("sa5-video");
    debug.debug("Initializing");
    /**
     * Initialize all [wfu-video] elements
     */
    let videos = document.querySelectorAll(`[${globals_1.Sa5Attribute.ATTR_VIDEO}]`);
    videos.forEach((element) => {
        player_factory_1.Sa5VideoPlayerFactory.create(element).init();
    });
    const webflowVideo = new webflow_video_1.WebflowVideo();
    /**
     * Initialize all [wfu-youtube-norel] elements
     */
    // let youtube = document.querySelectorAll(`[${Sa5Attribute.ATTR_VIDEO_YOUTUBE_NOREL}]`);
    // youtube.forEach((element: HTMLElement) => {
    //    console.log("Processing NOREL")
    webflowVideo.processAllYouTubeNorel();
    //        Sa5VideoPlayerFactory.create(element).init();
    //    });
    /**
     * Handle background videos.
     */
    webflowVideo.processAllDataPosterUrls();
    // // Find poster video overrides and apply them
    // const elements = document.querySelectorAll(`div[wfu-data-poster-url]`) as NodeListOf<HTMLDivElement>; 
    // elements.forEach((element) => { 
    //   // Do something with each element
    //   webflowInfo.updateHrefToWebflowPreviewLink(element);
    // });
};
document.addEventListener("DOMContentLoaded", init);
//# sourceMappingURL=webflow-video.js.map