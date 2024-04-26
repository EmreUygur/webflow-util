"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LdJsonProfilePage = void 0;
class LdJsonProfilePage {
    constructor(name = undefined) {
        this["@type"] = "ProfilePage";
        this.name = name;
    }
    toJSON() {
        return {
            "@content": "https://schema.org",
            "@type": this["@type"],
            name: this.name,
        };
    }
}
exports.LdJsonProfilePage = LdJsonProfilePage;
//# sourceMappingURL=profile-page.js.map