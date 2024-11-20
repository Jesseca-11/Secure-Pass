const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const OTP = require('../models/otp');
const TemporaryUser = require('../models/temporaryUser');
const BlacklistedToken = require('../models/blacklistedToken');
const { sendOtp, resendOtp, verifyOtp } = require('../otpService');
const { hashPassword, checkPassword } = require('../passwordUtils');
const VerificationToken = require('../models/verificationToken');

/**
 * Register a new single user
 * As a single user, name, email, and phone are required
 * OTP is sent to user's email for verification
 * @param {object} request from Express
 * @param {object} response from Express
 * @returns 409 status code if user already exists
 * @returns 400 status code if required fields are not provided
 * @returns 201 status code if OTP is sent successfully
 */
const registerSingleUserHandler = async (request, response) => {
    const { name, email, phone } = request.body;

    try {
        const userExists = await User.findOne({ email: email });

        if (!userExists) {
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
            return response.status(201).json({ message: 'OTP sent to email' });
        }
        return response.status(409).json({ message: 'User already exists' });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

/**
 * Register a new business user
 * As a business user, business name, email, phone, and business handle are required
 * OTP is sent to user's email for verification
 * @param {object} request from Express
 * @param {object} response from Express
 * @returns 409 status code if user already exists
 * @returns 400 status code if required fields are not provided
 * @returns 201 status code if OTP is sent successfully
 */
const registerBusinessUserHandler = async (request, response) => {
    const { businessName, email, phone, domainName, businessHandle } =
        request.body;

    try {
        const userExists = await User.findOne({ email: email });

        if (!userExists) {
            // Means user is a business user
            if (!businessName || !email || !phone || !businessHandle) {
                return response.status(400).json({
                    message:
                        'Business name, email, phone number and business handle required',
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
            return response.status(201).json({ message: 'OTP sent to email' });
        } else {
            return response
                .status(409)
                .json({ message: 'User already exists' });
        }
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

/**
 * Resend OTP to user's email
 * @param {Object} request object from Express
 * @param {Object} response object from Express
 * @returns the return value of sendOtp function
 * @returns EMAIL REQUIRED message if email not present in request body
 */
const resendOTPHandler = async (request, response) => {
    const { email } = request.body;

    if (!email) {
        return response.status(400).json({ message: 'Email required' });
    }

    resendOtp(email);
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
            const tokenAsProof = crypto.randomBytes(16).toString('hex');

            try {
                await VerificationToken.create({
                    email,
                    token: tokenAsProof,
                    createdAt: new Date(),
                });
                console.log('OTP verified: Verification token created');
                return response
                    .status(200)
                    .json({ message: 'OTP verified', data: tokenAsProof });
            } catch (error) {
                return response.status(500).json({
                    error: `Verification token creation failed (${error.message})`,
                });
            }
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
    const { email, password, confirmPassword, verificationToken } =
        request.body;

    if (!email || !password || !confirmPassword || !verificationToken) {
        return response.status(400).json({
            message:
                'Email, password, confirm password and verification token required',
        });
    }

    if (password !== confirmPassword) {
        return response.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const storedTokenDocument = await VerificationToken.findOne({ email });

        // Check if the token provided by the user matches the one stored in the database
        if (
            !storedTokenDocument ||
            storedTokenDocument.token !== verificationToken
        ) {
            return response
                .status(400)
                .json({ message: 'Invalid or expired verification token' });
        }

        // Retrieve temporary user details from database
        const temporaryUser = await TemporaryUser.findOne({ email });
        if (!temporaryUser) {
            return response
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

        // Delete temporary user document from database, delete verification token from database
        await TemporaryUser.deleteMany({ email });
        await VerificationToken.findOneAndDelete({ email });

        console.log('User registered successfully');
        return response.status(201).json(newUser);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

/**
 * Login user with email/phone and password
 * @param {Object} request object from Express
 * @param {Object} response object from Express
 * @returns JWT token to be used by client for authentication on subsequent requests
 */
const loginUserHandler = async (request, response) => {
    const { emailPhone, password } = request.body;

    // Validate required fields
    if (!emailPhone || !password)
        return response
            .status(400)
            .json({ error: 'Email/phone and password required' });

    try {
        // Attempt to find user by email
        let user;
        if (emailPhone.includes('@')) {
            user = await User.findOne({ email: emailPhone });
        } else {
            user = await User.findOne({ phone: emailPhone });
        }

        if (user) {
            // Validate the password
            const isValidPassword = checkPassword(password, user.password);

            if (isValidPassword) {
                // Generate a JWT with user details
                jwt.sign(
                    { id: user._id, email: user.email, name: user.name },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: '24h' },
                    (error, token) => {
                        if (error)
                            return response.status(500).json({
                                error: `Error generating token (${error.message})`,
                            });

                        // Respond with a 200 saying the user is logged in and send the token
                        return response.status(200).json({
                            'Logged in as: ': user.email,
                            token: token,
                        });
                    }
                );
            } else {
                // If password is invalid, respond with an unauthorized error
                response.status(401).json({ error: 'Invalid password' });
            }
        } else {
            // If no user is found, respond with a not found error
            response.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        // Handle server errors
        response.status(500).json({ error: error.message });
    }
};

/**
 * Logout user by blacklisting the token
 * @param {Object} request object from Express
 * @param {Object} response object from Express
 * @returns 200 status code if successful
 * @returns 500 status code if error occurs
 */
const logoutUserHandler = async (request, response) => {
    const user = request.user;
    const token = request.token;

    try {
        // Blacklist the token
        // This is where you would store the token in a database
        // and check it on every request to protected routes
        // to see if the user is logged in with a valid token or not
        await BlacklistedToken.create({
            userId: user.id,
            user: user.email,
            token,
            blacklistedAt: new Date(),
        });
        console.log(`User (${user.email}) logged out`);
        response
            .status(200)
            .json({ message: `User (${user.email}) logged out` });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

module.exports = {
    registerSingleUserHandler,
    registerBusinessUserHandler,
    resendOTPHandler,
    verifyOTPHandler,
    setPasswordHandler,
    loginUserHandler,
    logoutUserHandler,
};
