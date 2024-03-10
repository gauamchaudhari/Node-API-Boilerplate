const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { registrationValidationRules, validate } = require('../validation/validation');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register',registrationValidationRules(),validate, userController.registerUser);
router.get('/users', userController.getAllUsers);
router.post('/users', userController.addUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;