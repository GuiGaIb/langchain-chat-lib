/**
 * Retrieves the value of an optional environment variable.
 * If the environment variable is not set, it returns the provided default value.
 *
 * @param key - The name of the environment variable.
 * @param defaultValue - The default value to return if the environment variable is not set.
 * @returns The value of the environment variable, or the default value if not set.
 */
export function getOptionalEnv(key, defaultValue) {
    if (defaultValue !== undefined) {
        return process.env[key] ?? defaultValue;
    }
    return process.env[key];
}
/**
 * Retrieves the numeric value of an optional environment variable.
 * If the environment variable is not set, it returns the provided default numeric value.
 * If the environment variable value is not a valid number, it throws an error.
 *
 * @param key - The name of the environment variable.
 * @param defaultValue - The default numeric value to return if the environment variable is not set.
 * @returns The numeric value of the environment variable, or the default value if not set.
 * @throws Will throw an error if the environment variable value is not a valid number.
 */
export function getOptionalNumEnv(key, defaultValue) {
    const value = getOptionalEnv(key);
    if (value === undefined) {
        return defaultValue;
    }
    const num = Number(value);
    if (isNaN(num)) {
        throw new Error(`Invalid number value for environment variable "${key}"`);
    }
    return num;
}
export function checkEnv(key, validator) {
    const value = process.env[key];
    if (value === undefined) {
        throw new Error(`Environment variable "${key}" is not set`);
    }
    if (validator && !validator(value)) {
        throw new Error(`Validation failed for environment variable "${key}"`);
    }
}
/**
 * Checks if an environment variable is set and passes an asynchronous validation function.
 * @param key - The name of the environment variable.
 * @param validator - An asynchronous function that returns true if the value is valid.
 * @throws if the environment variable is not set or the validation function fails.
 */
export async function checkEnvAsync(key, validator) {
    const value = process.env[key];
    if (value === undefined) {
        throw new Error(`Environment variable "${key}" is not set`);
    }
    if (!(await validator(value))) {
        throw new Error(`Validation failed for environment variable "${key}"`);
    }
}
