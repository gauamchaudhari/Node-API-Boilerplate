// Import the EmailSend service
const EmailSend = require('../services/EmailSend');

// Create an instance of the EmailSend service
const emailSendService = new EmailSend();

// Define the controller function
const sendEmailController = (req, res) => {
    
    // Extract data from request body    
    const recipient = req.body['to_email'];
    const subject = req.body['subject'];
    const text = req.body['test'];
    
    // Call the sendEmail method of the EmailSend service
    emailSendService.sendEmail(recipient, subject, text, (error, messageId) => {
        if (error) {
            res.status(500).json({ success: false, message: 'Failed to send email.' });
        } else {
            res.status(200).json({ success: true, message: 'Email sent successfully!', messageId });
        }
    });
};

// Export the controller function
module.exports = sendEmailController;
