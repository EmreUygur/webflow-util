"use strict";
/*
 * webflow-element-lightbox
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Extensions to Webflow's lightbox element.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5Lightbox = void 0;
/**
 * Lightbox class.
 */
var defaultConfig = {};
class Sa5Lightbox {
    constructor(element, config = {}) {
        this._element = element;
        //        this.config = $.extend({}, defaultConfig, config);
    }
    init() {
        this.setCaptionToImageAlt();
    }
    setCaptionToImageAlt() {
        let imgElement = this._element.querySelector("img");
        let scriptElement = this._element.querySelector("script");
        // Set the caption to the image alt text
        if (imgElement && scriptElement) {
            const imageAltText = imgElement.getAttribute("alt");
            const imageJSON = JSON.parse(scriptElement.innerHTML);
            imageJSON.items[0].caption = imageAltText;
            scriptElement.innerHTML = JSON.stringify(imageJSON);
            // Apply ref key for caption retrieval
            imgElement.setAttribute("ref-key", imageJSON.items[0].url);
        }
        /*
        const imageAltText = $(lightboxElem).children("img").attr("alt");
        const script = $(lightboxElem).children("script");
        const imageJSON = JSON.parse(script.html());
        imageJSON.items[0].caption = imageAltText;
        script.html(JSON.stringify(imageJSON));
        
        // Apply ref key for caption retrieval
        $(lightboxElem).children("img").attr("ref-key", imageJSON.items[0].url);
*/
    }
}
exports.Sa5Lightbox = Sa5Lightbox;
//# sourceMappingURL=lightbox.js.map