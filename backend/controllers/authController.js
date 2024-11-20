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

module.exports = authenticateUserHandler;
