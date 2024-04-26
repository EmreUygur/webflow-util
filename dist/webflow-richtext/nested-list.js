"use strict";
/*
 * webflow-html
 * Nested List
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5NestedList = void 0;
const globals_1 = require("../globals");
// Webflow breakpoints
class Sa5NestedList {
    constructor(listElement, config = null) {
        // Verify OL or UL
        this._element = listElement;
        this.config = config;
    }
    //#region Nested Lists
    /* processList
    * Parses markup in LI's to create nested lists
    * https://codepen.io/memetican/pen/vYjGbrd/8052e3c39d42e8c1e326b2f6ead371c5
    */
    processNestedList() {
        const content = this._element.innerHTML;
        const data = new DOMParser().parseFromString(content, 'text/html').body.childNodes;
        let items = [];
        // Create list of items, for nesting
        data.forEach((el, i) => {
            if (el.nodeName !== "LI")
                return; // skip
            if (el instanceof HTMLElement) {
                // Set defaults
                let item = {
                    indent: 1,
                    mode: '',
                    text: el.innerHTML?.trim() || ''
                };
                //console.log(item);
                // Parse / resolve item detail
                const LIST_DEPTH_LIMIT = 10;
                for (let j = 1; j < LIST_DEPTH_LIMIT; j++) {
                    if (item.text.startsWith("&gt;")) {
                        item.text = item.text.substring(4).trim(); // remove directive 
                        item.indent++;
                    }
                    else if (item.text.startsWith("+")) {
                        item.text = item.text.substring(1).trim(); // remove directive 
                        item.mode = "pro";
                    }
                    else if (item.text.startsWith("-")) {
                        item.text = item.text.substring(1).trim(); // remove directive 
                        item.mode = "con";
                    }
                    else {
                        break; // done
                    }
                }
                items.push(item);
            }
        });
        // Render HTML
        // Creates structured embedded list from the 
        // array data set. 
        // Usage:
        // items = [
        //     { indent: 1, mode: '', text: 'Level 1 Item 1' },
        //     { indent: 3, mode: '', text: 'Level 3 Item 1' },
        //     { indent: 3, mode: '', text: 'Level 3 Item 2' },
        //     { indent: 1, mode: '', text: 'Level 1 Item 2' },
        //     { indent: 2, mode: '', text: 'Level 2 Item 1' },
        // ];
        // Replace list entirely
        let listWrapper = document.createElement("div");
        listWrapper.setAttribute(globals_1.Sa5Attribute.ATTR_RICHTEXT_LIST_THEME // "wfu-list-theme"
        , this._element.getAttribute(globals_1.Sa5Attribute.ATTR_RICHTEXT_LIST_THEME // "wfu-list-theme"
        ) || "default");
        listWrapper.appendChild(this.createNestedListFromArray(this._element.nodeName, items));
        this._element.replaceWith(listWrapper
        //            this.createNestedListFromArray(this._element.nodeName, items)
        );
    }
    createNestedListFromArray(listElementType = 'UL', items) {
        // Create root list
        let root = document.createElement(listElementType);
        root.setAttribute("role", "list"); // every level? a11y 
        root.classList.add(`wfu-list-level-1`);
        // root.setAttribute("wfu-list-theme", 
        //     this._element.getAttribute("wfu-list-theme") || "default"
        //     );
        let currentParent = root;
        let parents = [root];
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const li = document.createElement('li');
            switch (item.mode) {
                case 'pro':
                    li.classList.add("wfu-pro");
                    break;
                case 'con':
                    li.classList.add("wfu-con");
                    break;
            }
            // Add item LI text
            // as SPAN 
            if (item.text) {
                let span = document.createElement("span");
                span.innerHTML = item.text;
                switch (item.mode) {
                    case 'pro':
                        span.classList.add("wfu-pro");
                        break;
                    case 'con':
                        span.classList.add("wfu-con");
                        break;
                }
                li.appendChild(span);
            }
            if (item.indent > parents.length) {
                for (let j = parents.length; j < item.indent; j++) {
                    // No LI children? create one 
                    if (!parents[j - 1].lastChild) {
                        const newLI = document.createElement("li");
                        parents[j - 1].appendChild(newLI);
                    }
                    // Create UL
                    const newUL = document.createElement(listElementType);
                    let newULparent = parents[j - 1].lastChild || parents[j - 1];
                    newUL.classList.add(`wfu-list-level-${j + 1}`);
                    newULparent.appendChild(newUL);
                    parents.push(newUL);
                }
            }
            else if (item.indent < parents.length) {
                parents = parents.slice(0, item.indent);
            }
            parents[parents.length - 1].appendChild(li);
        }
        return root;
    }
}
exports.Sa5NestedList = Sa5NestedList;
//# sourceMappingURL=nested-list.js.map