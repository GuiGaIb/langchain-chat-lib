import { BaseMessage } from '@langchain/core/messages';
export declare const generateResponse: import("@langchain/core/runnables").RunnableBinding<{
    cs_rep_name: string;
    company_name: string;
    company_business: string;
    conversation_stages_str: string;
    stage_instructions: string;
    possible_services_str: string;
    applicable_knowledge_str: string;
    chat_summary_text: string;
    chat_history: BaseMessage[];
}, import("@langchain/core/messages").AIMessageChunk, import("@langchain/core/runnables").RunnableConfig>;
//# sourceMappingURL=generate-response.d.ts.map