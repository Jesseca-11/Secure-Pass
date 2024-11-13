const { model, Schema, SchemaTypes } = require('mongoose');
const { String, Date } = SchemaTypes;

const otpSchema = new Schema({
    recipientEmail: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 300 },
    expiresAt: { type: Date },
});

module.exports = model('OTP', otpSchema);
