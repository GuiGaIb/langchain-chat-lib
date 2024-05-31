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

/**
 * A type that makes specified keys in `T` required and leaves the rest as optional.
 *
 * @template T - The object type to be modified.
 * @template Keys - The keys of `T` that should be required.
 */
export type WithRequired<
  T extends { [key: string]: any },
  Keys extends keyof T
> = { [K in Keys]-?: T[K] } & { [K in Exclude<keyof T, Keys>]?: T[K] };

/**
 * A type that makes specified keys in `T` required and strips all optional properties.
 *
 * @template T - The object type to be modified.
 * @template Keys - The keys of `T` that should be required.
 */
export type WithRequiredAndNoOptional<
  T extends { [key: string]: any },
  Keys extends keyof T
> = {
  [K in Keys]-?: T[K];
} & { [K in Exclude<keyof T, Keys | OptionalKeys<T>>]: T[K] };

/**
 * A utility type that extracts the keys of `T` that are optional.
 *
 * @template T - The object type to extract optional keys from.
 */
export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

/**
 * A type that strips all optional properties from `T`.
 *
 * @template T - The object type to be modified.
 */
export type StripOptional<T> = Pick<T, Exclude<keyof T, OptionalKeys<T>>>;
