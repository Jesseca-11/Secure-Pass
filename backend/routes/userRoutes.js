const { Router } = require('express');
const {
    registerUserHandler,
    resendOTPHandler,
    verifyOTPHandler,
    setPasswordHandler,
    loginUserHandler,
    logoutUserHandler,
} = require('../controllers/userController');
const verifyJWTTokenMiddleware = require('../middleware/verifyToken');

const userRouter = Router();

userRouter.post('/register', registerUserHandler);
userRouter.post('/resend-otp', resendOTPHandler);
userRouter.post('/verify-otp', verifyOTPHandler);
userRouter.post('/set-password', setPasswordHandler);
userRouter.post('/login', loginUserHandler);
userRouter.post('/logout', verifyJWTTokenMiddleware, logoutUserHandler);

module.exports = userRouter;
