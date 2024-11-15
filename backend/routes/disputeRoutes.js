const { Router } = require('express');
const verifyJWTTokenMiddleware = require('../middleware/verifyToken');
const createDisputeHandler = require('../controllers/disputeController');
const uploadImage = require('../middleware/upload');

const disputeRouter = Router();

disputeRouter.post('/dispute', verifyJWTTokenMiddleware, uploadImage.single('productImage'), createDisputeHandler);

module.exports = disputeRouter;
