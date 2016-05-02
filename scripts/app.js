import { S } from "./selectorLibrary";
import { ImageFetcherModule as ImageFetcher } from "./imageFetcher";
import { EventBus } from "./eventBus";

var run = function() {
    var $content = S('#printer');

    EventBus.subscribe(EventBus.events.IMAGES_UPDATED, function(data) {
        if (!data.length) {
            console.log('no images found!');
            return;
        }

        // cache for iteration
        var dataSize = data.length;
        for(var i = 0; i < dataSize - 1; i++) {
            var gagObj = data[i];

            var imgUrl = gagObj.images.small;
            var caption = gagObj.caption;
            var $imageWrapper = S('<div class="c-images"></div>');
            var $image = S('<img src="' + imgUrl + '"/>');
            var $caption = S('<p>' + caption + '</p>');

            // API currently only supports nodes to be appended to dom first
            // because append() doesn't change pointer to correct one in a
            // nested scenario
            $content.append($imageWrapper);
            $imageWrapper.append($image);
            $imageWrapper.append($caption);
        }

    });

    var url = 'http://infinigag.k3min.eu/';
    var category = 'hot';

    var imageFetcher = ImageFetcher(url, category);

    imageFetcher.getImages();
};

// let the fun begin!
run();
