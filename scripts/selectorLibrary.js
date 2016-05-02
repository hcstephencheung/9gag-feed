// Simple selector library that just selects by ID
// We need this wrapper to create our own .append()
var SelectorLibrary = function(selector) {
    this.selector = selector || null;
    this.dom = null;
    this.isSelectorLibrary = true;
};

SelectorLibrary.prototype.init = function() {
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

SelectorLibrary.prototype.append = function(child) {
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
var S = function(selector) {
    var $obj = new SelectorLibrary(selector);
    $obj.init();
    return $obj;
};

export { S }
