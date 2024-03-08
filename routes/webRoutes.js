/* eslint-disable no-undef */
const express = require('express');
const authController = require('../controllers/authController'); 
const router = express.Router();
const path = require('path');

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    console.log("session::",req.session.userEmail);
    if (req.session.userEmail) {
        // User is authenticated, proceed to next middleware
        next();
    } else {
        // User is not authenticated, redirect to login page
        res.redirect('/web/login');
    }
}

// Handle login form submission
router.post('/web/login', authController.login);

// Render login.html when accessing /web/login
router.get('/web/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'login.html'));
});

// Dashboard route - accessible only to authenticated users
router.get('/dashboard', isAuthenticated, (req, res) => {
    // Assuming you have a dashboard.html file in the 'views' directory
    res.sendFile(path.join(__dirname, '../views', 'dashboard.html'));
});

module.exports = router;
