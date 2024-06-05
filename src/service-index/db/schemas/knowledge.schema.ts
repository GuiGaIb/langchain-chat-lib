import {
  Schema,
  Model,
  HydratedDocument,
  QueryWithHelpers,
  DefaultSchemaOptions,
  Types,
} from 'mongoose';

export const KnowledgeSchema: KnowledgeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
    },
    kind: {
      type: String,
      required: true,
    },
    tags: [String],
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    statics: {
      getCatalog(): Promise<
        Pick<KnowledgeShape, 'name' | 'tags' | 'kind' | 'description'>[]
      > {
        return this.find(
          {},
          {
            name: 1,
            tags: 1,
            kind: 1,
            _id: 0,
          }
        ).exec();
      },
      async getCatalogStringified() {
        const catalog = await this.find(
          {},
          {
            name: 1,
            tags: 1,
            kind: 1,
            description: 1,
            _id: 0,
          }
        ).exec();
        return catalog
          .map(({ name, tags, kind, description }) => {
            return `${name}: ${description}. Tags: ${tags.toString()}. Kind: ${kind}.`;
          })
          .join('\n');
      },
    },
  }
);

KnowledgeSchema.method('stringify', function (): string {
  return `<DOCUMENT START>
Name: ${this.name}
Content: ${this.content}
<DOCUMENT END>`;
});

KnowledgeSchema.query.byNames = function (names): QWH<KnowledgeDoc[]> {
  return this.where('name').in(names);
};

KnowledgeSchema.pre('save', function () {
  this.tags = normalizeTags(this.tags);
});

function normalizeTags(tags: string[]): string[] {
  return tags.map((tag) => tag.toLowerCase().trim());
}

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

export type KnowledgeDoc = HydratedDocument<
  Required<KnowledgeShape>,
  Overrides,
  QueryHelpers
>;
export type KnowledgeModel = Model<
  Required<KnowledgeShape>,
  QueryHelpers,
  Methods,
  Virtuals,
  KnowledgeDoc
> &
  Statics;
export type KnowledgeSchema = Schema<
  Required<KnowledgeShape>,
  KnowledgeModel,
  Methods,
  QueryHelpers,
  Virtuals,
  Statics,
  Omit<DefaultSchemaOptions, 'timestamps'> & { timestamps: true },
  Required<KnowledgeShape>
>;

type Methods = {
  stringify(this: KnowledgeDoc): string;
};
type Statics = {
  getCatalog(
    this: KnowledgeModel
  ): Promise<Pick<KnowledgeShape, 'name' | 'tags' | 'kind' | 'description'>[]>;
  getCatalogStringified(this: KnowledgeModel): Promise<string>;
};
type Virtuals = {};
type QueryHelpers = {
  byNames(this: QWH, names: string[]): QWH<KnowledgeDoc[]>;
};

type QWH<R = any> = QueryWithHelpers<R, KnowledgeDoc, QueryHelpers>;
type Overrides = Methods & Virtuals;
