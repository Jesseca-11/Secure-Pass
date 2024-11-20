const {model, Schema} = require('mongoose');

const tokenSchema = new Schema({
    email: String,
    token: String,
    createdAt: { type: Date, default: Date.now, expires: 300 },
});

module.exports = model('VerificationToken', tokenSchema);
