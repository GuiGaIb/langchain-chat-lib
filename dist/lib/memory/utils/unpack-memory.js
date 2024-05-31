import { RunnableLambda, RunnableMap, RunnableSequence, } from '@langchain/core/runnables';
import { BaseChatMemory, ChatMemoryWithSummary } from '../base.js';
const _coerceMemory = (input) => {
    const memory = input instanceof BaseChatMemory ? input : input.memory;
    if (!(memory instanceof BaseChatMemory)) {
        throw new Error('memory must be an instance of BaseChatMemory');
    }
    return { memory };
};
const coerceMemory = new RunnableLambda({ func: _coerceMemory }).withConfig({
    runName: 'coerceMemory',
}).withConfig({ runName: 'coerceMemory' });
const unpackMemory = RunnableMap.from({
    memory: (input) => input.memory,
    chat_history: (input) => input.memory.getMessages(),
}).withConfig({ runName: 'unpackMemory' });
export const unpackChatMemory = RunnableSequence.from([
    coerceMemory,
    unpackMemory,
]).withConfig({ runName: 'unpackChatMemory' });
const _coerceMemoryWithSummary = (input) => {
    const memory = input instanceof ChatMemoryWithSummary ? input : input.memory;
    if (!(memory instanceof ChatMemoryWithSummary)) {
        throw new Error('memory must be an instance of ChatMemoryWithSummary');
    }
    return { memory };
};
const coerceMemoryWithSummary = new RunnableLambda({
    func: _coerceMemoryWithSummary,
}).withConfig({ runName: 'coerceMemoryWithSummary' });
const unpackMemoryWithSummary = RunnableMap.from({
    memory: (input) => input.memory,
    chat_history: (input) => input.memory.getMessages(),
    chat_summary: (input) => input.memory.getSummary(),
    chat_summary_text: (input) => input.memory.getSummaryAsText(),
}).withConfig({ runName: 'unpackMemoryWithSummary' });
export const unpackChatMemoryWithSummary = RunnableSequence.from([
    coerceMemoryWithSummary,
    unpackMemoryWithSummary,
]).withConfig({ runName: 'unpackChatMemoryWithSummary' });
/* ------------------------------------------------ */
