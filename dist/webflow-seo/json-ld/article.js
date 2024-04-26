"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LdJsonArticle = void 0;
const json_ld_base_1 = require("./json-ld-base");
const person_1 = require("./person");
class LdJsonArticle extends json_ld_base_1.LdJsonBase {
    // set image ( , fallback)
    // set fallback image if null
    constructor() {
        super();
        // "author": [{
        //     "@type": "Person",
        //     "name": "Jane Doe",
        //     "url": "https://example.com/profile/janedoe123"
        //   },{
        //     "@type": "Person",
        //     "name": "John Doe",
        //     "url": "https://example.com/profile/johndoe123"
        // }]
        this.author = [];
        this.addAuthor = function (name = undefined, url = undefined) {
            this.author.push(new person_1.LdJsonPerson(name, url));
        };
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
        this.setFallbackImage = function (url) {
            this.image = this.image || url; // nullish coalesce
        };
        //    this.headline = 'x';
        this["@type"] = "Article"; // Article | TechArticle | BlogPosting
        // https://stackoverflow.com/questions/22156326/private-properties-in-javascript-es6-classes 
    }
    toJSON() {
        return {
            "@context": "https://schema.org",
            "@type": this["@type"],
            headline: this.headline,
            dependencies: this.dependencies,
            proficiencyLevel: this.proficiencyLevel || undefined,
            alternativeHeadline: this.alternativeHeadline,
            image: this.image,
            author: this.author,
            award: this.award,
            editor: this.editor,
            genre: this.genre,
            keywords: this.keywords,
            wordcount: this.wordcount,
            publisher: this.publisher,
            url: this.url,
            dateCreated: this.formatDate(this.dateCreated),
            dateModified: this.formatDate(this.dateModified),
            datePublished: this.formatDate(this.datePublished),
            description: this.description,
            articleBody: this.articleBody
        };
    }
}
exports.LdJsonArticle = LdJsonArticle;
//# sourceMappingURL=article.js.map