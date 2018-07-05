import { TYPE_BREAKPOINT, TYPE_PROGRESSIVE } from './constants/parallax-types';
import { assign } from './utils/index';

export const QSParallax = () => {
    let isListening = false;
    let listeners = [];

    const options = {
        scrollTarget: document
    };

    const checkPositions = (forceCallback = false) => {
        const scrollTop = (options.scrollTarget === document) ? window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0 : options.scrollTarget.scrollTop;

        listeners.forEach((options, index) => {
            if (options.type === TYPE_BREAKPOINT) {
                if (options.isBelowBreakpoint && scrollTop >= options.startPosition) {
                    listeners[index].isBelowBreakpoint = false;
                    options.callback(true, scrollTop);
                } else if (!options.isBelowBreakpoint && scrollTop < options.startPosition) {
                    listeners[index].isBelowBreakpoint = true;
                    options.callback(false, scrollTop);
                } else if (forceCallback === true) {
                    options.callback(true, scrollTop);
                }
            } else {
                if ((scrollTop >= options.startPosition && scrollTop <= options.endPosition) || forceCallback === true) {
                    let progress = (scrollTop - options.startPosition) / (options.endPosition - options.startPosition);
                    
                    if (progress > 1) {
                        progress = 1;
                    } else if (progress < 0) {
                        progress = 0;
                    }

                    listeners[index].progress = progress;
                    options.callback(progress, scrollTop);
                } else if (scrollTop > options.endPosition && options.progress < 1) {
                    listeners[index].progress = 1;
                    options.callback(1, scrollTop);
                } else if (scrollTop < options.startPosition && options.progress > 0) {
                    listeners[index].progress = 0;
                    options.callback(0, scrollTop);
                }
            }
        });
    };
    
    const listenOnScroll = () => {
        isListening = true;
        options.scrollTarget.addEventListener('scroll', () => window.requestAnimationFrame(checkPositions));
    };

    const addListener = (type, startPosition, endPosition, callback) => {
        listeners.push({
            isBelowBreakpoint: false,
            isTransitioning: false,
            startPosition,
            endPosition,
            callback,
            type
        });

        if (!isListening) listenOnScroll();
        checkPositions(true);
    };

    return {
        addBreakpointListener(position, callback) {
            addListener(TYPE_BREAKPOINT, position, null, callback);
        },

        addProgressListener(startPosition, endPosition, callback) {
            addListener(TYPE_PROGRESSIVE, startPosition, endPosition, callback);
        },

        clearListeners() {
            listeners = [];
        },

        setOptions(newOptions) {
            assign(options, newOptions);
        }
    };
};