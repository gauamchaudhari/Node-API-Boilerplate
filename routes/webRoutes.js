/* eslint-disable no-undef */
const express = require('express');
const authController = require('../controllers/authController'); 
const router = express.Router();
const path = require('path');

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
   
    if (req.session.userEmail) {         
        next();
    } else {            
        res.redirect('/web/login');
    }
}


router.post('/web/login', authController.login);


// Render login.html when accessing /web/login
router.get('/web/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'login.html'));
});

// Dashboard route - accessible only to authenticated users
router.get('/dashboard', isAuthenticated, (req, res) => {    
    res.render('dashboard', { title: 'Dashboard', user: req.session.userEmail });
});

module.exports = router;
