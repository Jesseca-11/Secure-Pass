const {model, Schema, SchemaTypes} = require('mongoose');
const {String} = SchemaTypes;

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {
        type: String, required: true}
});

module.exports = model('User', userSchema);
