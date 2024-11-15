const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/blacklistedToken');

/**
 * Verify JWT token of user for protected routes
 * @param {Object} request object from Express
 * @param {Object} response object from Express
 * @param {Object} next middleware function
 * @returns ACCESS TOKEN IS MISSING OR INVALID if token is not provided
 * @returns TOKEN HAS BEEN INVALIDATED if token is in the blacklist
 * @returns INVALID TOKEN if the token provided is invalid
 */
const verifyJWTTokenMiddleware = async (request, response, next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return response
            .status(401)
            .json({ message: 'Access token is missing or invalid' });
    }

    try {
        // First check if token exists in the blacklist
        const tokenExistsOnBlacklist = await BlacklistedToken.findOne({ token });

        if (tokenExistsOnBlacklist)
            return response
                .status(403)
                .json({ message: 'Token has been invalidated' });

        // If not in blacklist, verify the token
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
            if (error) {
                return response.status(403).json({ message: 'Invalid token' });
            }

            request.user = user;
            request.token = token;
            next();
        });
    } catch (error) {
        return response
            .status(500)
            .json({ error: `JWT error (${error.mesage})` });
    }
};

/**
 * Send response for authenticated user
 * @param {Object} request object from Express
 * @param {Object} response object from Express
 */
const authenticateUserHandler = (request, response) => {
    response.json({
        message: 'Protected Route: User authenticated',
        user: request.user,
    });
};

module.exports = { verifyJWTTokenMiddleware, authenticateUserHandler };
