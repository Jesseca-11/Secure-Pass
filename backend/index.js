const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();

const userRouter = require('./routes/userRoutes');

const PORT = process.env.PORT || 4000;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.log('Error connectiong to MongoDB', error.message);
    }
};

connectToDatabase();

app.use(express.json());
app.use('/', userRouter);

app.get('/', (request, response) => {
    response.json('Server ok!');
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
