import { Schema, } from 'mongoose';
export const ConversationStageSchema = new Schema({
    numeral: {
        type: String,
        required: true,
        unique: true,
        index: true,
        validate: {
            validator: (v) => /^\d+(\.\d+)?$/.test(v),
            message: 'The stage numeral must be a positive number or a positive number followed by a decimal point and another positive number.',
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
}, {
    timestamps: true,
});
ConversationStageSchema.static('getStringifiedStages', async function () {
    const stages = await this.find().sort({ numeral: 1 }).exec();
    return stages.map((stage) => stage.stringify()).join('\n');
});
ConversationStageSchema.method('stringify', function () {
    return `${this.numeral} - ${this.name}: ${this.description}. Requirements: ${this.requirements.map((v, i) => `${i + 1}: ${v}`).join(', ')}`;
});
