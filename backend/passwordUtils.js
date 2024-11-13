const bcrypt = require('bcryptjs');

/**
 * Hashes user password sent from frontend register form
 * @param {String} password
 * @returns hashed password
 */
function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

/**
 * Checks if hashed password was derived from plain password
 * @param {String} plainPassword
 * @param {String} hashedPassword
 * @returns true if plain password is hashed password
 */
function checkPassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
}

module.exports = { hashPassword, checkPassword };
