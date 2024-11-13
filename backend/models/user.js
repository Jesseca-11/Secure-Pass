const {model, Schema, SchemaTypes} = require('mongoose');
const {String} = SchemaTypes;

const userSchema = new Schema({
    status: {type: String, enum: ['business_user', 'single_user'], required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    domainName: String,
    businessHandle: String
});

module.exports = model('User', userSchema);
