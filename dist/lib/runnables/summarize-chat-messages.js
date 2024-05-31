import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate, MessagesPlaceholder, } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { checkEnv } from '../config/env.js';
checkEnv('OPENAI_API_KEY');
checkEnv('SUMMARIZATION_OPENAI_MODEL');
checkEnv('SUMMARIZATION_OPENAI_TEMPERATURE', (v) => !isNaN(+v));
const prompt = ChatPromptTemplate.fromMessages([
    new MessagesPlaceholder('chat_history'),
    [
        'user',
        'Analyze the chat messages above and summarize them into a single summary message. Balance the summary content between it being short but including all the important details. Use declarative sentences and always refer to the participants as "the user" (human) and "the assistant" (AI).',
    ],
]);
const chat_model = new ChatOpenAI({
    model: process.env['SUMMARIZATION_OPENAI_MODEL'],
    temperature: +process.env['SUMMARIZATION_OPENAI_TEMPERATURE'],
});
export const summarizeChatMessages = prompt
    .pipe(chat_model)
    .pipe(new StringOutputParser());
