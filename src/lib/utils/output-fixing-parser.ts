import {
  OutputFixingParser,
  StructuredOutputParser,
} from 'langchain/output_parsers';
import { z } from 'zod';
import { OpenAI } from '@langchain/openai';

/**
 * Returns a structured output fixing parser based on the provided schema.
 * @template T - The Zod schema type.
 * @param {T} schema - The Zod schema to parse.
 * @returns {OutputFixingParser<z.infer<T>>} - The structured output fixing parser.
 */
export function getStructuredOutputFixingParser<T extends z.ZodTypeAny>(
  schema: T
): OutputFixingParser<z.infer<T>> {
  const baseParser = StructuredOutputParser.fromZodSchema(schema);
  const llm = new OpenAI({
    model: 'gpt-4o',
    temperature: 0,
  });
  return OutputFixingParser.fromLLM(llm, baseParser);
}
