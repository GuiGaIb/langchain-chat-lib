import { createConnection } from 'mongoose';
import { mapStoredMessagesToChatMessages, mapChatMessagesToStoredMessages, } from '@langchain/core/messages';
import { ChatMemoryWithSummary } from '../base.js';
import { checkEnv } from '../../config/env.js';
import { SessionSchema, } from './schemas/chat-session.schema.js';
import { ChatMessageSchema, } from './schemas/chat-message-schema.js';
import { PredefinedMongooseModels } from './config/mongoose-models.js';
import { summarizeChatMessages } from '../../runnables/summarize-chat-messages.js';
checkEnv('LCCHAT_MONGO_URI');
const uri = process.env.LCCHAT_MONGO_URI;
const connection = await createConnection(uri).asPromise();
export class MongoChatSessionMemory extends ChatMemoryWithSummary {
    lc_namespace = ['langchain', 'stores', 'message', 'mongo-chat-session'];
    static Session = connection.model(PredefinedMongooseModels.ChatSession, SessionSchema, PredefinedMongooseModels.ChatSession + 's');
    static ChatMessage = connection.model(PredefinedMongooseModels.ChatMessage, ChatMessageSchema, PredefinedMongooseModels.ChatMessage + 's');
    static async getChatsPreview(options) {
        const { limit = 1000 } = options;
        const messages = await this.ChatMessage.find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .exec();
        let chats = {};
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
        const chatsArray = [];
        for (const userId in chats) {
            chatsArray.push({ from: userId, messages: chats[userId] });
        }
        return chatsArray;
    }
    userId;
    includeStaleSessions;
    maxMessageCount;
    messageCountToSummarize;
    constructor(fields) {
        super(fields);
        this.userId = fields.userId;
        this.maxMessageCount = Math.round(fields.maxMessageCount);
        this.messageCountToSummarize = Math.round(fields.messageCountToSummarize);
        this.includeStaleSessions = fields.includeStaleSessions ?? false;
    }
    async getSession() {
        const states = this.includeStaleSessions
            ? ['open', 'stale']
            : ['open'];
        const sessions = await MongoChatSessionMemory.Session.find()
            .byUserId(this.userId)
            .byState(states)
            .newestFirst()
            .exec();
        const possibleSession = sessions.shift();
        const session = possibleSession ??
            (await MongoChatSessionMemory.Session.create({ userId: this.userId }));
        if (sessions.length) {
            await Promise.all(sessions.map((s) => {
                s.state = 'closed';
                return s.save();
            }));
        }
        return session;
    }
    async fetchUserMessages(options = {}) {
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
    async getUnsummarizedMessagesCount() {
        return (await this.fetchUserMessages({ summarized: false })).length;
    }
    async getMessages() {
        const messages = await this.fetchUserMessages();
        return mapStoredMessagesToChatMessages(messages);
    }
    async addMessage(message, fbMediaRefPath) {
        const session = await this.getSession();
        const mappedMessage = mapChatMessagesToStoredMessages([message])[0];
        const shapedMessage = {
            ...mappedMessage,
            userId: this.userId,
            fbMediaRefPath,
        };
        const storedMessage = await MongoChatSessionMemory.ChatMessage.create(shapedMessage);
        session.messages.push(storedMessage._id);
        await session.save();
        const unsummarizedMessagesCount = await this.getUnsummarizedMessagesCount();
        if (unsummarizedMessagesCount >= this.maxMessageCount &&
            message._getType() === 'ai') {
            await this.summarizeMessages();
        }
    }
    async addMessages(messages) {
        const session = await this.getSession();
        const mappedMessages = messages.map((msg) => ({
            ...mapChatMessagesToStoredMessages([msg])[0],
            fbMediaRefPath: msg.fbMediaRefPath,
        }));
        const shapedMessages = mappedMessages.map((msg) => ({
            ...msg,
            userId: this.userId,
            fbMediaRefPath: msg.fbMediaRefPath,
        }));
        const storedMessages = await MongoChatSessionMemory.ChatMessage.insertMany(shapedMessages);
        session.messages.push(...storedMessages.map((msg) => msg._id));
        await session.save();
        const unsummarizedMessagesCount = await this.getUnsummarizedMessagesCount();
        if (unsummarizedMessagesCount >= this.maxMessageCount &&
            messages.some((msg) => msg._getType() === 'ai')) {
            await this.summarizeMessages();
        }
    }
    async getSummary() {
        const session = await this.getSession();
        return session.summary;
    }
    async summarizeMessages() {
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
        const summarization = await summarizeChatMessages.invoke({
            chat_history: mapStoredMessagesToChatMessages(messages),
        }, { runName: 'summarize_chat_messages' });
        session.summary.push({
            createdAt: new Date(),
            text: summarization,
        });
        await session.save();
        const summarizedMessageIds = messages.map((msg) => msg._id);
        await MongoChatSessionMemory.ChatMessage.updateMany({ _id: { $in: summarizedMessageIds } }, { summarized: true });
    }
}
