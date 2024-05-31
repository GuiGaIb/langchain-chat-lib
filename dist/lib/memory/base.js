import { BaseListChatMessageHistory } from '@langchain/core/chat_history';
/**
 * Abstract class for chat memory that includes an `userId` property. All chat memory classes should extend this class.
 *
 * @extends BaseListChatMessageHistory {@link BaseListChatMessageHistory}
 */
export class BaseChatMemory extends BaseListChatMessageHistory {
}
/**
 * Abstract class for chat memory that includes a summary of the conversation and methods to get and update the summary.
 *
 * @extends BaseChatMemory {@link BaseChatMemory}
 */
export class ChatMemoryWithSummary extends BaseChatMemory {
    /**
     * Get a summary of the conversation as text.
     *
     * This method is a convenience method that calls `getSummary` and formats the result as a string.
     * @returns \
     */
    async getSummaryAsText() {
        const summary = await this.getSummary();
        return summary
            .map((chunk) => {
            if (typeof chunk === 'string') {
                return chunk;
            }
            return chunk.text;
        })
            .join('\n');
    }
}
