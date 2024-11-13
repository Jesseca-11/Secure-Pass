const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Otp = require('./models/otp');
// const { hashOtp, checkOtp } = require('./otpUtils');

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.APP_PASSWORD;

// Configure Nodemailer transporter for Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

/**
 * Generate a random 6-digit OTP
 * @returns {String} 6-digit OTP
 */
function generateOtp() {
    return crypto.randomInt(100000, 999999).toString();
}

/**
 * Send an OTP to the recipient's email and stores OTP in database
 * @param {String} recipientEmail
 * @returns true success message if successful
 * @returns false error message otherwise
 */
async function sendOtp(recipientEmail) {
    const otp = generateOtp();
    const mailOptions = {
        from: EMAIL_USER,
        to: recipientEmail,
        subject: 'Your OTP for Email Verification',
        text: `Hi ${recipientEmail},\nYour SecurePass OTP is: ${otp}. It will expire in 5 minutes.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        await Otp.create({
            recipientEmail,
            otp,
            createdAt: new Date(Date.now()),
            expiresAt: new Date(Date.now() + 300000),
        });
        console.log(`OTP sent to ${recipientEmail}`);

        return { success: true, message: 'OTP sent successfully' };
    } catch (error) {
        console.error(`Error sending OTP to ${recipientEmail}: ${error}`);
        return { success: false, message: 'Error sending OTP' };
    }
}

/**
 * Resends the OTP to the recipient's email
 * @param {String} recipientEmail email to resend OTP to
 * @returns the return value of sendOtp function
 */
async function resendOtp(recipientEmail) {
    try {
        await Otp.deleteMany({ recipientEmail });

        sendOtp(recipientEmail);
    } catch (error) {
        console.error(`Error resending OTP to ${recipientEmail}: ${error}`);
        return { success: false, message: 'Error resending OTP' };
    }
}

/**
 * Verify the OTP sent by the user
 * @param {String} recipientEmail
 * @param {String} otp inputted by user
 * @returns true success message if successfully verified
 * @returns NO OTP REQUEST error if no OTP request found for email
 * @returns INVALID OTP error if OTP is incorrect
 * @returns OTP EXPIRED error if OTP is expired
 */
async function verifyOtp(recipientEmail, otp) {
    try {
        const otpDocument = await Otp.findOne({
            recipientEmail,
            otp,
        });

        if (!otpDocument) {
            return {
                success: false,
                error: 'No OTP request found for this email',
            };
        }

        if (otp !== otpDocument.otp) {
            return { success: false, error: 'Invalid OTP' };
        }

        if (otpDocument.expiresAt < new Date(Date.now())) {
            await Otp.deleteOne({ recipientEmail, otp });
            return { sucess: false, error: 'OTP expired' };
        }

        // OTP is valid and not expired, then remove from database
        await Otp.deleteOne({ recipientEmail, otp });
        return { success: true, message: 'OTP verified successfully' };
    } catch (error) {
        console.error(`Error verifying OTP for ${recipientEmail}: ${error}`);
        return { success: false, error: 'Error verifying OTP' };
    }
}

module.exports = { sendOtp, resendOtp, verifyOtp };
