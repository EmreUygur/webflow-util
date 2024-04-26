"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LdJsonNewsArticle = void 0;
const article_1 = require("./article");
class LdJsonNewsArticle extends article_1.LdJsonArticle {
    constructor() {
        super();
        // https://developers.google.com/search/docs/appearance/structured-data/article
        this["@type"] = "NewsArticle";
    }
}
exports.LdJsonNewsArticle = LdJsonNewsArticle;
//# sourceMappingURL=news-article.js.map