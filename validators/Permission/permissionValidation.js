const { body, validationResult } = require('express-validator');

// Validation for creating a role
const validateRoleCreation = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Name should be at least 2 characters long'),
];

// Validation for updating a role
const validateRoleUpdate = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Name should be at least 2 characters long'),
];

// Function to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateRoleCreation,
    validateRoleUpdate,
    handleValidationErrors,
};
