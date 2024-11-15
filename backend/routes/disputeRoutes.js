const { Router } = require('express');
const { verifyJWTTokenMiddleware } = require('../controllers/authController');
const createDisputeHandler = require('../controllers/disputeController');

const disputeRouter = Router();

disputeRouter.post('/dispute', verifyJWTTokenMiddleware, createDisputeHandler);

module.exports = disputeRouter;
