import { Schema, } from 'mongoose';
import { SESSION_STATE_VALUES } from '../../../constants.js';
export const SessionSchema = new Schema({
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
}, {
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
            return this.sort({ updatedAt: -1 });
        },
    },
});
