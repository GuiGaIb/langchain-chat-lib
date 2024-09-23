import { Schema, Model, HydratedDocument, Types } from 'mongoose';
import { StoredMessage } from '@langchain/core/messages';

export const ChatMessageSchema: ChatMessageSchema = new Schema(
  {
    data: {
      content: String,
      role: String,
    },
    type: String,
    summarized: {
      $type: Boolean,
      default: false,
    },
    userId: {
      $type: String,
      required: true,
      index: true,
      immutable: true,
    },
    fbMediaRefPath: {
      $type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    typeKey: '$type',
  }
);

export type ChatMessageShape = StoredMessage & {
  summarized?: boolean;
  userId: string;
  fbMediaRefPath?: string;

  _id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ChatMessageDoc = HydratedDocument<Required<ChatMessageShape>>;
export type ChatMessageModel = Model<
  Required<ChatMessageShape>,
  {},
  {},
  {},
  ChatMessageDoc
>;
export type ChatMessageSchema = Schema<
  Required<ChatMessageShape>,
  ChatMessageModel
>;
