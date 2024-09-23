import { DefaultSchemaOptions, HydratedDocument, Model, QueryWithHelpers, Schema, Types } from 'mongoose';
export declare const ServiceSchema: ServiceSchema;
export type ServiceShape = {
    name: string;
    short_description: string;
    long_description: string;
    tags: string[];
    cost: string;
    requirements: string[];
    _id?: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
};
export type Service = Omit<Required<ServiceShape>, 'requirements' | 'related_services'> & Methods;
export type ServiceDoc = HydratedDocument<Required<ServiceShape>, Overrides, QueryHelpers>;
export type ServiceModel = Model<Required<ServiceShape>, QueryHelpers, Methods, Virtuals, ServiceDoc> & Statics;
export type ServiceSchema = Schema<Required<ServiceShape>, ServiceModel, Methods, QueryHelpers, Virtuals, Statics, SchemaOptions, Required<ServiceShape>>;
export type Methods = {};
export type Statics = {
    getServiceNames(this: ServiceModel): Promise<string[]>;
    getServicesShort(this: ServiceModel): Promise<string[]>;
    getServicesLong(this: ServiceModel): Promise<string[]>;
    getServicesShortByNames(this: ServiceModel, names: string[]): Promise<string[]>;
    getServicesLongByNames(this: ServiceModel, names: string[]): Promise<string[]>;
};
export type Virtuals = {};
type QWH<R = any> = QueryWithHelpers<R, ServiceDoc, QueryHelpers>;
type QueryHelpers = {
    byName(this: QWH, name: string): QWH<ServiceDoc>;
    byNames(this: QWH, names: string[]): QWH<ServiceDoc[]>;
};
export type Overrides = Methods & Virtuals;
export type SchemaOptions = Omit<DefaultSchemaOptions, 'timestamps'> & {
    timestamps: true;
};
export {};
//# sourceMappingURL=service.schema.d.ts.map