import { BaseMessage } from '@langchain/core/messages';
import { ChatMemoryWithSummary, Summary } from '../base.js';
import { SessionDoc, SessionModel } from './schemas/chat-session.schema.js';
import { ChatMessageModel } from './schemas/chat-message-schema.js';
export declare class MongoChatSessionMemory extends ChatMemoryWithSummary implements Required<MongoChatSessionMemoryInput> {
    lc_namespace: string[];
    static Session: SessionModel;
    static ChatMessage: ChatMessageModel;
    static getChatsPreview(options: {
        limit?: number;
    }): Promise<{
        from: string;
        messages: {
            text: string;
            type: string;
            timestamp: string;
        }[];
    }[]>;
    readonly userId: string;
    includeStaleSessions: boolean;
    maxMessageCount: number;
    messageCountToSummarize: number;
    constructor(fields: MongoChatSessionMemoryInput);
    getSession(): Promise<SessionDoc>;
    private fetchUserMessages;
    private getUnsummarizedMessagesCount;
    getMessages(): Promise<BaseMessage[]>;
    addMessage(message: BaseMessage, fbMediaRefPath?: string): Promise<void>;
    addMessages(messages: (BaseMessage & {
        fbMediaRefPath?: string;
    })[]): Promise<void>;
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