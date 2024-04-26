"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LdJsonWebSite = void 0;
const json_ld_base_1 = require("./json-ld-base");
class LdJsonWebSite extends json_ld_base_1.LdJsonBase {
    constructor(name = undefined, url = undefined) {
        super();
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
}
exports.LdJsonWebSite = LdJsonWebSite;
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
//# sourceMappingURL=website.js.map