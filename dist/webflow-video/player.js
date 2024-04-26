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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5VideoPlayer = exports.Sa5VideoPlayerState = exports.PlayerStateChange = exports.PlayerStatus = void 0;
const globals_1 = require("../globals");
const webflow_core_1 = require("../webflow-core");
var PlayerStatus;
(function (PlayerStatus) {
    PlayerStatus["Playing"] = "playing";
    PlayerStatus["Paused"] = "paused";
    PlayerStatus["Stopped"] = "stopped";
    PlayerStatus["Buffering"] = "buffering";
})(PlayerStatus = exports.PlayerStatus || (exports.PlayerStatus = {}));
var PlayerStateChange;
(function (PlayerStateChange) {
    PlayerStateChange["TimeUpdate"] = "timeupdate";
})(PlayerStateChange = exports.PlayerStateChange || (exports.PlayerStateChange = {}));
class Sa5VideoPlayerState {
    // video playback progress, as percent
    get progress() {
        return (this.at / this.duration) * 100.0;
    }
    ; // as a percentage from 0 to 100
}
exports.Sa5VideoPlayerState = Sa5VideoPlayerState;
class Sa5VideoPlayer {
    constructor(element) {
        if (element) {
            let videoName = element.getAttribute('wfu-video');
            this.name = videoName;
            this.element = element;
        }
    }
    // Process elements with the custom attr wfu-query-param
    init() {
    }
    onPlayerStateChange(stateChange, time, duration) {
        let core = webflow_core_1.Sa5Core.startup();
        // console.log('name', this.name);
        let percent = time * 100 / duration;
        // Get any global handlers
        core.getHandlers(globals_1.Sa5GlobalEvent.EVENT_VIDEO_PLAYER_STATE_CHANGE)
            .forEach(func => {
            // Initialize player state info 
            let state = new Sa5VideoPlayerState();
            state.stateChange = stateChange;
            state.at = time;
            state.duration = duration;
            func(this.name, state);
        });
    }
}
exports.Sa5VideoPlayer = Sa5VideoPlayer;
//# sourceMappingURL=player.js.map