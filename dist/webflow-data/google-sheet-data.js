"use strict";
/*
 * google-sheet-data
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Extracts information from Google Sheets, and returns as JSON
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleSheetDataUrl = exports.getGoogleSheetData = exports.getGoogleSheetCsvUrl = void 0;
//import { csvToData } from '../modules/webflow-data.js';
//import { csvToObjects } from '../modules/webflow-data-csv.js';
// import { getCsvAsData } from '../modules/webflow-data.js';
/*
export var loadGoogleSheetFromSpec = function (spec) {

    switch (spec.version) {
        default:
        case "1":

            return getCsvAsData(spec.url);
//            return getGoogleSheetDataUrl(spec.url);

            break;
    }
//    console.log(spec);

    // Validate spec
    // TODO: cast to options-style object?

//    spec.url
}
*/
// Returns a Url to retrieve the CSV version of a Google Sheet
// The sheet must be publicly accessible.
var getGoogleSheetCsvUrl = function (id) {
    return `https://docs.google.com/spreadsheets/d/${id}/export?format=csv`;
};
exports.getGoogleSheetCsvUrl = getGoogleSheetCsvUrl;
// Returns all data as JSON from Sheet1
var getGoogleSheetData = function (id) {
    return new Promise((resolve, reject) => {
        var url = (0, exports.getGoogleSheetCsvUrl)(id);
        console.log(url);
        var json = getCsvAsData((0, exports.getGoogleSheetCsvUrl)(id));
        resolve(json);
    });
};
exports.getGoogleSheetData = getGoogleSheetData;
// Returns all data as JSON from Sheet1
var getGoogleSheetDataUrl = function (url) {
    return new Promise((resolve, reject) => {
        console.log(url);
        var json = getCsvAsData(url);
        resolve(json);
    });
};
exports.getGoogleSheetDataUrl = getGoogleSheetDataUrl;
//# sourceMappingURL=google-sheet-data.js.map