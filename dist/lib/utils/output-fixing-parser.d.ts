import { OutputFixingParser } from 'langchain/output_parsers';
import { z } from 'zod';
/**
 * Returns a structured output fixing parser based on the provided schema.
 * @template T - The Zod schema type.
 * @param {T} schema - The Zod schema to parse.
 * @returns {OutputFixingParser<z.infer<T>>} - The structured output fixing parser.
 */
export declare function getStructuredOutputFixingParser<T extends z.ZodTypeAny>(schema: T): OutputFixingParser<z.infer<T>>;
//# sourceMappingURL=output-fixing-parser.d.ts.map