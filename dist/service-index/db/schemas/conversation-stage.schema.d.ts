/// <reference types="mongoose/types/aggregate.js" />
/// <reference types="mongoose/types/callback.js" />
/// <reference types="mongoose/types/collection.js" />
/// <reference types="mongoose/types/connection.js" />
/// <reference types="mongoose/types/cursor.js" />
/// <reference types="mongoose/types/document.js" />
/// <reference types="mongoose/types/error.js" />
/// <reference types="mongoose/types/expressions.js" />
/// <reference types="mongoose/types/helpers.js" />
/// <reference types="mongoose/types/middlewares.js" />
/// <reference types="mongoose/types/indexes.js" />
/// <reference types="mongoose/types/models.js" />
/// <reference types="mongoose/types/mongooseoptions.js" />
/// <reference types="mongoose/types/pipelinestage.js" />
/// <reference types="mongoose/types/populate.js" />
/// <reference types="mongoose/types/query.js" />
/// <reference types="mongoose/types/schemaoptions.js" />
/// <reference types="mongoose/types/schematypes.js" />
/// <reference types="mongoose/types/session.js" />
/// <reference types="mongoose/types/types.js" />
/// <reference types="mongoose/types/utility.js" />
/// <reference types="mongoose/types/validation.js" />
/// <reference types="mongoose/types/virtuals.js" />
/// <reference types="mongoose/types/inferschematype.js" />
/// <reference types="mongoose/types/inferrawdoctype.js" />
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