"use strict";
/*
 * webflow-video
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Webflow Video
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebflowVideo = void 0;
const globals_1 = require("./globals");
const webflow_core_1 = require("./webflow-core");
class WebflowVideo {
    // Initialize
    constructor() { }
    // Fix all data poster urls
    processAllDataPosterUrls() {
        // Find poster video overrides and apply them
        const elements = document.querySelectorAll(`div[${globals_1.Sa5Attribute.ATTR_VIDEO_DATA_POSTER_URL}]`);
        elements.forEach((element) => {
            element.setAttribute("data-poster-url", element.getAttribute(globals_1.Sa5Attribute.ATTR_VIDEO_DATA_POSTER_URL));
        });
    }
    // https://www.maxlaumeister.com/articles/hide-related-videos-in-youtube-embeds/
    processAllYouTubeNorel() {
        // Install YouTube API if needed
        if (typeof YT === "undefined") {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
        // Assuming onYouTubeIframeAPIReadyCallbacks is declared elsewhere in the code like:
        let onYouTubeIframeAPIReadyCallbacks = [];
        for (let playerWrap of document.querySelectorAll(`[${globals_1.Sa5Attribute.ATTR_VIDEO_YOUTUBE_NOREL}]`)) {
            console.log("loading video", playerWrap);
            // Verify it's a valid YouTube element
            if (!playerWrap.classList.contains("w-embed-youtubevideo")) {
                console.warn("SA5", "The SA5 YouTube Norel attribute can only be applied to Webflow's YouTube elements.");
                continue; // skip to next
            }
            // Get the IFRAME
            let playerFrame = playerWrap.querySelector("iframe");
            if (!playerFrame) {
                console.warn("SA5", "YouTube player element malformed, missing iframe.");
                continue; // skip to next
            }
            // Append &enablejsapi=1 to the iframe src
            const iframeURL = new URL(playerFrame.src);
            iframeURL.searchParams.append("enablejsapi", "1");
            playerFrame.src = iframeURL.toString();
            // Extract VideoID
            const pathSegments = iframeURL.pathname.split("/");
            let videoID = null;
            if (pathSegments.length > 2 && pathSegments[1] === "embed") {
                videoID = pathSegments[2];
            }
            // Handle state changes and overlay screen
            // ? Is this needed for pause?
            let onPlayerStateChange = function (event) {
                if (event.data == YT.PlayerState.ENDED) {
                    console.log("Ended");
                    playerWrap.classList.add("sa5-video-ended");
                }
                else if (event.data == YT.PlayerState.PAUSED) {
                    console.log("Paused");
                    playerWrap.classList.add("sa5-video-paused");
                }
                else if (event.data == YT.PlayerState.PLAYING) {
                    console.log("Playing");
                    playerWrap.classList.remove("sa5-video-ended");
                    playerWrap.classList.remove("sa5-video-paused");
                }
            };
            let player;
            // Register for callbacks
            onYouTubeIframeAPIReadyCallbacks.push(() => {
                player = new YT.Player(playerFrame, {
                    events: {
                        onStateChange: onPlayerStateChange,
                    },
                });
            });
            // Use wrap as a video control
            playerWrap.addEventListener("click", function () {
                if (!player || typeof player.getPlayerState !== "function")
                    return;
                let playerState = player.getPlayerState();
                if (playerState == YT.PlayerState.ENDED) {
                    player.seekTo(0);
                }
                else if (playerState == YT.PlayerState.PAUSED) {
                    player.playVideo();
                }
            });
        }
        // Callback handler
        window.onYouTubeIframeAPIReady = function () {
            for (let callback of onYouTubeIframeAPIReadyCallbacks) {
                callback();
            }
        };
    }
}
exports.WebflowVideo = WebflowVideo;
// Register
webflow_core_1.Sa5Core.startup(WebflowVideo);
//# sourceMappingURL=webflow-video.js.map