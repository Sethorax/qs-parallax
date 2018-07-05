import { Options, BreakpointListenerCallback, ProgressListenerCallback } from './qs-parallax';
export { QSParallax } from './qs-parallax';
export declare const addBreakpointListener: (position: number, callback: BreakpointListenerCallback) => void;
export declare const addProgressListener: (startPosition: number, endPosition: number, callback: ProgressListenerCallback) => void;
export declare const clearListeners: () => void;
export declare const setOptions: (options: Options) => void;
