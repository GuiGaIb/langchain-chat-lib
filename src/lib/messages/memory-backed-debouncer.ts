import { Subject, Subscription, debounceTime, takeUntil } from 'rxjs';
import { BaseListChatMessageHistory } from '@langchain/core/chat_history';
import { BaseMessage } from '@langchain/core/messages';

import { getOptionalNumEnv } from '../config/env.js';

export class MemoryBackedDebouncer implements MemoryBackedDebouncerInput {
  /**
   * Static instances map to keep track of all instances of MemoryBackedDebouncer.
   *
   * Useful to implement singleton pattern.
   *
   * Key - `userId`: `string`
   */
  static instances = new Map<string, MemoryBackedDebouncer>();

  /**
   * Get an new or existing instance of `MemoryBackedDebouncer`. If an instance already exists, it can be overridden by passing the `override` flag.
   * @param options - {@link MBDOptions}
   * @returns instance of {@link MemoryBackedDebouncer}
   */
  static getInstance(
    options: MBDOptions & { override?: boolean }
  ): MemoryBackedDebouncer {
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
  private static getConfigWithDefaults(
    config: MemoryBackedDebouncerConfig
  ): Required<MemoryBackedDebouncerConfig> {
    const {
      onTrigger,
      cleanupTimeMs,
      debounceTimeMs,
      onTriggerComplete,
      onTriggerError,
    } = config;

    const defaultCleanupTimeMs = getOptionalNumEnv(
      'MESSAGE_DEBOUNCE_CLEANUP_TIME_MS',
      1000 * 60 * 15
    ); // 15 minutes
    const defaultDebounceTimeMs = getOptionalNumEnv(
      'MESSAGE_DEBOUNCE_TIME_MS',
      15 * 1000
    ); // 15 seconds

    const defaultOnTriggerComplete = () => void 0;
    const defaultOnTriggerError = (error: any) => {
      throw error;
    };

    const defaultConfig: Required<MemoryBackedDebouncerConfig> = {
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
  private init = false;

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
  private _debounceTimeMs!: number;
  get debounceTimeMs() {
    return this._debounceTimeMs;
  }

  /**
   * Cleanup time in milliseconds.
   *
   * Protected with a getter to prevent accidental modification.
   */
  private _cleanupTimeMs!: number;
  get cleanupTimeMs() {
    return this._cleanupTimeMs;
  }

  private cleanupTimeout?: NodeJS.Timeout;

  /**
   * Subject to trigger when the debouncing time has elapsed.
   */
  private trigger$!: Subject<void>;

  /**
   * Subject to trigger when the cleanup time has elapsed.
   */
  private end$!: Subject<void>;

  /**
   * Subscription to the debounced observable.
   */
  private sub!: Subscription;

  /**
   *Constructor is private to enforce the singleton pattern.
   *
   * Use the `MemoryBackedDebouncer.getInstance` static instead.
   */
  private constructor(options: MBDOptions) {
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
  async queueMessage(message: BaseMessage): Promise<void> {
    await this.memory.addMessage(message);
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
  private setup(config: Required<MemoryBackedDebouncerConfig>) {
    if (this.init) {
      this.teardown();
    }
    this._cleanupTimeMs = config.cleanupTimeMs;
    this._debounceTimeMs = config.debounceTimeMs;
    this.trigger$ = new Subject<void>();
    this.end$ = new Subject<void>();
    this.sub = this.trigger$
      .pipe(debounceTime(config.debounceTimeMs), takeUntil(this.end$))
      .subscribe({
        next: async () => {
          try {
            await config.onTrigger.bind(this)();
          } catch (error) {
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
  private teardown() {
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

// Types
export interface MemoryBackedDebouncerInput {
  memory: BaseListChatMessageHistory;
  userId: string;
}

export interface MemoryBackedDebouncerConfig {
  debounceTimeMs?: number;
  cleanupTimeMs?: number;

  // Callbacks
  onTrigger: (this: MemoryBackedDebouncer) => void | Promise<void>;
  onTriggerError?: (
    this: MemoryBackedDebouncer,
    error: any
  ) => void | Promise<void>;
  onTriggerComplete?: (this: MemoryBackedDebouncer) => void | Promise<void>;
}

type MBDOptions = MemoryBackedDebouncerInput & MemoryBackedDebouncerConfig;
