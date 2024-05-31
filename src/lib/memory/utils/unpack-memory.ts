import type { BaseMessage } from '@langchain/core/messages';
import {
  Runnable,
  RunnableFunc,
  RunnableLambda,
  RunnableMap,
  RunnableSequence,
} from '@langchain/core/runnables';

import { BaseChatMemory, ChatMemoryWithSummary, Summary } from '../base.js';
import type { LCRunOutput } from '../../utils/utility-types.js';

/* ---------------- BaseChatMemory ---------------- */
type BaseChatMemoryInput = BaseChatMemory | { memory: BaseChatMemory };

const _coerceMemory: RunnableFunc<
  BaseChatMemoryInput,
  { memory: BaseChatMemory }
> = (input) => {
  const memory = input instanceof BaseChatMemory ? input : input.memory;
  if (!(memory instanceof BaseChatMemory)) {
    throw new Error('memory must be an instance of BaseChatMemory');
  }
  return { memory };
};

const coerceMemory = new RunnableLambda({ func: _coerceMemory });

const unpackMemory = RunnableMap.from<
  LCRunOutput<typeof coerceMemory>,
  LCRunOutput<UnpackChatMemory>
>({
  memory: (input) => input.memory,
  chat_history: (input) => input.memory.getMessages(),
});

export const unpackChatMemory: UnpackChatMemory = RunnableSequence.from([
  coerceMemory,
  unpackMemory,
]);

export type UnpackChatMemory = Runnable<
  BaseChatMemory | { memory: BaseChatMemory },
  {
    memory: BaseChatMemory;
    chat_history: BaseMessage[];
  }
>;
/* ------------------------------------------------ */

/* ------------ ChatMemoryWithSummary ------------- */
type ChatMemoryWithSummaryInput =
  | ChatMemoryWithSummary
  | { memory: ChatMemoryWithSummary };

const _coerceMemoryWithSummary: RunnableFunc<
  ChatMemoryWithSummaryInput,
  { memory: ChatMemoryWithSummary }
> = (input) => {
  const memory = input instanceof ChatMemoryWithSummary ? input : input.memory;
  if (!(memory instanceof ChatMemoryWithSummary)) {
    throw new Error('memory must be an instance of ChatMemoryWithSummary');
  }
  return { memory };
};

const coerceMemoryWithSummary = new RunnableLambda({
  func: _coerceMemoryWithSummary,
});

const unpackMemoryWithSummary = RunnableMap.from<
  LCRunOutput<typeof coerceMemoryWithSummary>,
  LCRunOutput<UnpackChatMemoryWithSummary>
>({
  memory: (input) => input.memory,
  chat_history: (input) => input.memory.getMessages(),
  chat_summary: (input) => input.memory.getSummary(),
  chat_summary_text: (input) => input.memory.getSummaryAsText(),
});

export const unpackChatMemoryWithSummary: UnpackChatMemoryWithSummary =
  RunnableSequence.from([coerceMemoryWithSummary, unpackMemoryWithSummary]);

export type UnpackChatMemoryWithSummary = Runnable<
  ChatMemoryWithSummaryInput,
  {
    memory: ChatMemoryWithSummary;
    chat_history: BaseMessage[];
    chat_summary: Summary;
    chat_summary_text: string;
  }
>;
/* ------------------------------------------------ */
