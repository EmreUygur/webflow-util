"use strict";
/*
 * webflow-lightbox
 * Caption Handler
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Extensions to Webflow's lightbox element.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5LightboxCaptionHandler = void 0;
/**
 * Lightbox class.
 */
var defaultConfig = {};
class Sa5LightboxCaptionHandler {
    constructor() {
        this.lightBoxStateCallback = (mutationList, observer) => {
            for (const mutation of mutationList) {
                if (mutation.type === 'attributes' && mutation.target instanceof HTMLElement) {
                    if (mutation.target.classList.contains("w-lightbox-noscroll")) {
                        console.debug("Lightbox opened.");
                        this.installLightBoxNavObserver();
                    }
                    else {
                        console.debug("Lightbox closed.");
                        this.uninstallLightBoxNavObserver();
                    }
                }
            }
        };
        this.lightBoxNavCallback = (mutationList, observer) => {
            for (let mutation of mutationList) {
                if (mutation.target instanceof HTMLElement) {
                    if (mutation.target.classList.contains("w-lightbox-content")) {
                        this.setupCaption();
                    }
                }
            }
        };
    }
    init() {
        // Create lightbox state mutation observer
        let observer = new MutationObserver(this.lightBoxStateCallback);
        observer.observe(document.getElementsByTagName("html")[0], {
            childList: false,
            subtree: false,
            characterDataOldValue: false,
            attributes: true,
            attributeFilter: ["class"]
        });
    }
    installLightBoxNavObserver() {
        this.setupCaption();
        let lightboxContainer = document.querySelector(".w-lightbox-container");
        if (lightboxContainer) {
            let lightboxNavObserver = new MutationObserver(this.lightBoxNavCallback);
            // Options for the observer (which mutations to observe)
            const config = { childList: true, subtree: true };
            // Start observing the target node for configured mutations
            lightboxNavObserver.observe(lightboxContainer, config);
        }
    }
    uninstallLightBoxNavObserver() {
        if (this.lightboxNavObserver)
            this.lightboxNavObserver.disconnect();
    }
    setupCaption() {
        let figure = document.querySelector("figure.w-lightbox-figure");
        if (figure) {
            let img = figure.querySelector("img");
            let captionElement = figure.querySelector("figcaption");
            if (img) {
                let key = img.getAttribute("src");
                let thumb = document.querySelector(`img[ref-key='${key}']`);
                if (captionElement) {
                    // Remove existing figcaption
                    captionElement.remove();
                }
                if (thumb) {
                    let caption = thumb.getAttribute("alt");
                    if (caption) {
                        // Append new figcaption
                        let newCaption = document.createElement("figcaption");
                        newCaption.textContent = caption;
                        newCaption.classList.add("w-lightbox-caption");
                        figure.appendChild(newCaption);
                    }
                }
            }
        }
    }
}
exports.Sa5LightboxCaptionHandler = Sa5LightboxCaptionHandler;
//# sourceMappingURL=caption-handler.js.map