import {
  Schema,
  Model,
  HydratedDocument,
  DefaultSchemaOptions,
} from 'mongoose';
import { stringify } from 'querystring';

export const ConversationStageSchema: ConversationStageSchema = new Schema(
  {
    numeral: {
      type: String,
      required: true,
      unique: true,
      index: true,
      validate: {
        validator: (v: string) => /^\d+(\.\d+)?$/.test(v),
        message:
          'The stage numeral must be a positive number or a positive number followed by a decimal point and another positive number.',
      },
    },
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    requirements: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ConversationStageSchema.static(
  'getStringifiedStages',
  async function (): Promise<string> {
    const stages = await this.find().sort({ numeral: 1 }).exec();
    return stages.map((stage) => stage.stringify()).join('\n');
  }
);

ConversationStageSchema.method('stringify', function () {
  return `${
    this.numeral
  } - ${this.name}: ${this.description}. Requirements: ${this.requirements.map((v, i) => `${i + 1}: ${v}`).join(', ')}`;
});

export type ConversationStageShape = {
  numeral: string;
  name: string;
  description: string;
  instructions: string;
  requirements: string[];

  createdAt?: Date;
  updatedAt?: Date;
};

export type ConversationStage = Required<ConversationStageShape> & Methods;

export type ConversationStageDoc = HydratedDocument<
  Required<ConversationStageShape>,
  Overrides,
  QueryHelpers
>;
export type ConversationStageModel = Model<
  Required<ConversationStageShape>,
  QueryHelpers,
  Methods,
  Virtuals,
  ConversationStageDoc
> &
  Statics;
export type ConversationStageSchema = Schema<
  Required<ConversationStageShape>,
  ConversationStageModel,
  Methods,
  QueryHelpers,
  Virtuals,
  Statics,
  Omit<DefaultSchemaOptions, 'timestamps'> & { timestamps: true },
  Required<ConversationStageShape>
>;

type Methods = {
  stringify(this: ConversationStageDoc): string;
};
type Statics = {
  getStringifiedStages(this: ConversationStageModel): Promise<string>;
};
type Virtuals = {};
type QueryHelpers = {};

type Overrides = Methods & Virtuals;
