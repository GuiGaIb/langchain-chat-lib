import {
  Schema,
  type Model,
  type HydratedDocument,
  type DefaultSchemaOptions,
  type QueryWithHelpers,
  type Types,
} from 'mongoose';

import { SESSION_STATE_VALUES, type SessionState } from '../../../constants.js';

export const SessionSchema: SessionSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      immutable: true,
      index: true,
    },
    messages: [Schema.Types.ObjectId],
    state: {
      type: String,
      enum: SESSION_STATE_VALUES,
      default: 'open',
    },
    summary: [
      {
        text: { type: String, required: true },
        createdAt: { type: Schema.Types.Date, default: () => new Date() },
      },
    ],
  },
  {
    timestamps: true,
    methods: {
      async setState(state) {
        this.state = state;
        await this.save();
      },
      async markAsClosed() {
        await this.setState('closed');
      },
      async markAsStale() {
        await this.setState('stale');
      },
      async markAsOpen() {
        await this.setState('open');
      },
    },
    query: {
      byState(states) {
        return this.find().where('state').in(states);
      },
      byUserId(userId) {
        return this.find({ userId });
      },
      newestFirst() {
        return this.sort({ createdAt: -1 });
      },
    },
  }
);

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
  Required<SessionShape>,
  SessionDoc
>;

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
