const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db')
const router = require('./routes');
var cookieParser = require('cookie-parser')


const app = express();
app.use(cors({
    origin: 'https://ecommerce-beta-beige-77.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add the methods you need
    allowedHeaders: ['Content-Type', 'Authorization'], // Add the headers you need
    credentials: true
}))
app.use(express.json());
app.use(cookieParser())
app.use("/api", router)
const port = 8080 || process.env.PORT
connectDB().then(() => {
    app.listen(port, () => {
        console.log('Connect to DB');
        console.log('listening on port');
    });

})