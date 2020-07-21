const express = require('express');
const userRouter = express.Router();

const authController = require('../controllers/authController');



// POST
userRouter.post('/signin', authController.signin );
userRouter.post('/signup', authController.signup);


module.exports = userRouter;