import {
  Schema,
  Model,
  HydratedDocument,
  QueryWithHelpers,
  DefaultSchemaOptions,
} from 'mongoose';
import { StoredMessage } from '@langchain/core/messages';

export const SESSION_STATES = {
  OPEN: 'open',
  CLOSED: 'closed',
  STALE: 'stale',
} as const;
export type SESSION_STATE =
  (typeof SESSION_STATES)[keyof typeof SESSION_STATES];
export const SESSION_STATE_VALUES = Object.values(SESSION_STATES);

export const REQUIREMENT_CONDITIONS = {
  MET: 'met',
  UNMET: 'unmet',
  PENDING: 'pending',
} as const;
export type REQUIREMENT_CONDITION =
  (typeof REQUIREMENT_CONDITIONS)[keyof typeof REQUIREMENT_CONDITIONS];
export const REQUIREMENT_CONDITION_VALUES = Object.values(
  REQUIREMENT_CONDITIONS
);

export type SessionShape = {
  userId: string;
  messages: StoredMessage[];
  state: SESSION_STATE;
  requirements: {
    name: string;
    condition: REQUIREMENT_CONDITION;
  }[];

  createdAt: Date;
  updatedAt: Date;
};

export type Session = SessionShape & Methods;

export type SessionDoc = HydratedDocument<
  SessionShape,
  Overrides,
  QueryHelpers
>;
export type SessionModel = Model<
  SessionShape,
  QueryHelpers,
  Methods,
  Virtuals,
  SessionDoc
>;
export type SessionSchema = Schema<
  SessionShape,
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

type QWH<R = any> = QueryWithHelpers<R, SessionDoc, QueryHelpers>;
type Overrides = Methods & Virtuals;
type SchemaOptions = Omit<DefaultSchemaOptions, 'timestamps'> & {
  timestamps: true;
};
