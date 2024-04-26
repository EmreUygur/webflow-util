"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LdJsonCourse = void 0;
const json_ld_base_1 = require("./json-ld-base");
const organization_1 = require("./organization");
class LdJsonCourse extends json_ld_base_1.LdJsonBase {
    constructor() {
        super();
        this.provider = new organization_1.LdJsonOrganization();
        this["@type"] = "Course";
    }
    // addAuthor = function (name = undefined, url = undefined) {
    //     this.author.push (new LdJsonPerson(name, url)); 
    // }
    toJSON() {
        return {
            "@context": "https://schema.org",
            "@type": this["@type"],
            name: this.name,
            description: this.description,
            provider: this.provider || undefined,
        };
    }
}
exports.LdJsonCourse = LdJsonCourse;
//# sourceMappingURL=course.js.map