import { S } from "./selectorLibrary";
import { ImageFetcherModule as ImageFetcher } from "./imageFetcher";
import { EventBus } from "./eventBus";

var SelectorLibraryDemo = function() {
    var $printer = S('#printer');
    var $hi = S('<div>hi</div>');
    var $test = S('#testing');

    $printer.append($hi);
    $hi.append($test);

    console.log($printer.dom);
};

var EventBusDemo = function() {
    var eventBus = EventBus;
    var EVENT_IMAGES_UPDATED = eventBus.events.IMAGES_UPDATED;

    eventBus.subscribe(EVENT_IMAGES_UPDATED, function(data) {
        console.log('event received: ', data);
    });
};

var ImageFetcherDemo = function() {
    var url = 'http://infinigag.k3min.eu/';
    var category = 'hot';

    var imageFetcher = ImageFetcher(url, category);

    imageFetcher.getImages();
};

SelectorLibraryDemo();
EventBusDemo();
ImageFetcherDemo();
