import { Runnable, RunnableMap } from '@langchain/core/runnables';
import { AIMessage, BaseMessage } from '@langchain/core/messages';

import {
  MongoChatSessionMemory,
  MongoChatSessionMemoryInput,
} from '../../../lib/memory/mongodb/mongo-chat-session-memory.js';
import { unpackChatMemoryWithSummary } from '../../../lib/memory/utils/unpack-memory.js';
import { LCRunOutput } from '../../../lib/utils/utility-types.js';
import { getConversationStagesStringified } from '../tasks/get-conversation-stages-stringified.js';
import { getConversationStage } from '../tasks/get-conversation-stage.js';
import { getConversationStageInstructions } from '../tasks/get-conversation-stage-instructions.js';
import { getPossibleServices } from '../tasks/get-possible-services.js';
import { ServiceIndexDAO } from '../../db/service-index-dao.js';
import { knowledgeRetriever } from '../retrievers/knowledge-retriever.js';
import { generateResponse } from '../tasks/generate-response.js';

const conversation_stages_str = getConversationStagesStringified
  .pipe((output) => output.conversation_stages_str)
  .withConfig({ runName: 'conversation_stages_str' });

const stage_instructions = getConversationStage
  .pipe(getConversationStageInstructions)
  .pipe((output) => output.stage_instructions)
  .withConfig({ runName: 'stage_instructions' });

const possible_services_str = getPossibleServices
  .pipe((output) => output.possible_services)
  .pipe((output) => ServiceIndexDAO.Service.getServicesLongByNames(output))
  .withConfig({
    runName: 'possible_services_str',
  });

const applicable_knowledge_str = knowledgeRetriever
  .pipe((output) => output.join('\n'))
  .withConfig({
    runName: 'applicable_knowledge_str',
  });

export const CustomerServiceChain: CustomerServiceChain = RunnableMap.from<
  MongoChatSessionMemoryInput & {
    cs_rep_name: string;
    company_name: string;
    company_business: string;
  },
  LCRunOutput<typeof unpackChatMemoryWithSummary> & {
    cs_rep_name: string;
    company_name: string;
    company_business: string;
    conversation_stages_str: string;
    available_services_str: string;
  }
>({
  company_business: (input) => input.company_business,
  company_name: (input) => input.company_name,
  cs_rep_name: (input) => input.cs_rep_name,
  memory: (input) => new MongoChatSessionMemory(input),
  chat_history: (input) => new MongoChatSessionMemory(input).getMessages(),
  chat_summary: (input) => new MongoChatSessionMemory(input).getSummary(),
  chat_summary_text: (input) =>
    new MongoChatSessionMemory(input).getSummaryAsText(),
  conversation_stages_str: getConversationStagesStringified.pipe(
    (output) => output.conversation_stages_str
  ),
  available_services_str: (input) =>
    ServiceIndexDAO.Service.getServicesShort().then((services) =>
      services.join('\n')
    ),
})
  .pipe(
    RunnableMap.from<
      LCRunOutput<typeof unpackChatMemoryWithSummary> & {
        cs_rep_name: string;
        company_name: string;
        company_business: string;
        conversation_stages_str: string;
        available_services_str: string;
      },
      {
        cs_rep_name: string;
        company_name: string;
        company_business: string;
        conversation_stages_str: string;
        stage_instructions: string;
        possible_services_str: string;
        applicable_knowledge_str: string;
        chat_summary_text: string;
        chat_history: BaseMessage[];
      }
    >({
      company_business: (input) => input.company_business,
      company_name: (input) => input.company_name,
      cs_rep_name: (input) => input.cs_rep_name,
      chat_history: (input) => input.chat_history,
      chat_summary_text: (input) => input.chat_summary_text,
      conversation_stages_str,
      stage_instructions,
      possible_services_str: possible_services_str.pipe((output) =>
        output.join('\n')
      ),
      applicable_knowledge_str,
    })
  )
  .pipe(generateResponse);

export type CustomerServiceChain = Runnable<
  MongoChatSessionMemoryInput & {
    cs_rep_name: string;
    company_name: string;
    company_business: string;
  },
  AIMessage
>;
