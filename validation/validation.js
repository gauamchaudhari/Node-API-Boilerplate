const { body, validationResult } = require('express-validator');

const registrationValidationRules = () => {
    return [
        body('first_name').notEmpty().withMessage('First name is required').isAlpha().withMessage('First name must contain only alphabetic characters'),
        body('last_name').notEmpty().withMessage('Last name is required').isAlpha().withMessage('Last name must contain only alphabetic characters'),
        body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address'),
        body('password').notEmpty().withMessage('Password is requied'),
        body('phone').notEmpty().withMessage('Phone number is required').isNumeric().withMessage('Phone number must contain only digits'),
        body('gender').notEmpty().withMessage('Gender is required').isIn(['male', 'female']).withMessage('Invalid gender'),
        // Add more validation rules as needed
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({ status: 400, errors: errors.array() });
};

module.exports = {
    registrationValidationRules,
    validate,
};