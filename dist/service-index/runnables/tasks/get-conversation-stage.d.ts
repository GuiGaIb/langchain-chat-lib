import { BaseMessage } from '@langchain/core/messages';
export declare const getConversationStage: import("@langchain/core/runnables").RunnableBinding<{
    chat_summary_text: string;
    chat_history: BaseMessage[];
    conversation_stages_str: string;
}, {
    conversation_stage: string;
}, import("@langchain/core/runnables").RunnableConfig>;
//# sourceMappingURL=get-conversation-stage.d.ts.map