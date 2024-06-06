import { Schema, } from 'mongoose';
export const ServiceSchema = new Schema({
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
}, {
    timestamps: true,
    statics: {
        async getServiceNames() {
            const services = await this.find().exec();
            const names = services.map((service) => service.name);
            return Array.from(new Set(names));
        },
        async getServicesLong() {
            const services = await this.find().exec();
            return services.map((service) => `-----
Name: ${service.name}
Description: ${service.long_description}
Requirements: ${service.requirements.map((v, i) => `${i + 1}: ${v}`).join(', ')}
Cost: ${service.cost}
-----`);
        },
        async getServicesLongByNames(names) {
            const services = await this.find().where('name').in(names).exec();
            return services.map((service) => `-----
Name: ${service.name}
Description: ${service.long_description}
Requirements: ${service.requirements.map((v, i) => `${i + 1}: ${v}`).join(', ')}
Cost: ${service.cost}
-----`);
        },
        async getServicesShort() {
            const services = await this.find().exec();
            return services.map((service) => `-----
Name: ${service.name}
Description: ${service.short_description}
Requirements: ${service.requirements}
Tags: ${service.tags}
-----`);
        },
        async getServicesShortByNames(names) {
            const services = await this.find().where('name').in(names).exec();
            return services.map((service) => `-----
Name: ${service.name}
Description: ${service.short_description}
Requirements: ${service.requirements}
Tags: ${service.tags}
-----`);
        },
    },
});
ServiceSchema.pre('save', function () {
    this.tags = normalizeTags(this.tags);
});
ServiceSchema.query.byName = function (name) {
    return this.findOne().where('name').equals(name).orFail();
};
ServiceSchema.query.byNames = function (names) {
    return this.find().where('name').in(names);
};
function normalizeTags(tags) {
    return tags.map((tag) => tag.toLowerCase().trim());
}
