"use strict";
/*
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Designed to aggregate JSON excerpts produced by a Webflow Collection List
 * into a single JSON datasource, for use in other places, such as Form Select data-binding.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataSource = void 0;
// Amalgamates from internally tagged DIVs
var getDataSource = function (name) {
    // Aggregate JSON Data
    let data = document.querySelectorAll('*[data="' + name + '"]');
    let items = []; // place to store the pairs
    data.forEach((elem) => {
        //loop over the keys
        items.push(elem.textContent || "");
    });
    let json = "[" + items.join() + "]";
    return JSON.parse(json);
};
exports.getDataSource = getDataSource;
//# sourceMappingURL=webflow-data-collectionlist.js.map