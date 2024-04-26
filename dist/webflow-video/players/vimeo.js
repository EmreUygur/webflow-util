"use strict";
/*
 * webflow-video
 * Vimeo
 * Handles Vimeo player.
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Video Utilities
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5VideoPlayerVimeo = void 0;
const player_1 = require("../player");
const player_2 = __importDefault(require("@vimeo/player"));
class Sa5VideoPlayerVimeo extends player_1.Sa5VideoPlayer {
    constructor(element) {
        super(element);
        //        this.config = config;
        // console.log('vimeo const', element); 
    }
    // Process elements with the custom attr wfu-query-param
    init() {
        // console.log('init vimeo player'); 
        this.player = new player_2.default(this.element);
        this.player.on('timeupdate', (data) => {
            super.onPlayerStateChange(player_1.PlayerStateChange.TimeUpdate, data.seconds, data.duration);
        });
    }
}
exports.Sa5VideoPlayerVimeo = Sa5VideoPlayerVimeo;
/*

If you're referring to the Vimeo player from the previous question, Vimeo's official JavaScript player API provides a variety of events you can listen for and interact with. Here's a list of some of the most commonly used events:

play: Triggered when the video starts to play.

pause: Triggered when the video is paused.

ended: Triggered when the video reaches the end.

timeupdate: Triggered as the current playback time changes. This is useful for tracking the progress of the video.

progress: Triggered as the video is downloaded. This can be helpful for monitoring buffering status.

seeked: Triggered when a seek operation completes.

texttrackchange: Triggered when the active text track (like subtitles or captions) changes.

volumechange: Triggered when the volume changes.

playbackratechange: Triggered when the playback speed rate changes.

error: Triggered when an error occurs, like when a video fails to load.

loaded: Triggered when the player initially loads.

fullscreenchange: Triggered when the player enters or exits fullscreen mode.

*/
//# sourceMappingURL=vimeo.js.map