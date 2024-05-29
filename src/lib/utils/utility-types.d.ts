import type { Runnable } from '@langchain/core/runnables';

/**
 * Extracts the `RunInput` type parameter of a {@link Runnable}
 * @template T - The type of the `Runnable`
 */
export type LCRunInput<T extends Runnable> = Parameters<T['invoke']>[0];

/**
 * Extracts the `RunOutput` type parameter of a {@link Runnable}
 * @template T - The type of the `Runnable`
 */
export type LCRunOutput<T extends Runnable> = Awaited<ReturnType<T['invoke']>>;
