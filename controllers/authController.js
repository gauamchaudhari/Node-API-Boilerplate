const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.login = (req, res) => {
   
    const { email, password } = req.body;
   
    User.findByEmail(email, (err, user) => {
        if (err) {
            console.error('Error finding user by email:', err); // Add this line
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        if (!user || !bcrypt.compareSync(password, user.password)) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
        
    });
};