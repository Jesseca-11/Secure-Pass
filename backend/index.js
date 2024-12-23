const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const disputeRouter = require('./routes/disputeRoutes');

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

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/', userRouter);
app.use('/', authRouter);
app.use('/', disputeRouter);

app.get('/', (request, response) => {
    response.json('Server ok!');
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
