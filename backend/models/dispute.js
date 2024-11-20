const {model, Schema, SchemaTypes, SchemaType} = require('mongoose');

const disputeSchema = new Schema({
    userId: {type: SchemaTypes.ObjectId, ref: 'User', required: true},
    createdBy: {type: String, required: true},
    title: {type: String, required: true},
    details: {type: String, required: true},
    productImage: String,
    additionalNotes: String
});

module.exports = model('Dispute', disputeSchema);
