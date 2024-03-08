/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session'); // Import express-session
const apiRoutes = require('./routes/apiRoutes');
const webRoutes = require('./routes/webRoutes');
const crypto = require('crypto');
const path = require('path');
let a = 30;
const app = express();
const PORT = process.env.PORT || 3001;
const secretKey = crypto.randomBytes(32).toString('hex');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure session middleware
app.use(session({
    secret: secretKey, // Add a secret key for session encryption
    resave: false,
    saveUninitialized: true
}));

// Serve static files (HTML, CSS, JavaScript) from the 'public' directory
app.use(express.static(path.join(__dirname, 'views')));

// Routes
app.use('/api', apiRoutes);
app.use(webRoutes);

// Wildcard route for handling 404 errors
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
