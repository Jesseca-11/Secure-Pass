const { Router} = require('express');
const {verifyJWTTokenMiddleware, authenticateUserHandler} = require('../controllers/authController');

const authRouter = Router();

authRouter.post('/auth', verifyJWTTokenMiddleware, authenticateUserHandler);

module.exports = authRouter;
