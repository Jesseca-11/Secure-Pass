const User = require('../models/user');

const registerUser = async (request, response) => {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
        return response
            .status(400)
            .json({ message: 'Name, email, and password required' });
    }

    try {
        const userExists = await User.findOne({ email: email });

        if (!userExists) {
            const newUser = User.create({
                name,
                email,
                password,
            });
            return response.status(201).json(newUser);
        }
        response.status(409).json({ message: 'User already exists' });
    } catch (error) {
        response.status(422).json({ error: error.message });
    }
};

module.exports = { registerUser };
