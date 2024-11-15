const mongoose = require('mongoose');
const Dispute = require('../models/dispute');

const createDisputeHandler = async (request, response) => {
    const { user } = request.user;
    const { title, details, productImage, additionalNotes } = request.body;

    if (!title || !details)
        return response
            .status(200)
            .json({ message: 'Dispute title and details required' });

    try {
        const disputeDocument = await Dispute.create({
            userId: user.id,
            createdBy: user.email,
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
