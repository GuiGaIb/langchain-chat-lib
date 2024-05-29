import { Schema, Model, HydratedDocument } from 'mongoose';

import { getStringKeys } from '../../utils/string-keys.js';

export const getRequirementSchema = <ReqNames extends string>(
  options: RequirementDefinition<ReqNames>
) => {
  const reqNames = getStringKeys(options);
  const schema: RequirementSchema<ReqNames> = new Schema({
    name: {
      type: Schema.Types.Mixed,
      required: true,
      enum: reqNames,
      index: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    }
  });

  return schema;
};

export type RequirementDefinition<ReqNames extends string = string> = {
  [name in ReqNames]: {
    description: string;
  };
};

export type RequirementShape<ReqNames extends string = string> = {
  name: ReqNames;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Requirement<ReqNames extends string = string> =
  Required<RequirementShape<ReqNames>> & Methods;

export type RequirementDoc<ReqNames extends string = string> = HydratedDocument<
  Required<RequirementShape<ReqNames>>,
  Overrides,
  QueryHelpers
>;
export type RequirementModel<ReqNames extends string = string> = Model<
  Required<RequirementShape<ReqNames>>,
  QueryHelpers,
  Methods,
  Virtuals,
  RequirementDoc<ReqNames>
>;
export type RequirementSchema<ReqNames extends string = string> = Schema<
  Required<RequirementShape<ReqNames>>,
  RequirementModel<ReqNames>,
  Methods,
  QueryHelpers,
  Virtuals,
  Statics,
  {
    typeKey: 'type';
    id: true;
    _id: true;
    timestamps: true;
    versionKey: '__v';
  },
  RequirementDoc<ReqNames>
>;

type Methods = {};
type Statics = {};
type Virtuals = {};
type QueryHelpers = {};

type Overrides = Methods & Virtuals;
