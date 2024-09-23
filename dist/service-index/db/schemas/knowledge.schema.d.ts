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