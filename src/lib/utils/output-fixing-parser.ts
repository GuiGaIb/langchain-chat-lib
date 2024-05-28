import {
  OutputFixingParser,
  StructuredOutputParser,
} from 'langchain/output_parsers';
import { z } from 'zod';
import type { BaseLanguageModel } from '@langchain/core/language_models/base';
import type { BaseOutputParser } from '@langchain/core/output_parsers';
import { OpenAI } from '@langchain/openai';

/**
 * Returns an instance of OutputFixingParser that fixes the output of a given parser using a language model.
 *
 * @template T - The type of the output.
 * @param llm - The BaseLanguageModel instance used for fixing the output.
 * @param parser - The BaseOutputParser instance used for parsing the output.
 * @returns An instance of OutputFixingParser.
 */
export function getOutputFixingParser<T>(
  llm: BaseLanguageModel,
  parser: BaseOutputParser<T>
): OutputFixingParser<T> {
  return OutputFixingParser.fromLLM(llm, parser);
}

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
  });
  return getOutputFixingParser(llm, baseParser);
}
