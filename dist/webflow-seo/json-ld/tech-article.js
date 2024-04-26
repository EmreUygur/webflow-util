"use strict";
/**
 * according to schema.org it is meant for “How-to (task) topics, step-by-step, procedural troubleshooting, specifications, etc.” It validates just fine on Google’s Structured Data Testing Tool, and we are really excited to see what type of results it can yield.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LdJsonTechArticle = void 0;
const article_1 = require("./article");
class LdJsonTechArticle extends article_1.LdJsonArticle {
    constructor() {
        super();
        this["@type"] = "TechArticle";
    }
}
exports.LdJsonTechArticle = LdJsonTechArticle;
//# sourceMappingURL=tech-article.js.map