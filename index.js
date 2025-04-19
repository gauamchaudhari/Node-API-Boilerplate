/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const apiRoutes = require('./routes/apiRoutes');
const webRoutes = require('./routes/webRoutes');
const crypto = require('crypto');
const path = require('path');
const cors = require('cors');
const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('./knexfile');


const knex = Knex(knexConfig.development);

// Bind Objection to the Knex instance
Model.knex(knex);

const app = express();
const PORT = process.env.APPLICATION_PORT || 3001;
const secretKey = crypto.randomBytes(32).toString('hex');

// Set 'views' directory for any views
app.set('views', path.join(__dirname, 'views'));
// Set Pug as the template engine
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Configure session middleware
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(cors()); // Enable CORS for all routes
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
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
