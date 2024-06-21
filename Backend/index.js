const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db')
const router = require('./routes');
var cookieParser = require('cookie-parser')


const app = express();
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json());
app.use("/api", router)
const port = 8080 || process.env.PORT
connectDB().then(() => {
    app.listen(port, () => {
        console.log('Connect to DB');
        console.log('listening on port');
    });

})