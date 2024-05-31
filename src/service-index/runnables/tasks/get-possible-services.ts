import { z } from 'zod';
import { BaseMessage } from '@langchain/core/messages';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import { BaseOpenAI } from '../../models.js';

const systemMessage = `Your job is to analyze the chat history between an user and a customer service representative and a list of available services, and determine which services mught be relevant to the user.

The possible services are presented between the *** symbols:
***
{conversation_stages_str}
***

To emit your response you must consider:
- The services of choice must be one of the available services.
- The services of choice must be the ones that best fit the chat history.
- You must analyze the chat history and the requirements of each service to determine whether a service might be adequate for the user.
- To determine whether a service is adequate for the user, you must analyze the chat history and the requirements of the service to determine whether the user meets the requirements of the service.
- If the chat does not provide explicit information about the user meeting each and every one the requirements of the service, it does not mean that the service is not adequate for the user, as the assistant might gather the missing information from the user in the next messages.
- However, if the chat provides explicit information about the user not meeting one or more of the requirements of the service, then the service is not adequate for the user.

User the knowledge presented here and your own to determine which services might be relevant to the user.`;

const summaryMessage = `The chat history is broken down into a summary of the messages exchanged between the user and the customer service representative, and the most recent messages in the chat.

The summary of the chat history is as follows (it can be empty):
{chat_summary_text}

The most recent messages follow below:`;

const promptTemplate = ChatPromptTemplate.fromMessages<{
  chat_summary_text: string;
  chat_history: BaseMessage[];
  conversation_stages_str: string;
}>([
  ['system', systemMessage],
  ['system', summaryMessage],
  new MessagesPlaceholder('chat_history'),
]).withConfig({ runName: 'get_possible_services_prompt_template' });

const responseSchema = z.object({
  possible_services: z
    .array(
      z
        .string()
        .trim()
        .describe(
          'The name of a possible service that might be relevant or applicable to the user'
        )
    )
    .describe('The possible services that might be relevant to the user'),
});

export const getPossibleServices = promptTemplate
  .pipe(BaseOpenAI.withStructuredOutput(responseSchema))
  .withConfig({ runName: 'get_possible_services' });
