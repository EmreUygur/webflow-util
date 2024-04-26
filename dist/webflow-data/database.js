"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
class Database {
    constructor() {
        this.data = new Map();
        this.normalizeKey = function (key) {
            return key.toLowerCase();
        };
        // Add specified JSON document under key.
        this.add = function (key, json) {
            key = this.normalizeKey(key);
            // Convert string to JSON
            if (typeof json == 'string') {
                json = JSON.parse(json);
            }
            this.data.set(key, json);
        };
        this.getData = function (key) {
            key = this.normalizeKey(key);
            return this.data.get(key);
        };
        this.getDataSource = this.getData; // obsolete
        this.getCountOfRecords = function (dataSourceName) {
            return this.getDataSource(dataSourceName).length;
        };
        this.getDictionary = function (dataSourceName, keyField, valueField) {
            var dict = new Map();
            var ds = this.getDataSource(dataSourceName);
            //        console.log(ds);
            for (var i = 0; i < ds.length; i++) {
                //            console.log(`${0}: ${ds.length} ${ds[i].keyField} / ${ds[i].valueField}`);
                dict.set(ds[i][keyField], ds[i][valueField]);
            }
            console.log(dict);
            return dict;
        };
        this.getDictionaryFromRow = function (dataSourceName, row) {
            var dict = new Map();
            var ds = this.getDataSource(dataSourceName);
            for (const v in ds[row]) {
                dict.set(v, ds[row][v]);
            }
            return dict;
        };
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map