import {
  DefaultSchemaOptions,
  HydratedDocument,
  Model,
  QueryWithHelpers,
  Schema,
  Types,
} from 'mongoose';

export const ServiceSchema: ServiceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    short_description: {
      type: String,
      required: true,
    },
    long_description: {
      type: String,
      required: true,
    },
    tags: [String],
    cost: {
      type: String,
      required: true,
    },
    requirements: [String],
  },
  {
    timestamps: true,
  }
);

ServiceSchema.pre('save', function () {
  this.tags = normalizeTags(this.tags);
});

ServiceSchema.static(
  'getServiceNames',
  async function getServiceNames(): Promise<string[]> {
    const services = await this.find().exec();
    const names = services.map((service) => service.name);
    return Array.from(new Set(names));
  }
);

ServiceSchema.static(
  'getServicesShort',
  async function getServicesShort(): Promise<string[]> {
    const services = await this.find().exec();
    return services.map((service) => service.stringifyShort());
  }
);

ServiceSchema.static(
  'getServicesLong',
  async function getServicesLong(): Promise<string[]> {
    const services = await this.find().exec();
    return services.map((service) => service.stringifyLong());
  }
);

ServiceSchema.method('stringifyShort', function (): string {
  return `${
    this.name
  }: ${this.short_description}. Requirements: ${this.requirements.map((v, i) => `${i + 1}: ${v}`).join(', ')}`;
});

ServiceSchema.method('stringifyLong', function (): string {
  return `${
    this.name
  }: ${this.long_description}. Requirements: ${this.requirements.map((v, i) => `${i + 1}: ${v}`).join(', ')}. Cost: ${this.cost}.`;
});

ServiceSchema.query.byName = function (name) {
  return this.findOne().where('name').equals(name).orFail();
};

ServiceSchema.query.byNames = function (names) {
  return this.find().where('name').in(names);
};

function normalizeTags(tags: string[]): string[] {
  return tags.map((tag) => tag.toLowerCase().trim());
}

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

export type Service = Omit<
  Required<ServiceShape>,
  'requirements' | 'related_services'
> &
  Methods;

export type ServiceDoc = HydratedDocument<
  Required<ServiceShape>,
  Overrides,
  QueryHelpers
>;
export type ServiceModel = Model<
  Required<ServiceShape>,
  QueryHelpers,
  Methods,
  Virtuals,
  ServiceDoc
> &
  Statics;
export type ServiceSchema = Schema<
  Required<ServiceShape>,
  ServiceModel,
  Methods,
  QueryHelpers,
  Virtuals,
  Statics,
  SchemaOptions,
  Required<ServiceShape>
>;

export type Methods = {
  stringifyShort(this: ServiceDoc): string;
  stringifyLong(this: ServiceDoc): string;
};
export type Statics = {
  getServiceNames(this: ServiceModel): Promise<string[]>;
  getServicesShort(this: ServiceModel): Promise<string[]>;
  getServicesLong(this: ServiceModel): Promise<string[]>;
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
