var QSParallax = /** @class */ (function () {
    function QSParallax() {
        this.isListening = false;
        this.listeners = [];
        this.options = {
            scrollTarget: null
        };
    }
    QSParallax.prototype.addListener = function (listener) {
        this.listeners.push(listener);
        if (!this.isListening) {
            this.listenOnScroll();
        }
        this.checkPositions(true);
    };
    QSParallax.prototype.clearListeners = function () {
        this.listeners = [];
    };
    QSParallax.prototype.clearListener = function (listener) {
        var _this = this;
        this.listeners.forEach(function (registeredListener, index) {
            if (registeredListener === listener) {
                _this.listeners.splice(index, 1);
            }
        });
    };
    QSParallax.prototype.setOptions = function (options) {
        this.options = options;
    };
    QSParallax.prototype.checkPositions = function (forceCallback) {
        var _this = this;
        if (forceCallback === void 0) { forceCallback = false; }
        var scrollTop = this.getScrollTop();
        this.listeners.forEach(function (listener, index) {
            if (_this.isBreakpointListener(listener)) {
                _this.checkBreakpointListener(listener, index, scrollTop, forceCallback);
            }
            else if (_this.isProgressListener(listener)) {
                _this.checkProgressListener(listener, index, scrollTop, forceCallback);
            }
        });
    };
    QSParallax.prototype.listenOnScroll = function () {
        var _this = this;
        this.isListening = true;
        var scrollTarget = this.options.scrollTarget ? this.options.scrollTarget : document;
        scrollTarget.addEventListener("scroll", function () {
            window.requestAnimationFrame(function () {
                _this.checkPositions();
            });
        });
    };
    QSParallax.prototype.checkBreakpointListener = function (listener, index, scrollTop, forceCallback) {
        if (listener.isBelowBreakpoint && scrollTop >= listener.position) {
            this.listeners[index].isBelowBreakpoint = false;
            listener.callback(true, scrollTop);
        }
        else if (!listener.isBelowBreakpoint && scrollTop < listener.position) {
            this.listeners[index].isBelowBreakpoint = true;
            listener.callback(false, scrollTop);
        }
        else if (forceCallback === true) {
            listener.callback(true, scrollTop);
        }
    };
    QSParallax.prototype.checkProgressListener = function (listener, index, scrollTop, forceCallback) {
        if ((scrollTop >= listener.startPosition && scrollTop <= listener.endPosition) || forceCallback === true) {
            var progress = (scrollTop - listener.startPosition) / (listener.endPosition - listener.startPosition);
            if (progress > 1) {
                progress = 1;
            }
            else if (progress < 0) {
                progress = 0;
            }
            this.listeners[index].progress = progress;
            listener.callback(progress, scrollTop);
        }
        else if (scrollTop > listener.endPosition && listener.progress < 1) {
            this.listeners[index].progress = 1;
            listener.callback(1, scrollTop);
        }
        else if (scrollTop < listener.startPosition && listener.progress > 0) {
            this.listeners[index].progress = 0;
            listener.callback(0, scrollTop);
        }
    };
    QSParallax.prototype.getScrollTop = function () {
        if (this.options.scrollTarget === null) {
            return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        }
        return this.options.scrollTarget.scrollTop;
    };
    QSParallax.prototype.isBreakpointListener = function (object) {
        return object.hasOwnProperty("position");
    };
    QSParallax.prototype.isProgressListener = function (object) {
        return object.hasOwnProperty("startPosition");
    };
    return QSParallax;
}());
export { QSParallax };
//# sourceMappingURL=qs-parallax.js.map