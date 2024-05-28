import { BaseMessage, SystemMessage } from '@langchain/core/messages';
import { RunnableFunc } from '@langchain/core/runnables';

/**
 * Retrieves the chat history context based on the provided input.
 *
 * @param input - The input object containing the chat context and chat messages.
 * @returns An array of consisting of a SystemMessage with the chat history context and the chat messages afterwards.
 */
export const getChatHistoryContext: RunnableFunc<
  {
    chat_context: string;
    chat_messages: BaseMessage[];
  },
  {
    chat_history_context: BaseMessage[];
  }
> = async (input) => {
  return {
    chat_history_context: [
      new SystemMessage(`Chat history context: ${input.chat_context}`),
      ...input.chat_messages,
    ],
  };
};
