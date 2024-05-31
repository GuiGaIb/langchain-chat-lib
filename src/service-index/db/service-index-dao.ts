import { createConnection } from 'mongoose';

import { checkEnv } from '../../lib/config/env.js';
import { ServiceModel, ServiceSchema } from './schemas/service.schema.js';
import { PredefinedMongooseModels } from '../../lib/memory/mongodb/config/mongoose-models.js';

import {
  ConversationStageDoc,
  ConversationStageModel,
  ConversationStageSchema,
} from './schemas/conversation-stage.schema.js';
import { KnowledgeModel, KnowledgeSchema } from './schemas/knowledge.schema.js';

checkEnv('LCCHAT_MONGO_URI');
const uri = process.env.LCCHAT_MONGO_URI!;

const connection = await createConnection(uri).asPromise();

ServiceSchema.obj.name;

export class ServiceIndexDAO {
  static Service: ServiceModel = connection.model(
    PredefinedMongooseModels.Service,
    ServiceSchema,
    PredefinedMongooseModels.Service + 's'
  );

  static ConversationStage: ConversationStageModel = connection.model(
    PredefinedMongooseModels.ConversationStage,
    ConversationStageSchema,
    PredefinedMongooseModels.ConversationStage + 's'
  );

  static Knowledge: KnowledgeModel = connection.model(
    PredefinedMongooseModels.Knowledge,
    KnowledgeSchema,
    PredefinedMongooseModels.Knowledge + 's'
  );
}
