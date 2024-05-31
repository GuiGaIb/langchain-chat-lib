import { RunnableMap } from '@langchain/core/runnables';
import { MongoChatSessionMemory, } from '../../../lib/memory/mongodb/mongo-chat-session-memory.js';
import { getConversationStagesStringified } from '../tasks/get-conversation-stages-stringified.js';
import { getConversationStage } from '../tasks/get-conversation-stage.js';
import { getConversationStageInstructions } from '../tasks/get-conversation-stage-instructions.js';
import { getPossibleServices } from '../tasks/get-possible-services.js';
import { ServiceIndexDAO } from '../../db/service-index-dao.js';
import { knowledgeRetriever } from '../retrievers/knowledge-retriever.js';
import { generateResponse } from '../tasks/generate-response.js';
const conversation_stages_str = getConversationStagesStringified.pipe((output) => output.conversation_stages_str);
const stage_instructions = getConversationStage
    .pipe(getConversationStageInstructions)
    .pipe((output) => output.stage_instructions);
const possible_services_str = getPossibleServices
    .pipe((output) => output.possible_services)
    .pipe((output) => ServiceIndexDAO.Service.getServicesLongByNames(output));
const applicable_knowledge_str = knowledgeRetriever.pipe((output) => output.join('\n'));
export const CustomerServiceChain = RunnableMap.from({
    company_business: (input) => input.company_business,
    company_name: (input) => input.company_name,
    cs_rep_name: (input) => input.cs_rep_name,
    memory: (input) => new MongoChatSessionMemory(input),
    chat_history: (input) => new MongoChatSessionMemory(input).getMessages(),
    chat_summary: (input) => new MongoChatSessionMemory(input).getSummary(),
    chat_summary_text: (input) => new MongoChatSessionMemory(input).getSummaryAsText(),
    conversation_stages_str: getConversationStagesStringified.pipe((output) => output.conversation_stages_str),
})
    .pipe(RunnableMap.from({
    company_business: (input) => input.company_business,
    company_name: (input) => input.company_name,
    cs_rep_name: (input) => input.cs_rep_name,
    chat_history: (input) => input.chat_history,
    chat_summary_text: (input) => input.chat_summary_text,
    conversation_stages_str,
    stage_instructions,
    possible_services_str: possible_services_str.pipe((output) => output.join('\n')),
    applicable_knowledge_str,
}))
    .pipe(generateResponse);
