import {
    QSParallax,
    Options,
    BreakpointListener,
    ProgressListener,
    BreakpointListenerCallback,
    ProgressListenerCallback
} from './qs-parallax';

let instance: QSParallax = null;

function getInstance(): QSParallax {
    if (instance === null) {
        instance = new QSParallax();
    }

    return instance;
}

export { QSParallax } from './qs-parallax';

export const addBreakpointListener = (position: number, callback: BreakpointListenerCallback) => {
    const listener: BreakpointListener = {
        position,
        callback
    };

    getInstance().addListener(listener);
};

export const addProgressListener = (startPosition: number, endPosition: number, callback: ProgressListenerCallback) => {
    const listener: ProgressListener = {
        startPosition,
        endPosition,
        callback
    };

    getInstance().addListener(listener);
};

export const clearListeners = () => {
    getInstance().clearListeners();
};

export const setOptions = (options: Options) => {
    getInstance().setOptions(options);
};