const { validationResult, check } = require('express-validator');


exports.validateField = ( req, res, next ) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    next();
};

exports.signupValidations = [
    check('name', 'the name is required').not().isEmpty(),
    check('email', 'the email is required').not().isEmpty(),
    check('email', 'the email must have a correct format').isEmail(),
    check('password', 'the password is required').not().isEmpty(),
];