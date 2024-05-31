import { BaseMessage } from '@langchain/core/messages';
import { ChatMemoryWithSummary, Summary } from '../base.js';
import { SessionModel } from './schemas/chat-session.schema.js';
import { ChatMessageModel } from './schemas/chat-message-schema.js';
export declare class MongoChatSessionMemory extends ChatMemoryWithSummary implements Required<MongoChatSessionMemoryInput> {
    lc_namespace: string[];
    Session: SessionModel;
    ChatMessage: ChatMessageModel;
    readonly userId: string;
    includeStaleSessions: boolean;
    maxMessageCount: number;
    messageCountToSummarize: number;
    private _session;
    constructor(fields: MongoChatSessionMemoryInput);
    private getSession;
    private fetchUserMessages;
    private getUnsummarizedMessagesCount;
    getMessages(): Promise<BaseMessage[]>;
    addMessage(message: BaseMessage): Promise<void>;
    addMessages(messages: BaseMessage[]): Promise<void>;
    getSummary(): Promise<Summary>;
    summarizeMessages(): Promise<void>;
}
export type MongoChatSessionMemoryInput = {
    userId: string;
    maxMessageCount: number;
    messageCountToSummarize: number;
    includeStaleSessions?: boolean;
};
//# sourceMappingURL=mongo-chat-session-memory.d.ts.map