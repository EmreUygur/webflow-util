
/*
 * webflow-elements
 * Lightbox
 * 
 * Sygnal Technology Group
 * http://sygnal.com
 * 
 * NO-CODE version.
 */


import { Sa5Lightbox } from '../webflow-core/lightbox';
import { Sa5LightboxCaptionHandler } from '../webflow-lightbox/caption-handler';


const init = () => { 

    /**
     * Init lightbox captions 
     */

    let useLightboxCaptionHandler = false;

    const elements = document.querySelectorAll('[wfu-lightbox-captions]') as NodeListOf<HTMLElement>; 
    useLightboxCaptionHandler = elements.length > 0;
    elements.forEach((element) => { 

        // Do something with each element
        const wfuLightbox = new Sa5Lightbox(element).init();

    });

    if(useLightboxCaptionHandler) {
        new Sa5LightboxCaptionHandler().init(); 
    }

    /**
     * Init lightbox CMS groups
     */

    let lightBoxCmsGroups = false;

    const groups = document.querySelectorAll('[wfu-lightbox-group]') as NodeListOf<HTMLElement>; 
    lightBoxCmsGroups = groups.length > 0;
    groups.forEach((element) => { 

        // Get the value of the wfu-lightbox-group attribute
        let groupValue = element.getAttribute("wfu-lightbox-group");

        // Find all descendant script elements with the class .w-json
        let scripts = element.querySelectorAll("script.w-json");

        // For each script
        scripts.forEach((script) => {
        // Parse the JSON
        let json = JSON.parse(script.textContent);

        // Update the group value
        json.group = groupValue;

        // Convert the JSON back to a string and update the script's content
        script.textContent = JSON.stringify(json, null, 2);
        });

    });

    // Re-initialize lightbox
    // to pick up new group names
    if(lightBoxCmsGroups) {
        var Webflow = Webflow || [];
        Webflow.push(function () {
            Webflow.require("lightbox").ready();
        });
    }
    
}
  
document.addEventListener("DOMContentLoaded", init)
  




