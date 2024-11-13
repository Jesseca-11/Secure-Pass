const User = require('../models/user');
const TemporaryUser = require('../models/temporaryUser');
const { sendOtp, verifyOtp } = require('../otpService');
const { hashPassword } = require('../passwordUtils');

/**
 * Register a new user
 * If user is a single user, name, email, and phone are required
 * If user is a business user, email, phone, and business handle are required
 * OTP is sent to user's email for verification
 * @param {object} request from Express
 * @param {object} response from Express
 * @returns 409 status code if user already exists
 * @returns 400 status code if required fields are not provided
 * @returns 201 status code if OTP is sent successfully
 */
const registerUserHandler = async (request, response) => {
    const { name, businessName, email, phone, domainName, businessHandle } =
        request.body;

    try {
        const userExists = await User.findOne({ email: email });

        if (!userExists) {
            if (!businessName) {
                // Means user is a single user
                if (!name || !email || !phone) {
                    return response.status(400).json({
                        message: 'Name, email, and phone number required',
                    });
                }

                await sendOtp(email);

                await TemporaryUser.create({
                    status: 'single_user',
                    name,
                    email,
                    phone,
                });
                console.log('OTP sent to email');
                return response
                    .status(201)
                    .json({ message: 'OTP sent to email' });
            } else {
                // Means user is a business user
                if (!email || !phone || !businessHandle) {
                    return response.status(400).json({
                        message:
                            'Email, phone number and business handle required',
                    });
                }

                await sendOtp(email);
                await TemporaryUser.create({
                    status: 'business_user',
                    name: businessName,
                    email,
                    phone,
                    domainName: domainName ? domainName : 'nil',
                    businessHandle,
                });
                console.log('OTP sent to email');
                return response
                    .status(201)
                    .json({ message: 'OTP sent to email' });
            }
        }
        response.status(409).json({ message: 'User already exists' });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

/**
 * Verify OTP sent to user's email
 * @param {object} request from Express
 * @param {object} response from Express
 * @returns OTP VERIFIED message if successful
 * @returns error message otherwise
 */
const verifyOTPHandler = async (request, response) => {
    const { email, otp } = request.body;

    if (!email || !otp) {
        return response.status(400).json({ message: 'Email and OTP required' });
    }

    try {
        const otpVerification = await verifyOtp(email, otp.toString());

        if (otpVerification.success) {
            // If OTP is verified, user is now ready to set a password
            return response.status(200).json({ message: 'OTP verified' });
        }
        return response.status(400).json({ message: otpVerification.error });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

/**
 * Set password for user after email and OTP verification
 * @param {object} request from Express
 * @param {object} response from Express
 * @returns newly created user document if successful
 */
const setPasswordHandler = async (request, response) => {
    const { email, password, confirmPassword } = request.body;

    if (!email || !password || !confirmPassword) {
        return response.status(400).json({
            message: 'Email, password, and confirm password required',
        });
    }

    if (password !== confirmPassword) {
        return response.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        // Retrieve temporary user details from database
        const temporaryUser = await TemporaryUser.findOne({ email });
        if (!temporaryUser) {
            response
                .status(400)
                .json({ message: 'Unverified or invalid user' });
        }

        // Hash password and create final user document
        const hashedPassword = hashPassword(password);

        const newUser = await User.create({
            status: temporaryUser.status,
            name: temporaryUser.name,
            email,
            phone: temporaryUser.phone,
            domainName: temporaryUser.domainName,
            businessHandle: temporaryUser.businessHandle,
            password: hashedPassword,
        });

        // Delete temporary user document from database
        await TemporaryUser.findOneAndDelete({ email });
        console.log('User registered successfully');
        return response.status(201).json(newUser);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

module.exports = { registerUserHandler, verifyOTPHandler, setPasswordHandler };
