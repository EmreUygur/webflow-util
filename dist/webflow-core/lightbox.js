(() => {
  // src/webflow-core/lightbox.ts
  var WfuLightbox = class {
    constructor(element, config = {}) {
      this._element = element;
    }
    init() {
      let imgElement = this._element.querySelector("img");
      let scriptElement = this._element.querySelector("script");
      if (imgElement && scriptElement) {
        const imageAltText = imgElement.getAttribute("alt");
        const imageJSON = JSON.parse(scriptElement.innerHTML);
        imageJSON.items[0].caption = imageAltText;
        scriptElement.innerHTML = JSON.stringify(imageJSON);
        imgElement.setAttribute("ref-key", imageJSON.items[0].url);
      }
    }
  };
})();
//# sourceMappingURL=lightbox.js.map
