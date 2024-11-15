const { Router} = require('express');
const authenticateUserHandler = require('../controllers/authController');
const verifyJWTTokenMiddleware = require('../middleware/verifyToken');

const authRouter = Router();

authRouter.post('/auth', verifyJWTTokenMiddleware, authenticateUserHandler);

module.exports = authRouter;
