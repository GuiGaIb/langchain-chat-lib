import { OutputFixingParser } from 'langchain/output_parsers';
import type { BaseLanguageModel } from '@langchain/core/language_models/base';
import type { BaseOutputParser } from '@langchain/core/output_parsers';

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
