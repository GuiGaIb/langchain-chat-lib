import { Subject, debounceTime, takeUntil } from 'rxjs';
import { getOptionalNumEnv } from '../config/env.js';
export class MemoryBackedDebouncer {
    /**
     * Static instances map to keep track of all instances of MemoryBackedDebouncer.
     *
     * Useful to implement singleton pattern.
     *
     * Key - `userId`: `string`
     */
    static instances = new Map();
    /**
     * Get an new or existing instance of `MemoryBackedDebouncer`. If an instance already exists, it can be overridden by passing the `override` flag.
     * @param options - {@link MBDOptions}
     * @returns instance of {@link MemoryBackedDebouncer}
     */
    static getInstance(options) {
        const { userId } = options;
        const existing = this.instances.get(userId);
        if (existing) {
            if (options.override) {
                existing.setup(MemoryBackedDebouncer.getConfigWithDefaults(options));
            }
            return existing;
        }
        const instance = new MemoryBackedDebouncer(options);
        this.instances.set(userId, instance);
        return instance;
    }
    /**
     * Populate a `MemoryBackedDebouncerConfig` object with default values.
     * @param config - {@link MemoryBackedDebouncerConfig}
     * @returns `MemoryBackedDebouncerConfig` with default values.
     */
    static getConfigWithDefaults(config) {
        const { onTrigger, cleanupTimeMs, debounceTimeMs, onTriggerComplete, onTriggerError, } = config;
        const defaultCleanupTimeMs = getOptionalNumEnv('MESSAGE_DEBOUNCE_CLEANUP_TIME_MS', 1000 * 60 * 15); // 15 minutes
        const defaultDebounceTimeMs = getOptionalNumEnv('MESSAGE_DEBOUNCE_TIME_MS', 15 * 1000); // 15 seconds
        const defaultOnTriggerComplete = () => void 0;
        const defaultOnTriggerError = (error) => {
            throw error;
        };
        const defaultConfig = {
            onTrigger,
            cleanupTimeMs: cleanupTimeMs ?? defaultCleanupTimeMs,
            debounceTimeMs: debounceTimeMs ?? defaultDebounceTimeMs,
            onTriggerComplete: onTriggerComplete ?? defaultOnTriggerComplete,
            onTriggerError: onTriggerError ?? defaultOnTriggerError,
        };
        return defaultConfig;
    }
    /**
     * Flag to check if the instance is initialized.
     */
    init = false;
    /**
     * {@link BaseListChatMessageHistory} instance to store messages.
     */
    memory;
    /**
     * User ID for which the instance is created.
     */
    userId;
    /**
     * Debounce time in milliseconds.
     *
     * Protected with a getter to prevent accidental modification.
     */
    _debounceTimeMs;
    get debounceTimeMs() {
        return this._debounceTimeMs;
    }
    /**
     * Cleanup time in milliseconds.
     *
     * Protected with a getter to prevent accidental modification.
     */
    _cleanupTimeMs;
    get cleanupTimeMs() {
        return this._cleanupTimeMs;
    }
    cleanupTimeout;
    /**
     * Subject to trigger when the debouncing time has elapsed.
     */
    trigger$;
    /**
     * Subject to trigger when the cleanup time has elapsed.
     */
    end$;
    /**
     * Subscription to the debounced observable.
     */
    sub;
    /**
     *Constructor is private to enforce the singleton pattern.
     *
     * Use the `MemoryBackedDebouncer.getInstance` static instead.
     */
    constructor(options) {
        const { memory, userId } = options;
        this.memory = memory;
        this.userId = userId;
        const config = MemoryBackedDebouncer.getConfigWithDefaults(options);
        this.setup(config);
    }
    /**
     * Add a message to the memory and trigger the debouncer.
     * @param message - {@link BaseMessage}
     */
    async queueMessage(message, fbMediaRefPath) {
        await this.memory.addMessage(message, fbMediaRefPath);
        this.trigger$.next();
        if (this.cleanupTimeout) {
            clearTimeout(this.cleanupTimeout);
        }
        this.cleanupTimeout = setTimeout(() => {
            this.terminate();
        }, this.cleanupTimeMs);
    }
    /**
     * Setup the debouncer with the provided configuration. If the instance is already initialized, it will be torn down and re-initialized.
     * @param config
     */
    setup(config) {
        if (this.init) {
            this.teardown();
        }
        this._cleanupTimeMs = config.cleanupTimeMs;
        this._debounceTimeMs = config.debounceTimeMs;
        this.trigger$ = new Subject();
        this.end$ = new Subject();
        this.sub = this.trigger$
            .pipe(debounceTime(config.debounceTimeMs), takeUntil(this.end$))
            .subscribe({
            next: async () => {
                try {
                    await config.onTrigger.bind(this)();
                }
                catch (error) {
                    config.onTriggerError.bind(this)(error);
                }
            },
            error: config.onTriggerError.bind(this),
            complete: config.onTriggerComplete.bind(this),
        });
        this.init = true;
    }
    /**
     * Tear down the debouncer including the subjects and subscriptions.
     */
    teardown() {
        if (this.cleanupTimeout) {
            clearTimeout(this.cleanupTimeout);
        }
        this.trigger$.complete();
        this.end$.next();
        this.end$.complete();
        this.sub.unsubscribe();
    }
    /**
     * Terminate the instance and remove it from the static instances map.
     */
    terminate() {
        this.teardown();
        MemoryBackedDebouncer.instances.delete(this.userId);
    }
}
