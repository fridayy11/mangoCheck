const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true 
}));

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

app.options('*', cors());
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
