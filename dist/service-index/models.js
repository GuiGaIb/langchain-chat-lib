import { ChatOpenAI } from '@langchain/openai';
import { checkEnv } from '../lib/config/env.js';
const temperatureValidator = (v) => !isNaN(Number(v)) && parseFloat(v) >= 0 && parseFloat(v) <= 2;
checkEnv('OPENAI_API_KEY');
checkEnv('BASE_OPENAI_MODEL');
checkEnv('BASE_OPENAI_TEMPERATURE', temperatureValidator);
checkEnv('FIXING_OPENAI_MODEL');
checkEnv('SUMMARIZATION_OPENAI_MODEL');
checkEnv('SUMMARIZATION_OPENAI_TEMPERATURE', temperatureValidator);
export const BaseOpenAI = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.BASE_OPENAI_MODEL,
    temperature: parseFloat(process.env.BASE_OPENAI_TEMPERATURE),
});
export const FixingOpenAI = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.FIXING_OPENAI_MODEL,
    temperature: parseFloat(process.env.BASE_OPENAI_TEMPERATURE),
});
export const SummarizationOpenAI = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.SUMMARIZATION_OPENAI_MODEL,
    temperature: parseFloat(process.env.SUMMARIZATION_OPENAI_TEMPERATURE),
});
