const { Router } = require('express');
const { check } = require('express-validator');
const { signup } = require('../controllers/users.controller');
const { validateField, signupValidations } = require('../middlewares/validations.middleware');

const router = Router();

router.post('/signup', signup, signupValidations, validateField);


module.exports = {
    userRouter: router,
  };