// Import nodemailer library
const nodemailer = require('nodemailer');

class EmailSend {
    constructor() {
        // Create a transporter object using the default SMTP transport
        this.transporter = nodemailer.createTransport({
            host: 'bulk.smtp.mailtrap.io', // Your SMTP server hostname
            port: 2525, // Your SMTP server port            
            auth: {
                user: 'api', // Your email address
                pass: 'f122842ac5dfbec623498abda6d94d75' // Your email password
            }
        });
    }

    // Method to send an email
    sendEmail(recipient, subject, text, callback) {
        // Define email content
        const mailOptions = {
            from: 'gautammailtrap@demomailtrap.com', // Sender address
            to: recipient, // Recipient address
            subject: subject, // Subject line
            text: text // Plain text body
            // You can also use `html` key for HTML formatted email
        };
        console.log(mailOptions);
        // Send email
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred:', error.message);
                callback(error, null);
            } else {
                console.log('Email sent successfully!', info.messageId);
                callback(null, info.messageId);
            }
        });
    }
}

// Export the EmailSend service
module.exports = EmailSend;
