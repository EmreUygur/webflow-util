"use strict";
/*
 * SA5
 * webflow-finsweet | fs-load
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * For extensions to Finsweet's Load Attributes
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sa5FinsweetLoad = void 0;
window.fsAttributes = window.fsAttributes || [];
class Sa5FinsweetLoad {
    constructor(config = {}) {
        this.config = config;
    }
    sortRandom() {
        // Ensure listInstance is defined before attempting to access its properties
        if (!window.listInstance) {
            console.log('listInstance is not defined.');
            return;
        }
        const { items } = window.listInstance;
        console.log("items", items);
        // Function to shuffle array items in place
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                // Generate random index
                const j = Math.floor(Math.random() * (i + 1));
                // Swap elements array[i] and array[j]
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        // Shuffle the items array
        shuffleArray(items);
        // Assuming listInstance has a method named renderItems
        // The existence of listInstance is checked at the beginning of the sort function
        window.listInstance.renderItems();
    }
    init() {
        window.fsAttributes.push([
            'cmsload',
            (listInstances) => {
                console.log('cmsload Successfully loaded!');
                const [listInstance] = listInstances;
                // Assign listInstance to the window object
                window.listInstance = listInstance;
                // Call sort function
                this.sortRandom();
                // Assuming listInstance has an 'on' method; adjust types as necessary
                listInstance.on('renderitems', (renderedItems) => {
                    console.log("renderedItems", renderedItems);
                });
            },
        ]);
        // On DOM ready 
        document.addEventListener('DOMContentLoaded', () => {
            // Get the button element by its ID
            const sortButton = document.getElementById('sort');
            // Add a click event listener to the button if it exists
            sortButton?.addEventListener('click', this.sortRandom);
        });
    }
}
exports.Sa5FinsweetLoad = Sa5FinsweetLoad;
//# sourceMappingURL=fs-load.js.map