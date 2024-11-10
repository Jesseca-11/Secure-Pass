const {Router} = require('express');
const {registerUser} = require('../controllers/userController');

const userRouter = Router();

userRouter.post('/register', registerUser);

module.exports = userRouter;
