import { z } from 'zod';
import { ChatPromptTemplate, MessagesPlaceholder, } from '@langchain/core/prompts';
import { BaseOpenAI } from '../../models.js';
const responseSchema = z.object({
    conversation_stage: z
        .string()
        .trim()
        .regex(/^\d+(\.\d+)?$/, 'The conversation stage numeral must follow the numeral format, e.g. "1" or "1.1"')
        .describe('The conversation stage numeral that the chat is currently at'),
});
const systemMessage = `Your job is to analyze the chat history between an user and a customer service representative, and determine on which stage of the conversation the chat is currently at.

The possible conversation stages are presented between the *** symbols:
***
{conversation_stages_str}
***

To emit your response you must consider:
- The stage of choice must be one of the available stages.
- The stage of choice it the one that best fits the chat history.
- The requirements for the chosen stage must be met, based on the chat history.`;
const summaryMessage = `The chat history is broken down into a summary of the messages exchanged between the user and the customer service representative, and the most recent messages in the chat.

The summary of the chat history is as follows (it can be empty):
{chat_summary_text}

The most recent messages follow below:`;
const promptTemplate = ChatPromptTemplate.fromMessages([
    ['system', systemMessage],
    ['system', summaryMessage],
    new MessagesPlaceholder('chat_history'),
]).withConfig({ runName: 'get_conversation_stage_prompt_template' });
export const getConversationStage = promptTemplate
    .pipe(BaseOpenAI.withStructuredOutput(responseSchema))
    .withConfig({ runName: 'get_conversation_stage' });
