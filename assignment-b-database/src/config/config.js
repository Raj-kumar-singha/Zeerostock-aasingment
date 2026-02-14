require('dotenv').config({ quiet: true });

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGO_URI
};

// Validate critical config
if (!config.mongoUri) {
    console.error('CRITICAL ERROR: MONGO_URI is not defined in .env file');
    process.exit(1);
}

module.exports = config;
