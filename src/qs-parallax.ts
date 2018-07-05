interface Listener {
    isBelowBreakpoint?: boolean;
    progress?: number;
}

enum ListenerTypes {
    Breakpoint,
    Progress,
}

export interface Options {
    scrollTarget?: HTMLElement
}

export interface BreakpointListenerCallback {
    (isBelowBreakpoint: boolean, scrollTop: number): any;
}

export interface ProgressListenerCallback {
    (progress: number, scrollTop: number): any;
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

export class QSParallax {
    private isListening: boolean = false;
    private listeners: Array<Listener> = [];
    private options: Options = {
        scrollTarget: null
    };

    public addListener(listener: Listener) {
        this.listeners.push(listener);

        if (!this.isListening) {
            this.listenOnScroll();
        }

        this.checkPositions(true);
    }

    public clearListeners() {
        this.listeners = [];
    }

    public clearListener(listener: Listener) {
        this.listeners.forEach((registeredListener, index) => {
            if (registeredListener === listener) {
                this.listeners.splice(index, 1);
            }
        });
    }

    public setOptions(options: Options) {
        this.options = options;
    }

    private checkPositions(forceCallback = false) {
        const scrollTop = this.getScrollTop();
        
        this.listeners.forEach((listener, index) => {
            if (this.isBreakpointListener(listener)) {
                this.checkBreakpointListener(listener, index, scrollTop, forceCallback);
            } else if (this.isProgressListener(listener)) {
                this.checkProgressListener(listener, index, scrollTop, forceCallback);
            }
        });
    }

    private listenOnScroll() {
        this.isListening = true;

        const scrollTarget = this.options.scrollTarget ? this.options.scrollTarget : document;
        scrollTarget.addEventListener("scroll", () => {
            window.requestAnimationFrame(() => {
                this.checkPositions();
            });
        });
    }

    private checkBreakpointListener(listener: BreakpointListener, index: number, scrollTop: number, forceCallback: boolean) {
        if (listener.isBelowBreakpoint && scrollTop >= listener.position) {
            this.listeners[index].isBelowBreakpoint = false;
            listener.callback(true, scrollTop);
        } else if (!listener.isBelowBreakpoint && scrollTop < listener.position) {
            this.listeners[index].isBelowBreakpoint = true;
            listener.callback(false, scrollTop);
        } else if (forceCallback === true) {
            listener.callback(true, scrollTop);
        }
    }

    private checkProgressListener(listener: ProgressListener, index: number, scrollTop: number, forceCallback: boolean) {
        if ((scrollTop >= listener.startPosition && scrollTop <= listener.endPosition) || forceCallback === true) {
            let progress = (scrollTop - listener.startPosition) / (listener.endPosition - listener.startPosition);

            if (progress > 1) {
                progress = 1;
            } else if (progress < 0) {
                progress = 0;
            }

            this.listeners[index].progress = progress;
            listener.callback(progress, scrollTop);
        } else if (scrollTop > listener.endPosition && listener.progress < 1) {
            this.listeners[index].progress = 1;
            listener.callback(1, scrollTop);
        } else if (scrollTop < listener.startPosition && listener.progress > 0) {
            this.listeners[index].progress = 0;
            listener.callback(0, scrollTop);
        }
    }

    private getScrollTop(): number {
        if (this.options.scrollTarget === null) {
            return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        }

        return this.options.scrollTarget.scrollTop;
    }

    private isBreakpointListener(object: any): object is BreakpointListener {
        return object.hasOwnProperty("position");
    }

    private isProgressListener(object: any): object is ProgressListener {
        return object.hasOwnProperty("startPosition");
    }
}