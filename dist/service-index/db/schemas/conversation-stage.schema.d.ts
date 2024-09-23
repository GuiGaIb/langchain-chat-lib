import { Schema, Model, HydratedDocument, DefaultSchemaOptions } from 'mongoose';
export declare const ConversationStageSchema: ConversationStageSchema;
export type ConversationStageShape = {
    numeral: string;
    name: string;
    description: string;
    instructions: string;
    requirements: string[];
    createdAt?: Date;
    updatedAt?: Date;
};
export type ConversationStage = Required<ConversationStageShape> & Methods;
export type ConversationStageDoc = HydratedDocument<Required<ConversationStageShape>, Overrides, QueryHelpers>;
export type ConversationStageModel = Model<Required<ConversationStageShape>, QueryHelpers, Methods, Virtuals, ConversationStageDoc> & Statics;
export type ConversationStageSchema = Schema<Required<ConversationStageShape>, ConversationStageModel, Methods, QueryHelpers, Virtuals, Statics, Omit<DefaultSchemaOptions, 'timestamps'> & {
    timestamps: true;
}, Required<ConversationStageShape>>;
type Methods = {
    stringify(this: ConversationStageDoc): string;
};
type Statics = {
    getStringifiedStages(this: ConversationStageModel): Promise<string>;
};
type Virtuals = {};
type QueryHelpers = {};
type Overrides = Methods & Virtuals;
export {};
//# sourceMappingURL=conversation-stage.schema.d.ts.map