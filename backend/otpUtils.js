const bcrypt = require('bcryptjs');

/**
 * Hashes OTP sent from user trying to verify
 * @param {String} otp
 * @returns hashed otp
 */
function hashOtp(otp) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(otp, salt);
}

/**
 * Checks if hashed otp was derived from plain otp
 * @param {String} plainOtp
 * @param {String} hashedOtp
 * @returns true if plain otp is hashed otp
 * @returns false if plain otp is not hashed otp
 */
function checkOtp(plainOtp, hashedOtp) {
    return bcrypt.compareSync(plainOtp, hashedOtp);
}

module.exports = { hashOtp, checkOtp };
