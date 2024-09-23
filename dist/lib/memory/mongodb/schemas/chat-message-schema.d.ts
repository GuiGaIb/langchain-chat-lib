import { Schema, Model, HydratedDocument, Types } from 'mongoose';
import { StoredMessage } from '@langchain/core/messages';
export declare const ChatMessageSchema: ChatMessageSchema;
export type ChatMessageShape = StoredMessage & {
    summarized?: boolean;
    userId: string;
    fbMediaRefPath?: string;
    _id?: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
};
export type ChatMessageDoc = HydratedDocument<Required<ChatMessageShape>>;
export type ChatMessageModel = Model<Required<ChatMessageShape>, {}, {}, {}, ChatMessageDoc>;
export type ChatMessageSchema = Schema<Required<ChatMessageShape>, ChatMessageModel>;
//# sourceMappingURL=chat-message-schema.d.ts.map