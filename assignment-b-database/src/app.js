const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config/config');
const inventoryRoutes = require('./routes/inventoryRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// HTTP request logger
if (config.env === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.use('/', inventoryRoutes);

// Base route
app.get('/health', (req, res) => {
    res.json({ message: 'Zeerostock is running' });
});

// Error Handler Middleware
app.use(errorHandler);

module.exports = app;
