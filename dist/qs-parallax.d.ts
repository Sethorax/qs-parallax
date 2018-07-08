export declare type BreakpointListenerCallback = (isBelowBreakpoint: boolean, scrollTop: number) => any;
export declare type ProgressListenerCallback = (progress: number, scrollTop: number) => any;
export interface Listener {
    isBelowBreakpoint?: boolean;
    progress?: number;
}
export interface Options {
    scrollTarget?: HTMLElement;
}
export interface BreakpointListener extends Listener {
    position: number;
    callback: BreakpointListenerCallback;
}
export interface ProgressListener extends Listener {
    startPosition: number;
    endPosition: number;
    callback: ProgressListenerCallback;
}
export declare class QSParallax {
    private isListening;
    private listeners;
    private options;
    addListener(listener: Listener): void;
    clearListeners(): void;
    clearListener(listener: Listener): void;
    setOptions(options: Options): void;
    private checkPositions;
    private listenOnScroll;
    private checkBreakpointListener;
    private checkProgressListener;
    private getScrollTop;
    private isBreakpointListener;
    private isProgressListener;
}
