import { Schema } from 'mongoose';
export const ChatMessageSchema = new Schema({
    data: {
        content: String,
        role: String,
    },
    type: String,
    summarized: {
        $type: Boolean,
        default: false,
    },
    userId: {
        $type: String,
        required: true,
        index: true,
        immutable: true,
    },
}, {
    timestamps: true,
    typeKey: '$type',
});
