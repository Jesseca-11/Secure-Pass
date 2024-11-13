const {Router} = require('express');
const {registerUserHandler, verifyOTPHandler, setPasswordHandler} = require('../controllers/userController');

const userRouter = Router();

userRouter.post('/register', registerUserHandler);
userRouter.post('/verify-otp', verifyOTPHandler);
userRouter.post('/set-password', setPasswordHandler);

module.exports = userRouter;
