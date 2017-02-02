import { EventEmitter } from 'events';
import { TimeoutError } from './errors';

/**
 * Returns a promise that's resolved when an event is emitted on the
 * EventEmitter.
 * @param  {EventEmitter} emitter
 * @param  {string}       event
 * @para   {number}       timeout used to prevent memory leaks
 * @return {Promise<any>}
 */
export function resolveOn(emitter: EventEmitter, event: string,
    timeout: number = 120 * 1000): Promise<any> {

    return new Promise((resolve, reject) => {
        let resolved = false;
        const listener = data => {
            resolved = true;
            resolve(data);
        };

        emitter.once(event, listener);

        setTimeout(() => {
            if (!resolved) {
                emitter.removeListener(event, listener);
                reject(new TimeoutError(`Expected to get event ${event}`));
            }
        }, timeout);
    });
}

/**
 * Return a promise which is rejected with a TimeoutError after the
 * provided delay.
 * @param  {Number} delay
 * @return {Promise}
 */
export function timeout (message: string, delay: number): Promise<void> {
    // Capture the stacktrace here, since timeout stacktraces
    // often get mangled or dropped.
    const err = new TimeoutError(message);

    return new Promise<void>((resolve, reject) => {
        setTimeout(() => reject(err), delay);
    });
}
/**
 * Returns a function that calls the wrapped function with only instances of
 * the provided class, and throws them otherwise. This is meant to be used
 * inside `.catch` blocks of promises.
 * 
 * Imported from frontend2
 *
 * @example
 * // Surpress an error
 * return foo.catch(only(AlreadyExistsErrror));
 * // Handle a error
 * return foo.catch(only(AdapterResponseError, err => alert(err.toLocaleString())));
 */
export function only<T extends Error, U>(
    cls: { new(...args: any[]): T },
    handler: (err: T) => U = () => null,
): (err: any) => U {
    return err => {
        if (!(err instanceof cls)) {
            throw err;
        }

        return handler(err);
    };
}
