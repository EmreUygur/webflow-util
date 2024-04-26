"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LdJsonPerson = void 0;
class LdJsonPerson {
    constructor(name = undefined, url = undefined) {
        this["@type"] = "Person";
        this.name = name;
        this.url = url;
    }
}
exports.LdJsonPerson = LdJsonPerson;
//# sourceMappingURL=person.js.map