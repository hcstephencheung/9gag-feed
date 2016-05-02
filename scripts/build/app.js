(function() {
    "use strict";
    var $$selectorLibrary$$SelectorLibrary = function(selector) {
        this.selector = selector || null;
        this.dom = null;
        this.isSelectorLibrary = true;
    };

    $$selectorLibrary$$SelectorLibrary.prototype.init = function() {
        var selectorObj = this;
        // jQuery's simple way to check for HTML strings
        var rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
        var selector = selectorObj.selector;
        var match;

        if (!selector) {
            return this;
        }

        // Shamelessly "paraphrase" jquery selector library
        // selector strings
        if (typeof selector === 'string') {
            // TODO: add validation code, but for now
            // let's assume if selector string has open/end tags, then
            // we want to create a new DOM element
            if (selector[0] === "<" && selector[selector.length - 1] === ">") {
                selectorObj.dom = document.createDocumentFragment();

                var childNode = document.createElement('div');
                childNode.innerHTML = selector;

                selectorObj.dom.appendChild(childNode.firstChild);

                return;
            // Select an existing element
            } else {
                match = rquickExpr.exec( selector );

                if (match[2]) {
                    selectorObj.dom = document.getElementById(match[2]);
                }
            }
        // case: $(DOMElem)
        } else if (selector.nodeType) {
            selectorObj.dom = selector;
        } else {
            console.log('Selector init failed: Invalid selector', selector);
        }

        return;
    };

    $$selectorLibrary$$SelectorLibrary.prototype.append = function(child) {
        var html;
        var childNode;

        // TODO: refactor to use instanceof to check type
        // http://stackoverflow.com/questions/1919295/can-i-set-the-type-of-a-javascript-object
        if (child.isSelectorLibrary) {
            childNode = child.dom;
        } else {
            childNode = child;
        }

        if (typeof childNode === 'string') {
            // TODO: add HTML validation code
            html = childNode;

        } else if (childNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            var children = childNode;

            this.dom.appendChild(childNode);

            // TODO: add some validation for non-single element append
            child.dom = this.dom.lastChild;

        } else if (childNode.nodeType) {
            this.dom.appendChild(childNode);
        } else {
            console.log('Append failed: invalid argument', child);
        }

        return;
    };

    // Creates a wrapper around selected element
    var $$selectorLibrary$$S = function(selector) {
        var $obj = new $$selectorLibrary$$SelectorLibrary(selector);
        $obj.init();
        return $obj;
    };

    var $$eventBus$$EventBus = (function() {
        var topics = {};
        var hOP = topics.hasOwnProperty;

        var _subscribe = function(topic, listener) {
            if (!hOP.call(topics, topic)) {
                topics[topic] = [];
            }

            // Add listener to event queue
            var index = topics[topic].push(listener) - 1;

            return {
                remove: function() {
                    delete topics[topic][index];
                }
            };
        };

        var _publish = function(topic, info) {
            // if can't find handler for event name, return
            if (!hOP.call(topics, topic)) {
                return;
            }

            topics[topic].forEach(function(handler) {
                handler(info != undefined ? info : {});
            });
        };

        var _events = {
            IMAGES_UPDATED: 'images:updated'
        };

        return {
            subscribe: _subscribe,
            publish: _publish,
            events: _events
        };
    })();

    var $$imageFetcher$$ImageFetcher = function(url, query) {
        var eventBus = $$eventBus$$EventBus;
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

    var $$imageFetcher$$ImageFetcherModule = function(url, query) {
        return $$imageFetcher$$ImageFetcher(url, query);
    };

    var app$$run = function() {
        var $content = $$selectorLibrary$$S('#printer');

        $$eventBus$$EventBus.subscribe($$eventBus$$EventBus.events.IMAGES_UPDATED, function(data) {
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
                var $imageWrapper = $$selectorLibrary$$S('<div class="c-images"></div>');
                var $image = $$selectorLibrary$$S('<img src="' + imgUrl + '"/>');
                var $caption = $$selectorLibrary$$S('<p>' + caption + '</p>');

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

        var imageFetcher = $$imageFetcher$$ImageFetcherModule(url, category);

        imageFetcher.getImages();
    };

    // let the fun begin!
    app$$run();
}).call(this);

//# sourceMappingURL=app.js.map