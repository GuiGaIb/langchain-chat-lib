import { BaseMessage } from '@langchain/core/messages';
export declare const getPossibleServices: import("@langchain/core/runnables").RunnableBinding<{
    chat_summary_text: string;
    chat_history: BaseMessage[];
    conversation_stages_str: string;
}, {
    possible_services: string[];
}, import("@langchain/core/runnables").RunnableConfig>;
//# sourceMappingURL=get-possible-services.d.ts.map