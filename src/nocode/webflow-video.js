
/*
 * webflow-video
 * 
 * Sygnal Technology Group
 * http://sygnal.com
 * 
 * NO-CODE version, keys off of [wfu- ... ] attributes.
 */


$(function () {

    // Find poster video overrides and apply them
    $("div[wfu-data-poster-url]").each(function () {
        $(this).attr("data-poster-url",
            $(this).attr("wfu-data-poster-url")
        );
    });

});
