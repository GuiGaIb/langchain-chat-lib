// import { HumanMessage, AIMessage } from '@langchain/core/messages';

// import { inputMap } from './lib/service-index/runnables/get-conversation-stage.js';

// const response = await inputMap.invoke({
//   chat_context: `The user's name is Guillermo.\nHe likes pizza and football.`,
//   chat_messages: [
//     new HumanMessage('Hello there!'),
//     new AIMessage('Hi! How can I help you today?'),
//     new HumanMessage('I need help with my order.'),
//   ],
//   stages: [
//     {
//       n: 1,
//       name: 'Greeting',
//       description:
//         'Customer service representative greets the user and asks how they can help.',
//       instructions: 'Greeting',
//       requirements: ['This stage should be selected every time the conversation starts.'],
//     },
//     {
//       n: 2,
//       name: 'Identify need',
//       description:
//         'Customer service must identify the user\'s need and ask questions to understand the problem',
//       instructions: 'Identify need',
//       requirements: ['This stage should be selected when the user asks for help.'],
//     },
//     {
//       n: 3,
//       name: 'Objections',
//       description: 'Customer service must address any objections the user has.',
//       instructions: 'Objections',
//       requirements: ['This stage should be selected when the user expresses doubts, concerns, or objections.'],
//     }
//   ],
// });

// console.log(response);

import { AIMessage, HumanMessage } from '@langchain/core/messages';
process.env['OPENAI_API_KEY'] =
  'sk-proj-gAziJ3QnUXOZIsVEim7gT3BlbkFJrjEW0NZJ4mfGU45Sckj7';
process.env['SUMMARIZATION_OPENAI_MODEL'] = 'gpt-4o';
process.env['SUMMARIZATION_OPENAI_TEMPERATURE'] = '0.5';

process.env['LCCHAT_MONGO_URI'] =
  'mongodb+srv://guigaibmex:O07gV3wqOQcSitg4@devcluster.0mxnzqg.mongodb.net/test_v2?retryWrites=true&w=majority&appName=DevCluster';

const { MongoChatSessionMemory } = await import(
  './lib/memory/mongodb/mongo-chat-session-memory.js'
);

const memory = new MongoChatSessionMemory({
  userId: 'test',
  maxMessageCount: 10,
  messageCountToSummarize: 5,
  includeStaleSessions: false,
});

process.env['MESSAGE_DEBOUNCE_CLEANUP_TIME_MS'] = String(1000 * 60);
process.env['MESSAGE_DEBOUNCE_TIME_MS'] = String(1000 * 5);

const { MemoryBackedDebouncer } = await import(
  './lib/utils/memory-backed-debouncer.js'
);

const debouncer = MemoryBackedDebouncer.getInstance({
  memory,
  async onTrigger() {
    const messages = await this.memory.getMessages();
    const count = messages.length;
    console.log('Triggered!', 'message count:', count);
  },
  userId: memory.userId,
});

const startingMessages = [
  new HumanMessage('Hello there!'),
  new AIMessage('Hi! How can I help you today?'),
  new HumanMessage('I need help with my order.'),
  new AIMessage('Sure! What can I help you with?'),
  new HumanMessage('I need to cancel my order.'),
  new AIMessage(
    'I can help you with that. Please provide me with your order number.'
  ),
  new HumanMessage('123456'),
];

for (const message of startingMessages) {
  await debouncer.queueMessage(message);
}

await stall(1000 * 5);
await memory.addMessage(
  new AIMessage('Thank you. Your order has been successfully canceled.')
);

await debouncer.queueMessage(new HumanMessage('Thank you!'));
await stall(1000);
await debouncer.queueMessage(
  new HumanMessage('Can you help me create a new order?')
);
await stall(1000 * 2);
await debouncer.queueMessage(new HumanMessage('I would like to see the menu.'));

await stall(1000 * 5);
await memory.addMessage(
  new AIMessage(
    'Of course! You will find the menu at this link: https://example.com/menu'
  )
);

await stall(1000 * 1);
await memory.summarizeMessages();
const summary = await memory.getSummaryAsText();
console.log('Summary:', summary);

debouncer.terminate();

await memory.ChatMessage.db.close();

function stall(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
