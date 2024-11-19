const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Dispute = require('../models/dispute');
const BlacklistedToken = require('../models/blacklistedToken');

/**
 * creates a dispute(complaint) form
 * @param {Object} request object from Express
 * @param {Object} response object from Express
 * @returns the created dispute document with a 201 status code
 */
const createDisputeHandler = async (request, response) => {
    let authenticatedUser = null;

    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return response
            .status(401)
            .json({ message: 'Access token is missing or invalid' });
    }

    try {
        // First check if token exists in the blacklist
        const tokenExistsOnBlacklist = await BlacklistedToken.findOne({
            token,
        });

        if (tokenExistsOnBlacklist)
            return response
                .status(403)
                .json({ message: 'Token has been invalidated' });

        // If not in blacklist, verify the token
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
            if (error) {
                return response.status(403).json({ message: 'Invalid token' });
            }

            authenticatedUser = user;
        });
    } catch (error) {
        return response
            .status(500)
            .json({ error: `JWT error (${error.mesage})` });
    }

    console.log('User:', authenticatedUser);

    const { title, details, additionalNotes } = request.body;
    const productImage = request.file ? request.file.path : null;

    if (!title || !details)
        return response
            .status(200)
            .json({ message: 'Dispute title and details required' });

    try {
        const disputeDocument = await Dispute.create({
            userId: authenticatedUser.id,
            createdBy: authenticatedUser.email,
            title,
            details,
            productImage,
            additionalNotes,
        });

        console.log('Complaint submitted successfully');
        return response.status(201).json(disputeDocument);
    } catch (error) {
        if (error instanceof mongoose.Error)
            return response
                .status(500)
                .json({ message: `Database Error: ${error.message}` });
        return response.status(500).json({ message: error.message });
    }
};

module.exports = createDisputeHandler;
