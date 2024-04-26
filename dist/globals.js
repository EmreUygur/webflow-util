"use strict";
/**
 * SA5 Globals
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5Attribute = exports.Sa5ScriptType = exports.Sa5GlobalEvent = exports.Sa5GlobalVar = void 0;
var Sa5GlobalVar;
(function (Sa5GlobalVar) {
    Sa5GlobalVar["GLOBAL_ROUTE"] = "sa5-route";
})(Sa5GlobalVar = exports.Sa5GlobalVar || (exports.Sa5GlobalVar = {}));
var Sa5GlobalEvent;
(function (Sa5GlobalEvent) {
    Sa5GlobalEvent["EVENT_USER_CHANGED"] = "userInfoChanged";
    Sa5GlobalEvent["EVENT_DATASTORE_LOADED"] = "datastoreLoaded";
    Sa5GlobalEvent["EVENT_SLIDE_CHANGED"] = "slideChanged";
    Sa5GlobalEvent["EVENT_TAB_CHANGED"] = "tabChanged";
    Sa5GlobalEvent["EVENT_VIDEO_PLAYER_STATE_CHANGE"] = "playerStateChange";
})(Sa5GlobalEvent = exports.Sa5GlobalEvent || (exports.Sa5GlobalEvent = {}));
var Sa5ScriptType;
(function (Sa5ScriptType) {
    Sa5ScriptType["SCRIPT_TYPE_DATA_ITEM"] = "wfu-data-item";
    Sa5ScriptType["SCRIPT_TYPE_SA5_DATA_ITEM"] = "sygnal/sa5-data";
})(Sa5ScriptType = exports.Sa5ScriptType || (exports.Sa5ScriptType = {}));
var Sa5Attribute;
(function (Sa5Attribute) {
    function getBracketed(attr) {
        return `[${attr}]`;
    }
    Sa5Attribute.getBracketed = getBracketed;
})(Sa5Attribute = exports.Sa5Attribute || (exports.Sa5Attribute = {}));
(function (Sa5Attribute) {
    // Core
    Sa5Attribute["ATTR_CORE_SCRIPT_INJECT"] = "wfu-script-load";
    // Video
    Sa5Attribute["ATTR_VIDEO"] = "wfu-video";
    Sa5Attribute["ATTR_VIDEO_YOUTUBE_NOREL"] = "wfu-youtube-norel";
    Sa5Attribute["ATTR_VIDEO_DATA_POSTER_URL"] = "wfu-data-poster-url";
    // Designer
    Sa5Attribute["ATTR_DESIGN"] = "wfu-design";
    // Elements
    Sa5Attribute["ATTR_ELEMENT_SLIDER"] = "wfu-slider";
    Sa5Attribute["ATTR_ELEMENT_SLIDE_NAME"] = "wfu-slide-name";
    Sa5Attribute["ATTR_ELEMENT_TABS"] = "wfu-tabs";
    Sa5Attribute["ATTR_ELEMENT_TAB_NAME"] = "wfu-tab-name";
    Sa5Attribute["ATTR_ELEMENT_BUTTON"] = "wfu-button";
    Sa5Attribute["ATTR_BUTTON_ENABLED"] = "wfu-button-enabled";
    Sa5Attribute["ATTR_BUTTON_DISABLED_CLASS"] = "wfu-button-disabled-class";
    Sa5Attribute["ATTR_ELEMENT_DECK_TARGET"] = "wfu-deck-target";
    Sa5Attribute["ATTR_ELEMENT_DECK_ACTION"] = "wfu-deck-action";
    Sa5Attribute["ATTR_ELEMENT_DECK_ITEM"] = "wfu-deck-action-item";
    Sa5Attribute["ATTR_ELEMENT_DROPDOWN"] = "wfu-dropdown";
    Sa5Attribute["ATTR_ELEMENT_DROPDOWN_NAME"] = "wfu-dropdown-name";
    Sa5Attribute["ATTR_ELEMENT_DROPDOWN_INIT"] = "wfu-dropdown-init";
    Sa5Attribute["ATTR_ELEMENT_DROPDOWN_TYPE"] = "wfu-dropdown-type";
    // Data
    Sa5Attribute["ATTR_DATA"] = "wfu-data";
    Sa5Attribute["ATTR_DATA_TYPE"] = "wfu-data-type";
    Sa5Attribute["ATTR_DATA_DSN"] = "wfu-data-dsn";
    Sa5Attribute["ATTR_DATA_ITEM_ID"] = "wfu-data-item-id";
    // Data-binding
    Sa5Attribute["ATTR_DATABIND"] = "wfu-bind";
    Sa5Attribute["ATTR_DATABIND_CONTENT"] = "wfu-bind-content";
    Sa5Attribute["ATTR_DATABIND_CONTEXT_DSN"] = "wfu-bind-dsn";
    Sa5Attribute["ATTR_DATABIND_CONTEXT_ITEM_ID"] = "wfu-bind-item-id";
    // Pre-loaders
    Sa5Attribute["ATTR_PRELOAD"] = "wfu-preload";
    // Interactions
    Sa5Attribute["ATTR_IX_TRIGGER"] = "wfu-ix-trigger";
    Sa5Attribute["ATTR_IX_ID"] = "wfu-ix-id";
    // Sort
    Sa5Attribute["ATTR_SORT"] = "wfu-sort";
    Sa5Attribute["ATTR_SORT_DIR"] = "wfu-sort-dir";
    Sa5Attribute["ATTR_SORT_TYPE"] = "wfu-sort-type";
    Sa5Attribute["ATTR_SORT_KEY"] = "wfu-sort-key";
    // Filter
    Sa5Attribute["ATTR_FILTER"] = "wfu-filter";
    Sa5Attribute["ATTR_FILTER_MATCH"] = "wfu-filter-match";
    Sa5Attribute["ATTR_FILTER_EVAL"] = "wfu-filter-eval";
    Sa5Attribute["ATTR_FILTER_FUNC"] = "wfu-filter-func";
    // Hiding & Suppression
    Sa5Attribute["ATTR_HIDE"] = "wfu-hide";
    Sa5Attribute["ATTR_SUPPRESS"] = "wfu-suppress";
    // 404
    Sa5Attribute["ATTR_404_SEARCH"] = "wfu-404-search";
    // Forms
    Sa5Attribute["ATTR_FORM_HANDLER"] = "wfu-form-handler";
    Sa5Attribute["ATTR_FORM_MESSAGE"] = "wfu-form-message";
    Sa5Attribute["ATTR_FORM_IPINFO"] = "wfu-form-ipinfo";
    // Modals
    Sa5Attribute["ATTR_MODAL"] = "wfu-modal";
    Sa5Attribute["ATTR_MODAL_TRIGGER"] = "wfu-modal-trigger";
    Sa5Attribute["ATTR_MODAL_CLOSE"] = "wfu-modal-close";
    Sa5Attribute["ATTR_MODAL_CLOSE_TYPE"] = "wfu-modal-close-type";
    Sa5Attribute["ATTR_MODAL_SUPPRESS_DAYS"] = "wfu-modal-suppress-days";
    // Format
    Sa5Attribute["ATTR_FORMAT"] = "wfu-format";
    Sa5Attribute["ATTR_FORMAT_DATE"] = "wfu-format-date";
    Sa5Attribute["ATTR_FORMAT_HANDLER"] = "wfu-format-handler";
    Sa5Attribute["ATTR_FORMAT_MODE"] = "wfu-format-mode";
    Sa5Attribute["ATTR_FORMAT_SUFFIX"] = "wfu-format-suffix";
    // Countup
    Sa5Attribute["ATTR_COUNTUP"] = "wfu-countup";
    Sa5Attribute["ATTR_COUNTUP_TRIGGER"] = "wfu-countup-trigger";
    // Demo
    Sa5Attribute["ATTR_DEMO_LINK"] = "wfu-demo-link";
    // Lightboxes
    Sa5Attribute["ATTR_LIGHTBOX_CAPTIONS"] = "wfu-lightbox-captions";
    Sa5Attribute["ATTR_LIGHTBOX_GROUP"] = "wfu-lightbox-group";
    /**
     * SA5 HTML
     */
    // Decode
    Sa5Attribute["ATTR_DECODE"] = "wfu-decode";
    // Limits
    Sa5Attribute["ATTR_LIMIT_MULTIPLE"] = "wfu-limit-multiple";
    Sa5Attribute["ATTR_LIMIT_MULTIPLE_MIN"] = "wfu-limit-multiple-min";
    /**
     * SA5 User Accounts
     */
    Sa5Attribute["ATTR_SHOW_LOGGED_IN"] = "wfu-show-logged-in";
    Sa5Attribute["ATTR_HIDE_LOGGED_IN"] = "wfu-hide-logged-in";
    Sa5Attribute["ATTR_LOGIN_BUTTON"] = "wfu-login-button";
    /**
     * SA5 Richtext
     */
    Sa5Attribute["ATTR_RICHTEXT_LISTS"] = "wfu-lists";
    Sa5Attribute["ATTR_RICHTEXT_LIST_THEME"] = "wfu-list-theme";
    /**
     * SA5 URL
     */
    Sa5Attribute["ATTR_URL_RELATIVE_LINKS"] = "wfu-relative-links";
    Sa5Attribute["ATTR_URL_EXTERNAL_LINKS"] = "wfu-external-links";
    /**
     * SA5 UI
     */
    // Accordion
    Sa5Attribute["ATTR_UI_ACCORDION"] = "wfu-ui-accordion";
    // Rating
    Sa5Attribute["ATTR_RATING"] = "wfu-rating";
    // Github GIST
    Sa5Attribute["ATTR_GIST"] = "wfu-gist";
    Sa5Attribute["ATTR_GIST_COPY"] = "wfu-gist-copy";
    /**
     * SA5 Layout
     */
    Sa5Attribute["ATTR_LAYOUT"] = "wfu-layout";
    Sa5Attribute["ATTR_LAYOUT_HANDLER"] = "wfu-layout-handler";
    Sa5Attribute["ATTR_LAYOUT_TARGET"] = "wfu-layout-target";
    Sa5Attribute["ATTR_LAYOUT_ZONE"] = "wfu-layout-zone";
})(Sa5Attribute = exports.Sa5Attribute || (exports.Sa5Attribute = {}));
//# sourceMappingURL=globals.js.map