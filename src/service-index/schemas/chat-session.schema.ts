import {
  Schema,
  Model,
  HydratedDocument,
  DefaultSchemaOptions,
} from 'mongoose';
import { StoredMessage } from '@langchain/core/messages';

import { RequirementCondition, SessionState } from './constants.js';

export type SessionShape = {
  userId: string;
  messages: StoredMessage[];
  state: SessionState;
  contextList: string[];
  requirements: {
    name: string;
    condition: RequirementCondition;
  }[];

  createdAt?: Date;
  updatedAt?: Date;
};

export type Session = Required<SessionShape> & Methods;

export type SessionDoc = HydratedDocument<
  Required<SessionShape>,
  Overrides,
  QueryHelpers
>;
export type SessionModel = Model<
  Required<SessionShape>,
  QueryHelpers,
  Methods,
  Virtuals,
  SessionDoc
>;
export type SessionSchema = Schema<
  Required<SessionShape>,
  SessionModel,
  Methods,
  QueryHelpers,
  Virtuals,
  Statics,
  SchemaOptions,
  SessionDoc
>;

type Methods = {};
type Statics = {};
type Virtuals = {};
type QueryHelpers = {};

type Overrides = Methods & Virtuals;
type SchemaOptions = Omit<DefaultSchemaOptions, 'timestamps'> & {
  timestamps: true;
};
