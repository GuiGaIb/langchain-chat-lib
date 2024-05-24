import {
  Schema,
  Model,
  HydratedDocument,
  DefaultSchemaOptions,
} from 'mongoose';

export type RequirementShape = {
  name: string;
  description: string;
  createdAt: Date;
};

export type Requirement = RequirementShape & Methods;

export type RequirementDoc = HydratedDocument<
  RequirementShape,
  Overrides,
  QueryHelpers
>;
export type RequirementModel = Model<
  RequirementShape,
  QueryHelpers,
  Methods,
  Virtuals,
  RequirementDoc
>;
export type RequirementSchema = Schema<
  RequirementShape,
  RequirementModel,
  Methods,
  QueryHelpers,
  Virtuals,
  Statics,
  SchemaOptions,
  RequirementDoc
>;

type Methods = {};
type Statics = {};
type Virtuals = {};
type QueryHelpers = {};

type Overrides = Methods & Virtuals;
type SchemaOptions = Omit<DefaultSchemaOptions, 'timestamps'> & {
  timestamps: { createdAt: true, updatedAt: false };
};
