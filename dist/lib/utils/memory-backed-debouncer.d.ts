import { BaseListChatMessageHistory } from '@langchain/core/chat_history';
import { BaseMessage } from '@langchain/core/messages';
export declare class MemoryBackedDebouncer implements MemoryBackedDebouncerInput {
    /**
     * Static instances map to keep track of all instances of MemoryBackedDebouncer.
     *
     * Useful to implement singleton pattern.
     *
     * Key - `userId`: `string`
     */
    static instances: Map<string, MemoryBackedDebouncer>;
    /**
     * Get an new or existing instance of `MemoryBackedDebouncer`. If an instance already exists, it can be overridden by passing the `override` flag.
     * @param options - {@link MBDOptions}
     * @returns instance of {@link MemoryBackedDebouncer}
     */
    static getInstance(options: MBDOptions & {
        override?: boolean;
    }): MemoryBackedDebouncer;
    /**
     * Populate a `MemoryBackedDebouncerConfig` object with default values.
     * @param config - {@link MemoryBackedDebouncerConfig}
     * @returns `MemoryBackedDebouncerConfig` with default values.
     */
    private static getConfigWithDefaults;
    /**
     * Flag to check if the instance is initialized.
     */
    private init;
    /**
     * {@link BaseListChatMessageHistory} instance to store messages.
     */
    readonly memory: BaseListChatMessageHistory;
    /**
     * User ID for which the instance is created.
     */
    readonly userId: string;
    /**
     * Debounce time in milliseconds.
     *
     * Protected with a getter to prevent accidental modification.
     */
    private _debounceTimeMs;
    get debounceTimeMs(): number;
    /**
     * Cleanup time in milliseconds.
     *
     * Protected with a getter to prevent accidental modification.
     */
    private _cleanupTimeMs;
    get cleanupTimeMs(): number;
    private cleanupTimeout?;
    /**
     * Subject to trigger when the debouncing time has elapsed.
     */
    private trigger$;
    /**
     * Subject to trigger when the cleanup time has elapsed.
     */
    private end$;
    /**
     * Subscription to the debounced observable.
     */
    private sub;
    /**
     *Constructor is private to enforce the singleton pattern.
     *
     * Use the `MemoryBackedDebouncer.getInstance` static instead.
     */
    private constructor();
    /**
     * Add a message to the memory and trigger the debouncer.
     * @param message - {@link BaseMessage}
     */
    queueMessage(message: BaseMessage): Promise<void>;
    /**
     * Setup the debouncer with the provided configuration. If the instance is already initialized, it will be torn down and re-initialized.
     * @param config
     */
    private setup;
    /**
     * Tear down the debouncer including the subjects and subscriptions.
     */
    private teardown;
    /**
     * Terminate the instance and remove it from the static instances map.
     */
    terminate(): void;
}
export interface MemoryBackedDebouncerInput {
    memory: BaseListChatMessageHistory;
    userId: string;
}
export interface MemoryBackedDebouncerConfig {
    debounceTimeMs?: number;
    cleanupTimeMs?: number;
    onTrigger: (this: MemoryBackedDebouncer) => void | Promise<void>;
    onTriggerError?: (this: MemoryBackedDebouncer, error: any) => void | Promise<void>;
    onTriggerComplete?: (this: MemoryBackedDebouncer) => void | Promise<void>;
}
type MBDOptions = MemoryBackedDebouncerInput & MemoryBackedDebouncerConfig;
export {};
//# sourceMappingURL=memory-backed-debouncer.d.ts.map