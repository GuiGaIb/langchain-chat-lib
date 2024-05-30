/**
 * Retrieves the value of an optional environment variable.
 * @param key - The name of the environment variable.
 * @returns The value of the environment variable, or undefined if not set.
 */
export function getOptionalEnv(key: string): string | undefined;

/**
 * Retrieves the value of an optional environment variable with a default value.
 * @param key - The name of the environment variable.
 * @param defaultValue - The default value to return if the environment variable is not set.
 * @returns The value of the environment variable, or the default value if not set.
 */
export function getOptionalEnv(key: string, defaultValue: string): string;

/**
 * Retrieves the value of an optional environment variable.
 * If the environment variable is not set, it returns the provided default value.
 *
 * @param key - The name of the environment variable.
 * @param defaultValue - The default value to return if the environment variable is not set.
 * @returns The value of the environment variable, or the default value if not set.
 */
export function getOptionalEnv(
  key: string,
  defaultValue?: string
): string | undefined {
  if (defaultValue !== undefined) {
    return process.env[key] ?? defaultValue;
  }
  return process.env[key];
}

/**
 * Retrieves the numeric value of an optional environment variable.
 * @param key - The name of the environment variable.
 * @returns The numeric value of the environment variable, or undefined if not set.
 * @throws Will throw an error if the environment variable value is not a valid number.
 */
export function getOptionalNumEnv(key: string): number | undefined;

/**
 * Retrieves the numeric value of an optional environment variable with a default value.
 * @param key - The name of the environment variable.
 * @param defaultValue - The default numeric value to return if the environment variable is not set.
 * @returns The numeric value of the environment variable, or the default value if not set.
 * @throws Will throw an error if the environment variable value is not a valid number.
 */
export function getOptionalNumEnv(key: string, defaultValue: number): number;

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
export function getOptionalNumEnv(
  key: string,
  defaultValue?: number
): number | undefined {
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

/**
 * Checks if an environment variable is set.
 * @param key - The name of the environment variable.
 * @throws if the environment variable is not set.
 */
export function checkEnv(key: string): void;

/**
 * Checks if an environment variable is set and passes a validation function.
 * @param key - The name of the environment variable.
 * @param validator - A function that returns true if the value is valid.
 * @throws if the environment variable is not set or the validation function fails.
 */
export function checkEnv(
  key: string,
  validator: (value: string) => boolean
): void;

export function checkEnv(
  key: string,
  validator?: (value: string) => boolean
): void {
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
export async function checkEnvAsync(
  key: string,
  validator: (value: string) => Promise<boolean>
): Promise<void> {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Environment variable "${key}" is not set`);
  }
  if (!(await validator(value))) {
    throw new Error(`Validation failed for environment variable "${key}"`);
  }
}
