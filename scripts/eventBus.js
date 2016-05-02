// Use David Walsh's event bus model
var EventBus = (function() {
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

export { EventBus }
