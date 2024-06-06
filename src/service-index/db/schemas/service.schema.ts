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
    statics: {
      async getServiceNames() {
        const services = await this.find().exec();
        const names = services.map((service) => service.name);
        return Array.from(new Set(names));
      },
      async getServicesLong() {
        const services = await this.find().exec();
        return services.map(
          (service) =>
            `-----
Name: ${service.name}
Description: ${service.long_description}
Requirements: ${service.requirements.toString()}
Cost: ${service.cost}
-----`
        );
      },
      async getServicesLongByNames(names) {
        const services = await this.find().where('name').in(names).exec();
        return services.map(
          (service) => `-----
Name: ${service.name}
Description: ${service.long_description}
Requirements: ${service.requirements.toString()}
Cost: ${service.cost}
-----`
        );
      },
      async getServicesShort() {
        const services = await this.find().exec();
        return services.map(
          (service) =>
            `-----
Name: ${service.name}
Description: ${service.short_description}
Requirements: ${service.requirements.toString()}
Tags: ${service.tags.toString()}
-----`
        );
      },
      async getServicesShortByNames(names) {
        const services = await this.find().where('name').in(names).exec();
        return services.map(
          (service) => `-----
Name: ${service.name}
Description: ${service.short_description}
Requirements: ${service.requirements.toString()}
Tags: ${service.tags.toString()}
-----`
        );
      },
    },
  }
);

ServiceSchema.pre('save', function () {
  this.tags = normalizeTags(this.tags);
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

export type Methods = {};
export type Statics = {
  getServiceNames(this: ServiceModel): Promise<string[]>;
  getServicesShort(this: ServiceModel): Promise<string[]>;
  getServicesLong(this: ServiceModel): Promise<string[]>;
  getServicesShortByNames(
    this: ServiceModel,
    names: string[]
  ): Promise<string[]>;
  getServicesLongByNames(
    this: ServiceModel,
    names: string[]
  ): Promise<string[]>;
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
