import { Runnable } from '@langchain/core/runnables';
import { AIMessage } from '@langchain/core/messages';
import { MongoChatSessionMemoryInput } from '../../../lib/memory/mongodb/mongo-chat-session-memory.js';
export declare const CustomerServiceChain: CustomerServiceChain;
export type CustomerServiceChain = Runnable<MongoChatSessionMemoryInput & {
    cs_rep_name: string;
    company_name: string;
    company_business: string;
}, AIMessage>;
//# sourceMappingURL=customer-service-chain.d.ts.map