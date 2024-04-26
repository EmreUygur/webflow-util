"use strict";
/*
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Creates a data source from a Webflow Collection list.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareCollectionListDataSource = void 0;
// import { Database } from '../modules/webflow-data.js';
const prepareCollectionListDataSource = (dataSource) => {
    // Aggregate JSON Data
    let data = dataSource.querySelectorAll('script');
    console.log(`items = ${data.length}`);
    let items = []; // place to store the pairs
    data.forEach((elem) => {
        items.push(elem.textContent || "");
    });
    let json = '[' + items.join() + ']';
    return JSON.parse(json);
};
exports.prepareCollectionListDataSource = prepareCollectionListDataSource;
//# sourceMappingURL=webflow-collectionlist-data.js.map