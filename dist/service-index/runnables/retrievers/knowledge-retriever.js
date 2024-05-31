import { z } from 'zod';
import { ChatPromptTemplate, MessagesPlaceholder, } from '@langchain/core/prompts';
import { RunnableMap, RunnableLambda } from '@langchain/core/runnables';
import { BaseOpenAI } from '../../models.js';
import { ServiceIndexDAO } from '../../db/service-index-dao.js';
const getDocumentsCatalog = RunnableLambda.from(() => ServiceIndexDAO.Knowledge.getCatalogStringified()).withConfig({
    runName: 'get_documents_catalog',
});
const systemMessage = `Your job is to analyze the chat history between an user and a customer service representative and a catalog of documents, and determine which documents might be relevant to the chat.

At this point the only thing you need to do is analyze the metadata of the documents presented to you and determine which documents might be relevant to the chat.
You should try and infer the relevance of the documents based on the documents' name, description, tags, and kind.

It is not strictly necessary to include any document in your response; only include the documents that you believe are relevant to the chat.

The documents are presented below between the *** symbols:
***
{documents_str}
***`;
const summaryMessage = `The chat history is broken down into a summary of the messages exchanged between the user and the customer service representative, and the most recent messages in the chat.

The summary of the chat history is as follows (it can be empty):
{chat_summary_text}

The most recent messages follow below:`;
const promptTemplate = ChatPromptTemplate.fromMessages([
    ['system', systemMessage],
    ['system', summaryMessage],
    new MessagesPlaceholder('chat_history'),
]).withConfig({ runName: 'get_knowledge_query_prompt_template' });
const outputSchema = z.object({
    document_names: z
        .array(z.string().trim())
        .describe('The names of the documents that might be relevant to the chat. This property is required, but it can be an empty array.'),
});
const inputMap = RunnableMap.from({
    chat_summary_text: (input) => input.chat_summary_text,
    chat_history: (input) => input.chat_history,
    documents_str: getDocumentsCatalog,
}).withConfig({ runName: 'get_knowledge_query_input_map' });
const getKnowledgeQuery = inputMap
    .pipe(promptTemplate)
    .pipe(BaseOpenAI.withStructuredOutput(outputSchema))
    .withConfig({ runName: 'get_knowledge_query' });
const execKnowledgeQuery = RunnableLambda.from((input) => ServiceIndexDAO.Knowledge.find()
    .byNames(input.document_names)
    .exec()
    .then((docs) => docs.map((doc) => doc.stringify()))).withConfig({ runName: 'exec_knowledge_query' });
export const knowledgeRetriever = getKnowledgeQuery
    .pipe(execKnowledgeQuery)
    .withConfig({
    runName: 'knowledge_retriever',
});
