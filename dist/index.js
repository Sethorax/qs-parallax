import { QSParallax } from './qs-parallax';
var instance = null;
function getInstance() {
    if (instance === null) {
        instance = new QSParallax();
    }
    return instance;
}
export { QSParallax } from './qs-parallax';
export var addBreakpointListener = function (position, callback) {
    var listener = {
        position: position,
        callback: callback
    };
    getInstance().addListener(listener);
};
export var addProgressListener = function (startPosition, endPosition, callback) {
    var listener = {
        startPosition: startPosition,
        endPosition: endPosition,
        callback: callback
    };
    getInstance().addListener(listener);
};
export var clearListeners = function () {
    getInstance().clearListeners();
};
export var setOptions = function (options) {
    getInstance().setOptions(options);
};
//# sourceMappingURL=index.js.map