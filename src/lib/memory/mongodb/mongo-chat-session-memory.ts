import { createConnection } from 'mongoose';
import {
  BaseMessage,
  mapStoredMessagesToChatMessages,
  mapChatMessagesToStoredMessages,
} from '@langchain/core/messages';

import { ChatMemoryWithSummary, Summary } from '../base.js';
import { checkEnv } from '../../config/env.js';
import {
  SessionDoc,
  SessionModel,
  SessionSchema,
} from './schemas/chat-session.schema.js';
import {
  ChatMessageDoc,
  ChatMessageModel,
  ChatMessageSchema,
  ChatMessageShape,
} from './schemas/chat-message-schema.js';
import { PredefinedMongooseModels } from './config/mongoose-models.js';
import { SessionState } from '../../constants.js';
import { summarizeChatMessages } from '../../runnables/summarize-chat-messages.js';

checkEnv('LCCHAT_MONGO_URI');
const uri = process.env.LCCHAT_MONGO_URI!;

const connection = await createConnection(uri).asPromise();

export class MongoChatSessionMemory
  extends ChatMemoryWithSummary
  implements Required<MongoChatSessionMemoryInput>
{
  lc_namespace = ['langchain', 'stores', 'message', 'mongo-chat-session'];

  Session: SessionModel = connection.model(
    PredefinedMongooseModels.ChatSession,
    SessionSchema,
    PredefinedMongooseModels.ChatSession + 's'
  );

  ChatMessage: ChatMessageModel = connection.model(
    PredefinedMongooseModels.ChatMessage,
    ChatMessageSchema,
    PredefinedMongooseModels.ChatMessage + 's'
  );

  readonly userId: string;
  includeStaleSessions: boolean;
  maxMessageCount: number;
  messageCountToSummarize: number;
  private _session: SessionDoc | null = null;

  constructor(fields: MongoChatSessionMemoryInput) {
    super(fields);
    this.userId = fields.userId;
    this.maxMessageCount = Math.round(fields.maxMessageCount);
    this.messageCountToSummarize = Math.round(fields.messageCountToSummarize);
    this.includeStaleSessions = fields.includeStaleSessions ?? false;
  }

  private async getSession(): Promise<SessionDoc> {
    if (this._session) {
      return this._session;
    }

    const states: SessionState[] = this.includeStaleSessions
      ? ['open', 'stale']
      : ['open'];

    const sessions = await this.Session.find()
      .byUserId(this.userId)
      .byState(states)
      .newestFirst()
      .exec();

    const possibleSession = sessions.shift();

    const session =
      possibleSession ?? (await this.Session.create({ userId: this.userId }));

    this._session = session;

    return this._session;
  }

  private async fetchUserMessages(
    options: { summarized?: boolean } = {}
  ): Promise<ChatMessageDoc[]> {
    const { summarized = false } = options;

    const session = await this.getSession();
    const messageIds = session.messages;
    return this.ChatMessage.find()
      .where('_id')
      .in(messageIds)
      .where('userId')
      .equals(this.userId)
      .where('summarized')
      .equals(summarized)
      .sort({ createdAt: 'ascending' })
      .exec();
  }

  private async getUnsummarizedMessagesCount(): Promise<number> {
    return (await this.fetchUserMessages({ summarized: false })).length;
  }

  async getMessages(): Promise<BaseMessage[]> {
    const messages = await this.fetchUserMessages();
    return mapStoredMessagesToChatMessages(messages);
  }

  async addMessage(message: BaseMessage): Promise<void> {
    const session = await this.getSession();
    const mappedMessage = mapChatMessagesToStoredMessages([message])[0];
    const shapedMessage: ChatMessageShape = {
      ...mappedMessage,
      userId: this.userId,
    };
    const storedMessage = await this.ChatMessage.create(shapedMessage);
    session.messages.push(storedMessage._id);
    await session.save();

    const unsummarizedMessagesCount = await this.getUnsummarizedMessagesCount();
    if (
      unsummarizedMessagesCount >= this.maxMessageCount &&
      message._getType() === 'ai'
    ) {
      await this.summarizeMessages();
    }
  }

  async addMessages(messages: BaseMessage[]): Promise<void> {
    const session = await this.getSession();
    const mappedMessages = mapChatMessagesToStoredMessages(messages);
    const shapedMessages: ChatMessageShape[] = mappedMessages.map((msg) => ({
      ...msg,
      userId: this.userId,
    }));
    const storedMessages = await this.ChatMessage.insertMany(shapedMessages);
    session.messages.push(...storedMessages.map((msg) => msg._id));
    await session.save();

    const unsummarizedMessagesCount = await this.getUnsummarizedMessagesCount();
    if (
      unsummarizedMessagesCount >= this.maxMessageCount &&
      messages.some((msg) => msg._getType() === 'ai')
    ) {
      await this.summarizeMessages();
    }
  }

  async getSummary(): Promise<Summary> {
    const session = await this.getSession();
    return session.summary;
  }

  async summarizeMessages(): Promise<void> {
    const session = await this.getSession();
    const messageIds = session.messages;

    const messages = await this.ChatMessage.find()
      .where('_id')
      .in(messageIds)
      .where('userId')
      .equals(this.userId)
      .where('summarized')
      .equals(false)
      .sort({ createdAt: 'ascending' })
      .limit(this.messageCountToSummarize)
      .exec();

    const summarization = await summarizeChatMessages.invoke({
      chat_history: mapStoredMessagesToChatMessages(messages),
    });

    session.summary.push({
      createdAt: new Date(),
      text: summarization,
    });

    await session.save();

    const summarizedMessageIds = messages.map((msg) => msg._id);
    await this.ChatMessage.updateMany(
      { _id: { $in: summarizedMessageIds } },
      { summarized: true }
    );
  }
}

export type MongoChatSessionMemoryInput = {
  userId: string;
  maxMessageCount: number;
  messageCountToSummarize: number;
  includeStaleSessions?: boolean;
};
