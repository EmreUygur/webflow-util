"use strict";
/*
 * webflow-table-helper
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * LO-CODE Helper class to simplify table functions.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTableFromGoogleSheet = void 0;
const webflow_data_js_1 = require("../modules/webflow-data.js");
const webflow_table_js_1 = require("../modules/webflow-table.js");
const google_sheet_data_js_1 = require("../datasources/google-sheet-data.js");
var renderTableFromGoogleSheet = function (elem, googleSheetId) {
    // Construct Google Sheet CSV URL
    const url = (0, google_sheet_data_js_1.getGoogleSheetCsvUrl)(googleSheetId);
    // Instantiate Webflow Table util
    //    var webflowTableUtil = new WebflowTableUtil({
    //        logging: true, // enable logging to console
    ////        csvFile: 'https://docs.google.com/spreadsheets/d/16lPOiFz5Ow-FTro5SWS-m00fNhRjgsiyeSBdme3gKX0/export?format=csv',
    //    });
    // Retrieve CSV and convert to JSON
    var data = (0, webflow_data_js_1.getCsvAsData)(url);
    // Create HTML table
    (0, webflow_table_js_1.renderTableFromData)(elem, data);
};
exports.renderTableFromGoogleSheet = renderTableFromGoogleSheet;
//# sourceMappingURL=webflow-table-helper.js.map