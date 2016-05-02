import { EventBus } from "./eventBus";

var ImageFetcher = function(url, query) {
    var eventBus = EventBus;
    var EVENT_IMAGES_UPDATED = eventBus.events.IMAGES_UPDATED;
    var xhttp = new XMLHttpRequest();

    var srcUrl = url;
    var srcQuery = query;

    var getImages = function() {

        xhttp.onreadystatechange = function() {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                var data = JSON.parse(xhttp.responseText);

                console.log(data.data);
                eventBus.publish(EVENT_IMAGES_UPDATED, data.data);
            }
        };

        // refactor this into a getConnection() from a http module
        xhttp.open('POST', srcUrl, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(srcQuery);
    };

    return {
        getImages: getImages
    };
};

var ImageFetcherModule = function(url, query) {
    return ImageFetcher(url, query);
};

export { ImageFetcherModule }
