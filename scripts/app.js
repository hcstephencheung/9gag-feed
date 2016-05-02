import { S } from "./selectorLibrary";
import { ImageFetcherModule as ImageFetcher } from "./imageFetcher";
import { EventBus } from "./eventBus";

var _bindThumbnailActions = function(e) {
    var $target = S(e.target);

    // check if target is img...
    if ($target.dom.tagName != 'IMG') {
        // TODO: hook up click to find the image
        return;
    }

    var $overlay = S('#overlay-image-container');
    var $largeImage = S('<img src="' + $target.dom.dataset["lg"] +'"/>');

    // $overlay.empty().append()...
    $overlay.dom.innerHTML = '';
    $overlay.append($largeImage);

    // nuke all c--current classes first
    var currentImages = document.querySelectorAll('#feed .c--current');
    for (var i = 0; i < currentImages.length; i++) {
        S(currentImages[i]).removeClass('c--current');
    }

    // setup next/previous with c--current
    S($target.dom.parentElement).addClass('c--current');
    // show the overlay
    $overlay.addClass('c--active');
};

var _bindOverlayActions = function(e) {
    var targetId = e.target.getAttribute('id');

    if (targetId !== 'overlay-next' && targetId !== 'overlay-prev') {
        return;
    }

    var $$currentImage = document.querySelector('#feed .c--current');
    // there's only 1 image in the overlay
    var $$overlayImage = document.querySelector('#overlay img');
    var $$advanceImage;

    if (targetId === 'overlay-next') {
        $$advanceImage = $$currentImage.nextSibling;
    } else {
        $$advanceImage = $$currentImage.previousSibling;
    }

    if (!$$advanceImage) {
        return;
    }

    S($$currentImage).removeClass('c--current');
    S($$advanceImage).addClass('c--current');

    // change the overlay image
    $$overlayImage.setAttribute('src', $$advanceImage.querySelector('img').dataset["lg"]);
};

var _subscribeToImages = function() {
    var $content = S('#feed');
    // bind overlay
    S('#feed').dom.addEventListener('click', _bindThumbnailActions);
    S('#overlay').dom.addEventListener('click', _bindOverlayActions);

    EventBus.subscribe(EventBus.events.IMAGES_UPDATED, function(data) {
        if (!data.length) {
            console.log('no images found!');
            return;
        }

        // cache for iteration
        var dataSize = data.length;
        for(var i = 0; i < dataSize - 1; i++) {
            var gagObj = data[i];

            var thumbUrl = gagObj.images.small;
            var lgUrl = gagObj.images.large;
            var caption = gagObj.caption;
            var $imageWrapper = S('<div class="c-images"></div>');
            var $image = S('<img src="' + thumbUrl + '" data-lg="' + lgUrl + '"/>');
            var $caption = S('<p>' + caption + '</p>');

            // API currently only supports nodes to be appended to dom first
            // because append() doesn't change pointer to correct one in a
            // nested scenario
            $content.append($imageWrapper);
            $imageWrapper.append($image);
            $imageWrapper.append($caption);
        }
    });
};

var _initImageFetch = function() {
    var url = 'http://infinigag.k3min.eu/';
    var category = 'hot';

    var imageFetcher = ImageFetcher(url, category);

    imageFetcher.getImages();
};

var run = function() {
    _subscribeToImages();
    _initImageFetch();
};

// let the fun begin!
run();
