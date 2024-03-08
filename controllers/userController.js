const User = require('../models/User');
const { statusCodes, errorMessages,users } = require('../constants/app.constants');
const bcrypt = require('bcryptjs');

exports.registerUser = (req, res) => {

    const { first_name, last_name, email, password, address, phone, gender, education } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = { first_name, last_name, email, password: hashedPassword, address, phone, gender, education };

    User.create(newUser, (err, userId) => {
        if (err === 'Email is already registered') {
            res.status(statusCodes.BAD_REQUEST).
                json({
                    status: statusCodes.BAD_REQUEST,
                    errors: [
                        {
                            message: errorMessages.EMAIL_ALREADY_REGISTERED
                        }
                    ]
                });

            return;
        } else if (err) {
            res.status(statusCodes.INTERNAL_SERVER_ERROR).
                json({
                    message: statusCodes.INTERNAL_SERVER_ERROR,
                    message: errorMessages.INTERNAL_SERVER_ERROR
                });
            return;
        }
        res.status(statusCodes.SUCCESS).json({ message: users.SUCCESS_REGISTRATION , userId });
    });
};

exports.getAllUsers = (req, res) => {
    User.getAll((err, users) => {
        if (err) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        res.status(200).json({ status: 200, data: users });
    });
};

exports.addUser = (req, res) => {
    // Add user logic
};

exports.updateUser = (req, res) => {
    // Update user logic
};

exports.deleteUser = (req, res) => {
    // Delete user logic
};