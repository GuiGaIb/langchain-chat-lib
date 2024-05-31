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
import { Schema, type Model, type HydratedDocument, type DefaultSchemaOptions, type QueryWithHelpers, type Types } from 'mongoose';
import { type SessionState } from '../../../constants.js';
export declare const SessionSchema: SessionSchema;
export type SessionShape = {
    userId: string;
    messages: Types.ObjectId[];
    state: SessionState;
    summary: Array<{
        text: string;
        createdAt: Date;
    }>;
    _id?: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
};
export type Session = Required<SessionShape> & Methods;
export type SessionDoc = HydratedDocument<Required<SessionShape>, Overrides, QueryHelpers>;
export type SessionModel = Model<Required<SessionShape>, QueryHelpers, Methods, Virtuals, SessionDoc>;
export type SessionSchema = Schema<Required<SessionShape>, SessionModel, Methods, QueryHelpers, Virtuals, Statics, SchemaOptions, Required<SessionShape>, SessionDoc>;
export type Methods = {
    setState(state: SessionState): Promise<void>;
    markAsClosed(): Promise<void>;
    markAsStale(): Promise<void>;
    markAsOpen(): Promise<void>;
};
export type Statics = {};
export type Virtuals = {};
export type QWH<R = any> = QueryWithHelpers<R, SessionDoc, QueryHelpers>;
export type QueryHelpers = {
    byState(this: QWH, states: SessionState[]): QWH<SessionDoc[]>;
    byUserId(this: QWH, userId: string): QWH<SessionDoc[]>;
    newestFirst(this: QWH): QWH<SessionDoc[]>;
};
export type Overrides = Methods & Virtuals;
export type SchemaOptions = Omit<DefaultSchemaOptions, 'timestamps'> & {
    timestamps: true;
};
//# sourceMappingURL=chat-session.schema.d.ts.map