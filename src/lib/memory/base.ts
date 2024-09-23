import { BaseListChatMessageHistory } from '@langchain/core/chat_history';
import { BaseMessage } from '@langchain/core/messages';

/**
 * Abstract class for chat memory that includes an `userId` property. All chat memory classes should extend this class.
 *
 * @extends BaseListChatMessageHistory {@link BaseListChatMessageHistory}
 */
export abstract class BaseChatMemory extends BaseListChatMessageHistory {
  /**
   * Identifier associated with the instance. Typically, this represents the user ID.
   *
   * This property's type is restricted to `string` or `number` to ensure that it can be used as a key in a map.
   */
  abstract userId: string | number;

  abstract addMessage(
    message: BaseMessage,
    fbMediaRefPath?: string
  ): Promise<void>;

  abstract addMessages(
    messages: (BaseMessage & { fbMediaRefPath?: string })[]
  ): Promise<void>;
}

/**
 * Abstract class for chat memory that includes a summary of the conversation and methods to get and update the summary.
 *
 * @extends BaseChatMemory {@link BaseChatMemory}
 */
export abstract class ChatMemoryWithSummary extends BaseChatMemory {
  /**
   * Get a summary of the conversation.
   */
  abstract getSummary(): Promise<Summary>;

  /**
   * Get a summary of the conversation as text.
   *
   * This method is a convenience method that calls `getSummary` and formats the result as a string.
   * @returns \
   */
  async getSummaryAsText(): Promise<string> {
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

  /**
   * Summarize the conversation.
   *
   * Actual implementation of this method should handle the logic to summarize the conversation and the side effects of summarizing the conversation.
   */
  abstract summarizeMessages(args: any): Promise<void>;
}

export type Summary = Array<SummaryChunk>;

export type SummaryChunk =
  | string
  | {
      text: string;
      createdAt: NativeDate | number | string;
    };
