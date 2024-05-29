import {
  DefaultSchemaOptions,
  HydratedDocument,
  Model,
  QueryWithHelpers,
  Schema,
  Types,
} from 'mongoose';
import { Requirement } from './requirement.schema.js';

export type ServiceShape = {
  name: string;
  short_description: string;
  long_description: string;
  tags: string[];
  cost: string;
  requirements: Types.ObjectId[];
  related_services: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
};

export type Service = Omit<ServiceShape, 'requirements' | 'related_services'> & Methods & {
  requirements: Requirement[];
  related_services: Service[];
}

export type ServiceDoc = HydratedDocument<
  ServiceShape,
  Overrides,
  QueryHelpers
>;
export type ServiceModel = Model<
  ServiceShape,
  QueryHelpers,
  Methods,
  Virtuals,
  ServiceDoc
>;
export type ServiceSchema = Schema<
  ServiceShape,
  ServiceModel,
  Methods,
  QueryHelpers,
  Virtuals,
  Statics,
  SchemaOptions,
  ServiceDoc
>;

type Methods = {};
type Statics = {};
type Virtuals = {};
type QueryHelpers = {};

type QWH<R = any> = QueryWithHelpers<R, ServiceDoc, QueryHelpers>;
type Overrides = Methods & Virtuals & {};
type SchemaOptions = Omit<DefaultSchemaOptions, 'timestamps'> & {
  timestamps: true;
};
