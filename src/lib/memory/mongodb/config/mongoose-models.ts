export enum PredefinedMongooseModels {
  ChatMessage = 'LCChat_ChatMessage',
  ChatSession = 'LCChat_ChatSession',
  ConversationStage = 'LCChat_ConversationStage',
  Service = 'LCChat_Service',
  ServiceRequirement = 'LCChat_ServiceRequirement',
}

export const MONGOOSE_MODEL_NAMES = [
  PredefinedMongooseModels.ChatMessage,
  PredefinedMongooseModels.ChatSession,
  PredefinedMongooseModels.ConversationStage,
  PredefinedMongooseModels.Service,
  PredefinedMongooseModels.ServiceRequirement,
] as const;
