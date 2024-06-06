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

  static Session: SessionModel = connection.model(
    PredefinedMongooseModels.ChatSession,
    SessionSchema,
    PredefinedMongooseModels.ChatSession + 's'
  );

  static ChatMessage: ChatMessageModel = connection.model(
    PredefinedMongooseModels.ChatMessage,
    ChatMessageSchema,
    PredefinedMongooseModels.ChatMessage + 's'
  );

  static async getChatsPreview(options: { limit?: number }) {
    const { limit = 1000 } = options;
    const messages = await this.ChatMessage.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();

    let chats: {
      [userId: string]: { text: string; type: string; timestamp: string }[];
    } = {};
    chats = messages.reduce((acc, message) => {
      const userId = message.userId;
      if (!acc[userId]) {
        acc[userId] = [];
      }
      acc[userId].push({
        text: message.data.content,
        type: message.type,
        timestamp: message.createdAt.toISOString(),
      });
      return acc;
    }, chats);

    const chatsArray: {
      from: string;
      messages: { text: string; type: string; timestamp: string }[];
    }[] = [];
    for (const userId in chats) {
      chatsArray.push({ from: userId, messages: chats[userId] });
    }

    return chatsArray;
  }

  readonly userId: string;
  includeStaleSessions: boolean;
  maxMessageCount: number;
  messageCountToSummarize: number;

  constructor(fields: MongoChatSessionMemoryInput) {
    super(fields);
    this.userId = fields.userId;
    this.maxMessageCount = Math.round(fields.maxMessageCount);
    this.messageCountToSummarize = Math.round(fields.messageCountToSummarize);
    this.includeStaleSessions = fields.includeStaleSessions ?? false;
  }

  async getSession(): Promise<SessionDoc> {
    const states: SessionState[] = this.includeStaleSessions
      ? ['open', 'stale']
      : ['open'];

    const sessions = await MongoChatSessionMemory.Session.find()
      .byUserId(this.userId)
      .byState(states)
      .newestFirst()
      .exec();

    const possibleSession = sessions.shift();

    const session =
      possibleSession ??
      (await MongoChatSessionMemory.Session.create({ userId: this.userId }));

    if (sessions.length) {
      await Promise.all(sessions.map((s) => {
        s.state = 'closed';
        return s.save();
      }));
    }

    return session;
  }

  private async fetchUserMessages(
    options: { summarized?: boolean } = {}
  ): Promise<ChatMessageDoc[]> {
    const { summarized = false } = options;

    const session = await this.getSession();
    const messageIds = session.messages;
    return MongoChatSessionMemory.ChatMessage.find()
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
    const storedMessage = await MongoChatSessionMemory.ChatMessage.create(
      shapedMessage
    );
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
    const storedMessages = await MongoChatSessionMemory.ChatMessage.insertMany(
      shapedMessages
    );
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

    const messages = await MongoChatSessionMemory.ChatMessage.find()
      .where('_id')
      .in(messageIds)
      .where('userId')
      .equals(this.userId)
      .where('summarized')
      .equals(false)
      .sort({ createdAt: 'ascending' })
      .limit(this.messageCountToSummarize)
      .exec();

    const summarization = await summarizeChatMessages.invoke(
      {
        chat_history: mapStoredMessagesToChatMessages(messages),
      },
      { runName: 'summarize_chat_messages' }
    );

    session.summary.push({
      createdAt: new Date(),
      text: summarization,
    });

    await session.save();

    const summarizedMessageIds = messages.map((msg) => msg._id);
    await MongoChatSessionMemory.ChatMessage.updateMany(
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
