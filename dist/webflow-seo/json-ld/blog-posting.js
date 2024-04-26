"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LdJsonBlogPosting = void 0;
const article_1 = require("./article");
class LdJsonBlogPosting extends article_1.LdJsonArticle {
    constructor() {
        super();
        this["@type"] = "BlogPosting";
    }
}
exports.LdJsonBlogPosting = LdJsonBlogPosting;
//# sourceMappingURL=blog-posting.js.map