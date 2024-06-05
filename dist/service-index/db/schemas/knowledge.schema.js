import { Schema, } from 'mongoose';
export const KnowledgeSchema = new Schema({
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
}, {
    timestamps: true,
    statics: {
        getCatalog() {
            return this.find({}, {
                name: 1,
                tags: 1,
                kind: 1,
                _id: 0,
            }).exec();
        },
        async getCatalogStringified() {
            const catalog = await this.find({}, {
                name: 1,
                tags: 1,
                kind: 1,
                description: 1,
                _id: 0,
            }).exec();
            return catalog
                .map(({ name, tags, kind, description }) => {
                return `${name}: ${description}. Tags: ${tags.toString()}. Kind: ${kind}.`;
            })
                .join('\n');
        },
    },
});
KnowledgeSchema.method('stringify', function () {
    return `<DOCUMENT START>
Name: ${this.name}
Content: ${this.content}
<DOCUMENT END>`;
});
KnowledgeSchema.query.byNames = function (names) {
    return this.where('name').in(names);
};
KnowledgeSchema.pre('save', function () {
    this.tags = normalizeTags(this.tags);
});
function normalizeTags(tags) {
    return tags.map((tag) => tag.toLowerCase().trim());
}
