const {model, Schema, SchemaTypes} = require('mongoose');

const transactionSchema = new Schema({
    creatorId: {type: SchemaTypes.ObjectId, ref: 'User', required: true},
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String, enum: ['validated', 'not validated', 'awaiting validation'],
        required: true,
    },
    transactionType: {
        type: String,
        required: true,
    },
    recipient: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    transactionDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = model('Transaction', transactionSchema);
