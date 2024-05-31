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
import { Schema, Model, HydratedDocument, QueryWithHelpers, DefaultSchemaOptions, Types } from 'mongoose';
export declare const KnowledgeSchema: KnowledgeSchema;
export type KnowledgeShape = {
    name: string;
    content: string;
    description: string;
    kind: string;
    tags: string[];
    _id?: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
};
export type KnowledgeDoc = HydratedDocument<Required<KnowledgeShape>, Overrides, QueryHelpers>;
export type KnowledgeModel = Model<Required<KnowledgeShape>, QueryHelpers, Methods, Virtuals, KnowledgeDoc> & Statics;
export type KnowledgeSchema = Schema<Required<KnowledgeShape>, KnowledgeModel, Methods, QueryHelpers, Virtuals, Statics, Omit<DefaultSchemaOptions, 'timestamps'> & {
    timestamps: true;
}, Required<KnowledgeShape>>;
type Methods = {
    stringify(this: KnowledgeDoc): string;
};
type Statics = {
    getCatalog(this: KnowledgeModel): Promise<Pick<KnowledgeShape, 'name' | 'tags' | 'kind' | 'description'>[]>;
    getCatalogStringified(this: KnowledgeModel): Promise<string>;
};
type Virtuals = {};
type QueryHelpers = {
    byNames(this: QWH, names: string[]): QWH<KnowledgeDoc[]>;
};
type QWH<R = any> = QueryWithHelpers<R, KnowledgeDoc, QueryHelpers>;
type Overrides = Methods & Virtuals;
export {};
//# sourceMappingURL=knowledge.schema.d.ts.map