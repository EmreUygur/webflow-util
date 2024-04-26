"use strict";
/*
 * webflow-seo
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Core Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LdJsonArticle = exports.LdJsonPerson = exports.LdJsonWebSite = exports.LdJsonSearchAction = exports.LdJsonEntryPoint = void 0;
function formatDate(date) {
    if (!(date || undefined))
        return undefined;
    return new Date(date); //.toISOString().split('T')[0]
}
/*
 * EXPERIMENTAL.
 */
class LdJsonEntryPoint {
    // Initialize
    constructor(urlTemplate = undefined) {
        // Save the label, for console logging
        this["@type"] = "EntryPoint";
        this.urlTemplate = urlTemplate;
    }
}
exports.LdJsonEntryPoint = LdJsonEntryPoint;
window["LdJsonEntryPoint"] = LdJsonEntryPoint;
class LdJsonSearchAction {
    constructor(queryInput = undefined) {
        this["@context"] = "https://schema.org";
        this["@type"] = "SearchAction";
        this.queryInput = queryInput;
        this.target = new LdJsonEntryPoint();
    }
}
exports.LdJsonSearchAction = LdJsonSearchAction;
window["LdJsonSearchAction"] = LdJsonSearchAction;
/*
export class LdJsonArticle1 {

    headline;
    alternativeHeadline;
    image;
    author;
    url;

    description;
    articleBody;
 
    datePublished;
    dateCreated;
    dateModified;
  
    constructor(headline = undefined, url = undefined) {
        
    //    this["@context"] = "https://schema.org";
        this["@type"] = "Article"; // Article | TechArticle | BlogPosting
        this.headline = headline;
        this.url = url;
    }

    toJSON() {
        return {
        
            "@content": "https://schema.org",
            "@type": this["@type"], // "Article",
            
            headline: this.headline,
            url: this.url,
//            potentialAction: this.potentialAction,
            
        }
    }

    generate() {
        
    //      var jsonLD = { ...this };
        
    //    console.log(JSON.stringify(jsonLD, null, 2));
        
        console.log(JSON.stringify(this, null, 2));
        
        // <script type="application/ld+json">
        const template = document.createElement('script');
        template.setAttribute("type", "application/ld+json");
        template.innerHTML = JSON.stringify(this, null, 2);
        document.body.appendChild(template);
        
    }

}
*/
class LdJsonWebSite {
    constructor(name = undefined, url = undefined) {
        //    this["@context"] = "https://schema.org"; 
        this["@type"] = "WebSite"; // Article | TechArticle | BlogPosting
        this.name = name;
        this.url = url;
    }
    toJSON() {
        return {
            "@content": "https://schema.org",
            "@type": this["@type"],
            name: this.name,
            url: this.url,
            potentialAction: this.potentialAction,
        };
    }
    generate() {
        //      var jsonLD = { ...this };
        //    console.log(JSON.stringify(jsonLD, null, 2));
        console.log(JSON.stringify(this, null, 2));
        // <script type="application/ld+json">
        const template = document.createElement('script');
        template.setAttribute("type", "application/ld+json");
        template.innerHTML = JSON.stringify(this, null, 2);
        document.body.appendChild(template);
    }
}
exports.LdJsonWebSite = LdJsonWebSite;
window["LdJsonWebSite"] = LdJsonWebSite;
class LdJsonPerson {
    constructor(name = undefined, url = undefined) {
        this["@type"] = "Person";
        this.name = name;
        this.url = url;
    }
}
exports.LdJsonPerson = LdJsonPerson;
window["LdJsonPerson"] = LdJsonPerson;
// export 
class LdJsonArticle {
    // set image ( , fallback)
    // set fallback image if null
    constructor() {
        //    this.headline = 'x';
        this.author = [];
        this.addAuthor = function (name = undefined, url = undefined) {
            this.author.push(new LdJsonPerson(name, url));
        };
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
        this.setFallbackImage = function (url) {
            this.image = this.image || url; // nullish coalesce
        };
        this.generate = function () {
            //      var jsonLD = { ...this };
            //    console.log(JSON.stringify(jsonLD, null, 2));
            console.log(JSON.stringify(this, null, 2));
            // <script type="application/ld+json">
            const template = document.createElement('script');
            template.setAttribute("type", "application/ld+json");
            template.textContent = JSON.stringify(this, null, 2);
            document.head.appendChild(template);
            console.log("appended.");
        };
        this["@type"] = "Article"; // Article | TechArticle | BlogPosting
        // https://stackoverflow.com/questions/22156326/private-properties-in-javascript-es6-classes 
    }
    toJSON() {
        return {
            "@context": "https://schema.org",
            "@type": "Article",
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
            dateCreated: formatDate(this.dateCreated),
            dateModified: formatDate(this.dateModified),
            datePublished: formatDate(this.datePublished),
            description: this.description,
            articleBody: this.articleBody
        };
    }
}
exports.LdJsonArticle = LdJsonArticle;
window["LdJsonArticle"] = LdJsonArticle;
//# sourceMappingURL=webflow-seo.js.map