var pubSub = (function (window) {
    var events = {};
    var _pubSub = function (id) {
        var callbacks, method,
            event = id && events[id];

        if (!event) {
            callbacks = $.Callbacks();
            event = {
                add: callbacks.add,
                remove: callbacks.remove,
                trigger: callbacks.fire
            }

            if (id) {
                events[id] = event;
            }
        }
        return event;
    }

    _pubSub.handleEvents = function (event) { // handle events with pub sub
        if (!_pubSub.handleEvents._cached_elements) _pubSub.handleEvents._cached_elements = [];
        var pubsub_data_name  = "pubsub-event-name",
            $target           = $(event.target),
            data_event        = $target.data(pubsub_data_name),
            event_name        = data_event || event.target.id,
            parent_with_event = $target.parents("[data-" + pubsub_data_name +"]", this)[0],
            parent_event      = (parent_with_event)?parent_with_event.getAttribute("data-" + pubsub_data_name):null;
        pubSub(event.type + "." + event_name).trigger(event.target, event);
        if (parent_event && parent_event !== data_event) pubSub(event.type + "." + parent_event).trigger(parent_with_event, event);
    }

    return _pubSub;
})(window);
