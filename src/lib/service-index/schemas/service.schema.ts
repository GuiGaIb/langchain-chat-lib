// import {
//   DefaultSchemaOptions,
//   HydratedDocument,
//   Model,
//   Schema,
//   Types,
// } from 'mongoose';

// export const SESSION_STATE = {
//   OPEN: 'open',
//   CLOSED: 'closed',
// } as const;
// export const SESSION_STATES = Object.values(SESSION_STATE);
// export type SessionState = typeof SESSION_STATE[keyof typeof SESSION_STATE];

// export const ServiceSchemaOptions: ServiceSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   short_description: {
//     type: String,
//     required: true,
//   },
//   long_description: {
//     type: String,
//     required: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   tags: {
//     type: [String],
//     required: true,
//   },
// }, {
//   virtuals: {
//     categories: {
//       get() {
//         return this.category.split('.')
//       }
//     }
//   }
// });

// export interface IService {
//   id: string;
//   name: string;
//   short_description: string;
//   long_description: string;
//   category: string;
//   tags: string[];
//   cost: {
//     service_cost?: {
//       amount: number;
//       currency: string;
//     };
//     service_fee?: {
//       amount: number;
//       currency: string;
//     };
//     notes?: string;
//   };
//   requirements: Types.ObjectId[];
//   related_services: Types.ObjectId[];
//   createdAt: Date;
//   updatedAt: Date;
// }

// type SchemaOptions = Omit<DefaultSchemaOptions, 'timestamps'> & {
//   timestamps: true;
// };

// export type ServiceDocument = HydratedDocument<IService, Overrides>;
// export type ServiceModel = Model<IService, {}, {}, Virtuals, ServiceDocument>;
// export type ServiceSchema = Schema<
//   IService,
//   ServiceModel,
//   {},
//   {},
//   Virtuals,
//   {},
//   SchemaOptions,
//   IService,
//   ServiceDocument
// >;

// type Virtuals = {
//   categories: string[];
// };
// type Overrides = Virtuals;

// export type DocType = {};
// export type Doc = HydratedDocument<DocType>;

import {
  DefaultSchemaOptions,
  HydratedArraySubdocument,
  HydratedDocument,
  Model,
  QueryWithHelpers,
  Schema,
  Types,
} from 'mongoose';

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

export type Service = ServiceShape & Methods;

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
