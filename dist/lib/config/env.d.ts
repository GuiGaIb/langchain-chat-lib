/**
 * Retrieves the value of an optional environment variable.
 * @param key - The name of the environment variable.
 * @returns The value of the environment variable, or undefined if not set.
 */
export declare function getOptionalEnv(key: string): string | undefined;
/**
 * Retrieves the value of an optional environment variable with a default value.
 * @param key - The name of the environment variable.
 * @param defaultValue - The default value to return if the environment variable is not set.
 * @returns The value of the environment variable, or the default value if not set.
 */
export declare function getOptionalEnv(key: string, defaultValue: string): string;
/**
 * Retrieves the numeric value of an optional environment variable.
 * @param key - The name of the environment variable.
 * @returns The numeric value of the environment variable, or undefined if not set.
 * @throws Will throw an error if the environment variable value is not a valid number.
 */
export declare function getOptionalNumEnv(key: string): number | undefined;
/**
 * Retrieves the numeric value of an optional environment variable with a default value.
 * @param key - The name of the environment variable.
 * @param defaultValue - The default numeric value to return if the environment variable is not set.
 * @returns The numeric value of the environment variable, or the default value if not set.
 * @throws Will throw an error if the environment variable value is not a valid number.
 */
export declare function getOptionalNumEnv(key: string, defaultValue: number): number;
/**
 * Checks if an environment variable is set.
 * @param key - The name of the environment variable.
 * @throws if the environment variable is not set.
 */
export declare function checkEnv(key: string): void;
/**
 * Checks if an environment variable is set and passes a validation function.
 * @param key - The name of the environment variable.
 * @param validator - A function that returns true if the value is valid.
 * @throws if the environment variable is not set or the validation function fails.
 */
export declare function checkEnv(key: string, validator: (value: string) => boolean): void;
/**
 * Checks if an environment variable is set and passes an asynchronous validation function.
 * @param key - The name of the environment variable.
 * @param validator - An asynchronous function that returns true if the value is valid.
 * @throws if the environment variable is not set or the validation function fails.
 */
export declare function checkEnvAsync(key: string, validator: (value: string) => Promise<boolean>): Promise<void>;
//# sourceMappingURL=env.d.ts.map