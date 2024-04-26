"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LdJsonWebPage = void 0;
const json_ld_base_1 = require("./json-ld-base");
const profile_page_1 = require("./profile-page");
class LdJsonWebPage extends json_ld_base_1.LdJsonBase {
    get publisher() {
        // Automatic, lazy instantiate
        if (!this._publisher)
            this._publisher = new profile_page_1.LdJsonProfilePage();
        return this._publisher;
    }
    set publisher(publisher) {
        this._publisher = publisher;
    }
    constructor(name = undefined) {
        super();
        this["@type"] = "WebPage";
        this.name = name;
    }
    toJSON() {
        return {
            "@content": "https://schema.org",
            "@type": this["@type"],
            name: this.name,
            description: this.description,
            publisher: this.publisher.toJSON(),
        };
    }
}
exports.LdJsonWebPage = LdJsonWebPage;
/*
<script type="application/ld+json">
{
"@context": "https://schema.org",
"@type": "WebSite",
"name": "Sygnal Technology Group",
"url": "https://www.sygnal.com/",
"potentialAction": {
  "@type": "SearchAction",
  "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.sygnal.com/search?query={query}"
  },
  "query-input": "required name=query"
}
}
</script>

*/
/*
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Sygnal Technology Group",
    "url": "https://www.sygnal.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.sygnal.com/search?query={query}"
      },
      "query-input": "required name=query"
    }
}
</script>
*/
//# sourceMappingURL=webpage.js.map