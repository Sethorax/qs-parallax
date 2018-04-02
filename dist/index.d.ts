interface Options {
    /**
     * Element which scroll position will be observed.  
     * Defaults to `document`
     * 
     * @type {HTMLElement}
     */
    scrollTarget: HTMLElement
}

/**
 * Adds a listener for a breakpoint.  
 * The callback function is called whenever the specified position is scrolled over.
 * 
 * @param {number} position
 * @param {(isBelowBreakpoint: boolean, scrollTop: number) => void} callback
 */
export function addBreakpointListener(position: number, callback: (isBelowBreakpoint: boolean, scrollTop: number) => void): void;

/**
 * Adds a listener for a progres between to positions.  
 * The callback function returns the current progress of how far the scroll top position is between the start and end position.
 * 
 * @param {number} startPosition 
 * @param {number} endPosition 
 * @param {(progress: number, scrollTop: number) => void} callback
 */
export function addProgressListener(startPosition: number, endPosition: number, callback: (progress: number, scrollTop: number) => void): void;

/**
 * Clear all listeners in the object.
 */
export function clearListeners(): void;

/**
 * Override a default option.  
 * Available options:  
 * - `scrollTarget`
 * 
 * @param {Options} newOptions 
 */
export function setOptions(newOptions: Options): void;