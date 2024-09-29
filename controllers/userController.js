const User = require('../models/User');
const { statusCodes, errorMessages, users } = require('../constants/app.constants');
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
                    status: statusCodes.INTERNAL_SERVER_ERROR,
                    message: errorMessages.INTERNAL_SERVER_ERROR
                });
            return;
        }
        res.status(statusCodes.SUCCESS).json({ message: users.SUCCESS_REGISTRATION, userId });
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

exports.getUser = (req, res) => {
    const id = req.params.id;
    User.findById(id, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching user', error: err });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ status: 200, data: user });
    });
};

exports.addUser = () => {
    // Add user logic
};

exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const newUserData = req.body;
    User.update(userId, newUserData, (err, success) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating user', error: err });
        }
        if (success) {
            return res.status(200).json({ message: 'User updated successfully' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    });
};

exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    User.delete(userId, (err, success) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting user', error: err });
        }
        if (success) {
            return res.status(200).json({ message: 'User deleted successfully' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    });
};