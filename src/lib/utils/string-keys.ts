/**
 * Retrieves all string keys from an object.
 *
 * @param {T} obj - The object to retrieve the string keys from.
 * @returns {Extract<keyof T, string>[]} An array of string keys from the object.
 */
export const getStringKeys = <T extends object>(
  obj: T
): Extract<keyof T, string>[] => {
  const keys: Extract<keyof T, string>[] = [];
  for (const key in obj) {
    if (typeof key === 'string') {
      keys.push(key as Extract<keyof T, string>);
    }
  }
  return keys;
};
