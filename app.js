require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

//connect DB
const connectDB = require('./db/connect');

const authenticationMiddleware = require('./middleware/authentication');

//Routes
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

//Error Handler Middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
    })
);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticationMiddleware, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        const ports = process.env.PORT || 5000;
        await connectDB(process.env.MONGO_URI); 
        app.listen(ports, () => {
            console.log(`Server is listening on port ${ports}...`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();


