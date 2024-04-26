"use strict";
/*
 * SA5
 * Sygnal Technology Group
 * sa5-data
 *
 * Creates a data source from SA5 data.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5Data = void 0;
// import { Database } from '../modules/webflow-data.js';
const globals_1 = require("../globals");
class Sa5Data {
    constructor(elem) {
        this.elem = elem;
        this.init();
    }
    init() {
        // Verify node type
        if (this.elem.nodeName != "SCRIPT") {
            console.error("Invalid element for Sa5Data. Must be a SCRIPT element.", this.elem);
            return;
        }
        // Verify type
        this.type = this.elem.getAttribute("type");
        if (this.type != globals_1.Sa5ScriptType.SCRIPT_TYPE_SA5_DATA_ITEM) {
            console.error("Invalid element type for Sa5Data.", this.elem);
            return;
        }
        let data = this.elem.innerText;
        this.value = this.parse(data);
    }
    parse(content) {
        const root = {};
        const stack = [root];
        const lines = content.split('\n');
        let currentKey = null;
        let currentType = 'string';
        let currentValue = null;
        let isMultiLineValue = false;
        for (let line of lines) {
            const indentation = line.search(/\S/);
            line = line.trim();
            // Skip empty lines
            if (!line)
                continue;
            // Adjust the stack based on indentation
            while (stack.length - 1 > indentation) {
                stack.pop();
            }
            if (isMultiLineValue) {
                if (line.endsWith('>')) {
                    currentValue += '\n' + line.slice(0, -1); // Exclude the closing '>'
                    if (currentKey !== null && currentValue !== null) {
                        stack[stack.length - 1][currentKey] = currentValue || null;
                    }
                    isMultiLineValue = false;
                    currentValue = null;
                    currentKey = null;
                    currentType = 'string';
                    continue;
                }
                else {
                    currentValue += '\n' + line;
                    continue;
                }
            }
            const delimiterMatch = line.match(/:(\$|#|\?|:|)/);
            if (!delimiterMatch)
                continue;
            const delimiter = delimiterMatch[1];
            const parts = line.split(delimiterMatch[0]);
            const key = parts[0].trim();
            let value = parts.slice(1).join(':').trim();
            // Determine the type based on the delimiter
            switch (delimiter) {
                case '':
                case '$':
                    if (value.startsWith('<') && !value.endsWith('>')) {
                        isMultiLineValue = true;
                        currentKey = key;
                        currentValue = value.slice(1); // Exclude the starting '<'
                        continue;
                    }
                    else if (value.startsWith('<') && value.endsWith('>')) {
                        value = value.slice(1, -1); // Exclude both the starting '<' and closing '>'
                    }
                    value = value || null;
                    break;
                case '#':
                    value = value ? parseFloat(value) : null;
                    break;
                case '?':
                    value = value ? value.toLowerCase() === 'true' : null;
                    break;
                case ':': // Nested object
                    const newObj = {};
                    stack[stack.length - 1][key] = newObj;
                    stack.push(newObj);
                    continue; // Skip further processing for this line since it's a nested object indicator
            }
            stack[stack.length - 1][key] = value;
        }
        return root;
    }
}
exports.Sa5Data = Sa5Data;
//# sourceMappingURL=sa5-data.js.map