const { Router } = require('express');
const createDisputeHandler = require('../controllers/disputeController');
const { uploadImage } = require('../middleware/upload');

const disputeRouter = Router();

disputeRouter.post(
    '/dispute',
    uploadImage.single('productImage'),
    createDisputeHandler
);

module.exports = disputeRouter;
