/**
 * Retrieves all string keys from an object.
 *
 * @param {T} obj - The object to retrieve the string keys from.
 * @returns {Extract<keyof T, string>[]} An array of string keys from the object.
 */
export declare const getStringKeys: <T extends object>(obj: T) => Extract<keyof T, string>[];
//# sourceMappingURL=string-keys.d.ts.map