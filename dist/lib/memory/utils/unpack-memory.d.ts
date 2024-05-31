import type { BaseMessage } from '@langchain/core/messages';
import { Runnable } from '@langchain/core/runnables';
import { BaseChatMemory, ChatMemoryWithSummary, Summary } from '../base.js';
export declare const unpackChatMemory: UnpackChatMemory;
export type UnpackChatMemory = Runnable<BaseChatMemory | {
    memory: BaseChatMemory;
}, {
    memory: BaseChatMemory;
    chat_history: BaseMessage[];
}>;
type ChatMemoryWithSummaryInput = ChatMemoryWithSummary | {
    memory: ChatMemoryWithSummary;
};
export declare const unpackChatMemoryWithSummary: UnpackChatMemoryWithSummary;
export type UnpackChatMemoryWithSummary = Runnable<ChatMemoryWithSummaryInput, {
    memory: ChatMemoryWithSummary;
    chat_history: BaseMessage[];
    chat_summary: Summary;
    chat_summary_text: string;
}>;
export {};
//# sourceMappingURL=unpack-memory.d.ts.map