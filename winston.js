const winston = require('winston');

// Configure the Winston logger
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' }) // Log to a file
    ]
});

// Log an error
logger.error('An error occurred!');
