import { S } from "./selectorLibrary";
import { ImageFetcherModule as ImageFetcher } from "./imageFetcher";
import { EventBus } from "./eventBus";

var _updateOverlay = function(imgSrc, caption) {
    var $$overlay = document.querySelector('#overlay');
    var $$caption = $$overlay.querySelector('#overlay-title');
    var $$img = $$overlay.querySelector('#overlay-img');

    $$img.setAttribute('src', imgSrc);
    $$caption.textContent = caption;
};

var _bindThumbnailActions = function(e) {
    var $target = S(e.target);

    // check if target is img...
    if ($target.dom.tagName != 'IMG') {
        // TODO: hook up click to find the image
        return;
    }

    // nuke all c--current classes first
    var currentImages = document.querySelectorAll('#feed .c--current');
    for (var i = 0; i < currentImages.length; i++) {
        S(currentImages[i]).removeClass('c--current');
    }

    // setup next/previous with c--current
    S($target.dom.parentElement).addClass('c--current');

    // Update image in the overlay
    _updateOverlay($target.dom.dataset["lg"], $target.dom.parentElement.querySelector('.js-caption').textContent);

    // show the overlay
    S(document.querySelector('#overlay')).addClass('c--active');
};

var _bindOverlayActions = function(e) {
    var targetId = e.target.getAttribute('id');

    if (targetId !== 'overlay-next' && targetId !== 'overlay-prev' && targetId !== 'overlay-close') {
        return;
    }

    var $$currentImage = document.querySelector('#feed .c--current');
    // there's only 1 image in the overlay
    var $$overlayImage = document.querySelector('#overlay img');
    var $$advanceImage;

    if (targetId === 'overlay-next') {
        $$advanceImage = $$currentImage.nextSibling;
    } else if (targetId === 'overlay-prev') {
        $$advanceImage = $$currentImage.previousSibling;
    } else if (targetId === 'overlay-close') {
        // hide the overlay
        S(document.querySelector('#overlay')).removeClass('c--active');
        return;
    }

    if (!$$advanceImage) {
        return;
    }

    S($$currentImage).removeClass('c--current');
    S($$advanceImage).addClass('c--current');

    // change the overlay image
    _updateOverlay($$advanceImage.querySelector('img').dataset["lg"], $$advanceImage.querySelector('.js-caption').textContent);
};

var _subscribeToImages = function() {
    var $content = S('#feed');
    // bind overlay
    document.querySelector('#feed').addEventListener('click', _bindThumbnailActions);
    document.querySelector('#overlay').addEventListener('click', _bindOverlayActions);

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
            var $imageWrapper = S('<div class="c-block"></div>');
            var $image = S('<img class="c-image__img" src="' + thumbUrl + '" data-lg="' + lgUrl + '"/>');
            var $caption = S('<p class="c-images__caption js-caption">' + caption + '</p>');

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
