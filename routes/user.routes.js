const { Router } = require('express');
const { check } = require('express-validator');
const { signup, login, updatePassword, updateUser } = require('../controllers/users.controller');
const { protect } = require('../middlewares/auth.middleware');
const {
  validUserByEmail,
  validPassword,
  finderId,
} = require('../middlewares/user.middleware');
const {
  validateField,
  signupValidations,
  loginValidations,
} = require('../middlewares/validations.middleware');

const router = Router();

router.post('/signup', signup, signupValidations, validateField);

router.post(
  '/login',
  loginValidations,
  validateField,
  validUserByEmail,
  validPassword,
  login
);

router.patch(
  '/:id',
  [
    check('name', 'The user name must mandatory').not().isEmpty(),
    check('email', 'The user name must mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),

    validateField,
    protect
  ],
  finderId,
  updateUser
);

router.patch(
  '/password/:id',
  [
    check('currentPassword', 'The current password must be mandatory')
      .not()
      .isEmpty(),
    check('newPassword', 'The new password must be mandatory').not().isEmpty(),
    finderId, validateField,
  ],
  updatePassword
);

module.exports = {
  userRouter: router,
};
